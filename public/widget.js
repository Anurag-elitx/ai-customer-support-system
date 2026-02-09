(function() {
  // 1. Configuration
  const scriptSync = document.currentScript;
  const userId = scriptSync.getAttribute('data-user-id');
  const baseUrl = 'http://localhost:3000'; // Change to production URL later

  if (!userId) {
    console.error('SupportAI Widget: Missing data-user-id attribute.');
    return;
  }

  // 2. Create Styles
  const style = document.createElement('style');
  style.innerHTML = `
    #support-ai-widget-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    #support-ai-button {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #4f46e5;
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    #support-ai-button:hover {
      transform: scale(1.1);
    }
    #support-ai-button svg {
      color: white;
      width: 28px;
      height: 28px;
    }
    #support-ai-iframe-container {
      position: absolute;
      bottom: 80px;
      right: 0;
      width: 380px;
      height: 600px;
      max-height: calc(100vh - 100px);
      max-width: calc(100vw - 40px);
      background: white;
      border-radius: 16px;
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      display: none;
      transform-origin: bottom right;
      transition: transform 0.3s ease, opacity 0.3s ease;
      opacity: 0;
      transform: scale(0.95);
    }
    #support-ai-iframe-container.open {
      display: block;
      opacity: 1;
      transform: scale(1);
    }
    #support-ai-iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
    @media (max-width: 480px) {
      #support-ai-iframe-container {
        width: 100vw;
        height: 100vh;
        bottom: 0;
        right: 0;
        border-radius: 0;
        max-width: none;
        max-height: none;
      }
    }
  `;
  document.head.appendChild(style);

  // 3. Create Elements
  const container = document.createElement('div');
  container.id = 'support-ai-widget-container';

  container.innerHTML = `
    <div id="support-ai-iframe-container">
      <iframe id="support-ai-iframe" src="${baseUrl}/widget/${userId}"></iframe>
    </div>
    <div id="support-ai-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
    </div>
  `;

  document.body.appendChild(container);

  // 4. Interaction Logic
  const button = document.getElementById('support-ai-button');
  const iframeContainer = document.getElementById('support-ai-iframe-container');
  let isOpen = false;

  button.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
      iframeContainer.style.display = 'block';
      setTimeout(() => {
        iframeContainer.classList.add('open');
      }, 10);
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
    } else {
      iframeContainer.classList.remove('open');
      setTimeout(() => {
        iframeContainer.style.display = 'none';
      }, 300);
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>';
    }
  });

})();
