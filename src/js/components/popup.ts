type popupParams = {
  btnOpen: HTMLElement | null;
  htmlContent: string;
};

class Popup {
  htmlContent;
  btnOpen;
  btnClose: HTMLElement;
  wrapper: HTMLElement;

  constructor({ btnOpen, htmlContent }: popupParams) {
    this.btnOpen = btnOpen;
    this.htmlContent = htmlContent;

    this.btnClose = document.createElement('div');
    this.btnClose.className = 'popup__btn-close';

    this.wrapper = this.makeLayout();
  }

  makeLayout(): HTMLElement {
    const wrapperElem = document.createElement('div');
    wrapperElem.className = 'popup';

    const popupBody = document.createElement('div');
    popupBody.className = 'popup__body';
    const popupContentElem = document.createElement('div');
    popupContentElem.className = 'popup__content';
    popupContentElem.innerHTML = this.htmlContent;

    popupBody.append(popupContentElem);
    popupBody.append(this.btnClose);

    wrapperElem.append(popupBody);
    return wrapperElem;
  }

  listen() {
    if (this.btnOpen instanceof HTMLElement) {
      const btn = this.btnOpen;
      this.btnOpen.addEventListener('click', () => {
        const isAuthorized = btn.classList.contains('is-authorized');
        if (!isAuthorized) this.open();
      });
    }
    this.btnClose.addEventListener('click', this.close.bind(this));
  }

  open() {
    document.body.append(this.wrapper);
    setTimeout(() => {
      this.wrapper.classList.add('is-visible');
    }, 0);
  }

  close() {
    this.wrapper.classList.remove('is-visible');
    setTimeout(() => {
      this.wrapper.remove();
    }, 300);
  }
}

export default Popup;
