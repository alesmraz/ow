export default class Branch {
  constructor() {

  }

  init () {
    const collapseControl = [...document.querySelectorAll('.branchInfo__info .collapse')]
    const collaseLink = [...document.querySelectorAll('.branchInfo__info a[data-toggle="collapse"]')]

    if (screen.width < 576 && collapseControl.length && collaseLink.length) {
      collapseControl.forEach((control) => {
        control.classList.remove('show')
      })

      collaseLink.forEach((link) => {
        link.classList.add('collapsed')
      })
    }
  }
}