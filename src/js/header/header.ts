import Popup from '../components/popup';
import Tabs from '../components/tabs';
import htmlContent from './htmlContent';

const menuPopup = new Popup({
  btnOpen: document.querySelector('[data-popup="menu-open-button"]'),
  htmlContent: htmlContent.menu,
});
menuPopup.listen();

const aboutPopup = new Popup({
  btnOpen: document.querySelector('[data-popup="open-about"]'),
  htmlContent: htmlContent.about,
});
aboutPopup.listen();

export const authPopup = new Popup({
  btnOpen: document.querySelector('[data-popup="open-auth-form"]'),
  htmlContent: htmlContent.auth,
});
authPopup.listen();

Tabs.listen();
