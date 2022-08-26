class Tabs {
  static tabsNavButtons = document.querySelectorAll('[data-open-tab]');

  static listen() {
    document.addEventListener('click', ({ target }) => {
      const el = target as HTMLElement;
      const btn = el.closest('[data-open-tab]') as HTMLElement;
      if (!btn) return;

      const selector = btn.dataset.openTab as string;
      const targetTab = document.querySelector(`[data-tab="${selector}"]`);

      if (targetTab instanceof HTMLElement) {
        this.toggleTabContainers(targetTab);
        this.toggleNavButtons(btn);
      }
    });
  }

  static toggleTabContainers(targetTab: HTMLElement) {
    const parent = targetTab.parentElement as HTMLElement;
    const currentTab = parent.querySelector('[data-tab].is-active') as HTMLElement;

    if (currentTab) currentTab.classList.remove('is-active');
    targetTab.classList.add('is-active');
  }

  static toggleNavButtons(targetBtn: HTMLElement) {
    // console.log(currentBtn);
    const parent = targetBtn.parentElement as HTMLElement;
    const currentBtn = parent.querySelector('[data-open-tab].is-active');

    if (currentBtn) currentBtn.classList.remove('is-active');
    targetBtn.classList.add('is-active');
  }
}

export default Tabs;
