export default class BackLink {
  constructor() {
    this.selector = '#backLink'
  }

  init() {
    const backlinks = [...document.querySelectorAll(this.selector)]

    const origin = window.location.origin

    if (backlinks.length) {
      backlinks.forEach((link) => {
        link.addEventListener('click', (ev) => {
          ev.preventDefault()

          if (document.referrer !== '') {
            window.history.go(-1)
          } else {
            window.location = origin
          }

          return false;
        })
      })
    }
  }
}