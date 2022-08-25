import Popup from './components/popup';

const menuPopup = new Popup({
  btnOpen: document.querySelector('[data-popup="menu-open-button"]'),
  htmlContent: `
    <h1>I am the super popup' content</h1>`,
});

menuPopup.listen();
