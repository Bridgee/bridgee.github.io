// Navigation configuration for easy scalability.
import { research } from '../content/research.js';

export const navigationConfig = {
  pages: [
    { href: '/music', label: 'Music', section: 'pages' },
    { href: '/gallery', label: 'Gallery', section: 'pages' },
    // Future pages can be easily added here:
    // { href: '/thoughts', label: 'Thoughts', section: 'pages' },
    // { href: '/publications', label: 'Publications', section: 'pages' },
    // { href: '/teaching', label: 'Teaching', section: 'pages' }
  ],
  sections: [
    { href: '#about', label: 'About' },
    { href: '#haits', label: research.lab.shortName },
    { href: '#research', label: 'Research' },
    { href: '#publications', label: 'Publications' },
    { href: '#projects', label: 'Projects' }
  ],
  contact: [
    { href: '#contact', label: 'Contact' }
  ]
};
