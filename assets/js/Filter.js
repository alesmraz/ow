export default class Filter {
  constructor() {
    this.filterElement = document.querySelector('form#filter')
  }

  init() {
    if (this.filterElement) {
      this.collapses = this.getCollapses();
      this.controlCollapses()

      window.addEventListener('resize', () => {
        this.controlCollapses()
      });

    }
  }

  getCollapses() {
    return [...this.filterElement.querySelectorAll('.collapse')]
  }

  controlCollapses() {
    if (this.collapses.length) {

      // sm
      if (this.getScreenSize() < 768) {
        this.collapses.forEach(collapse => {
          collapse.classList.remove('show')
        })
      }


    }

  }

  getScreenSize() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  }

}