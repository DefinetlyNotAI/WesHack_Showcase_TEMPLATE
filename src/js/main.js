import { initializeAnimations } from './animations.js';
import { initializeEasterEggs } from './easterEggs.js';
import { loadProjects } from './projectLoader.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Add background pattern
    const bgPattern = document.createElement('div');
    bgPattern.className = 'bg-pattern';
    document.body.prepend(bgPattern);

    initializeAnimations();
    initializeEasterEggs();

    // Load projects if we're on a project page
    if (document.getElementById('project-container')) {
        loadProjects();
    }
});