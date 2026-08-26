const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(',');

const dialogStack = [];

function getFocusableElements(dialog) {
    return Array.from(dialog.querySelectorAll(FOCUSABLE_SELECTOR)).filter(element => {
        return !element.hasAttribute('hidden') && element.getAttribute('aria-hidden') !== 'true';
    });
}

function focusDialog(dialog) {
    const preferred = dialog.querySelector('[data-dialog-initial-focus]');
    const firstFocusable = getFocusableElements(dialog)[0];
    (preferred || firstFocusable || dialog).focus({ preventScroll: true });
}

function removeDialogRecord(dialog) {
    const index = dialogStack.findIndex(record => record.dialog === dialog);
    if (index === -1) return null;
    return dialogStack.splice(index, 1)[0];
}

export function openDialog(dialog, {
    label,
    removeOnClose = true,
    onAfterClose,
} = {}) {
    const existing = removeDialogRecord(dialog);
    const activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    dialog.classList.add('game-modal');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    if (label) dialog.setAttribute('aria-label', label);
    if (!dialog.hasAttribute('tabindex')) dialog.setAttribute('tabindex', '-1');
    if (!dialog.isConnected) document.body.appendChild(dialog);

    dialogStack.push({
        dialog,
        removeOnClose,
        onAfterClose,
        returnFocus: existing?.returnFocus || activeElement,
    });

    requestAnimationFrame(() => focusDialog(dialog));
    return dialog;
}

export function closeDialog(dialog) {
    if (!dialog) return;
    const record = removeDialogRecord(dialog);

    if (record?.removeOnClose ?? dialog.id !== 'popup') {
        dialog.remove();
    } else {
        dialog.style.display = 'none';
    }

    record?.onAfterClose?.();

    const nextDialog = dialogStack.at(-1)?.dialog;
    const returnTarget = record?.returnFocus;
    requestAnimationFrame(() => {
        if (returnTarget?.isConnected) returnTarget.focus({ preventScroll: true });
        else if (nextDialog?.isConnected) focusDialog(nextDialog);
    });
}

export function closeDialogById(id) {
    closeDialog(document.getElementById(id));
}

function trapFocus(event, dialog) {
    const focusable = getFocusableElements(dialog);
    if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus({ preventScroll: true });
        return;
    }

    const first = focusable[0];
    const last = focusable.at(-1);
    const active = document.activeElement;

    if (!dialog.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus({ preventScroll: true });
    } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus({ preventScroll: true });
    } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
    }
}

document.addEventListener('keydown', event => {
    const topDialog = dialogStack.at(-1)?.dialog;
    if (!topDialog) return;

    if (event.key === 'Escape') {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeDialog(topDialog);
    } else if (event.key === 'Tab') {
        trapFocus(event, topDialog);
    }
}, true);
