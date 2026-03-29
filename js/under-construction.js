/**
 * Under Construction Page Script
 * Dynamically renders the "Under Construction" page content
 */

function renderUnderConstruction() {
    // Create main container
    const body = document.body;
    body.className = 'under-construction-page';

    // Create container div
    const container = document.createElement('div');
    container.className = 'under-construction-container';

    // Create icon element
    const icon = document.createElement('div');
    icon.className = 'under-construction-icon';
    icon.textContent = '🚧';

    // Create title element
    const title = document.createElement('h1');
    title.className = 'under-construction-title';
    title.textContent = 'Under Construction';

    // Create message element
    const message = document.createElement('p');
    message.className = 'under-construction-message';
    message.textContent = 'This page is currently under development. Please check back later.';

    // Append elements to container
    container.appendChild(icon);
    container.appendChild(title);
    container.appendChild(message);

    // Append container to body
    body.appendChild(container);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderUnderConstruction);
} else {
    renderUnderConstruction();
}