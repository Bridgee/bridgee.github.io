const notificationQueue = [];
let isNotificationVisible = false;

function showNextNotification() {
    if (isNotificationVisible || notificationQueue.length === 0) return;

    const notification = document.getElementById('achievement');
    const notificationText = document.getElementById('achievement-text');
    if (!notification || !notificationText) {
        notificationQueue.length = 0;
        return;
    }

    const { message, duration } = notificationQueue.shift();
    isNotificationVisible = true;
    notificationText.textContent = message;
    notification.hidden = false;
    notification.classList.add('is-visible');

    window.setTimeout(() => {
        notification.classList.remove('is-visible');
        notification.hidden = true;
        isNotificationVisible = false;
        showNextNotification();
    }, duration);
}

export function showGameNotification(message, { duration = 3500 } = {}) {
    if (!message) return;
    notificationQueue.push({ message, duration });
    showNextNotification();
}
