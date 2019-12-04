export default class Buyerpannel {
  constructor() {
    this.selector = '.type-select';
    this.hideClass = 'type__select--hide'
  }

  init() {
    const pannels = [...document.querySelectorAll(this.selector)]

    if (pannels.length) {
      const pannelsInputs = pannels.map((item) => {
        return [...item.querySelectorAll('label > input')]
      })


      pannelsInputs.forEach((singlePannel) => {
        if (singlePannel.length >= 2) {
          singlePannel.forEach((input) => {
            input.addEventListener('change', () => {
              input.checked = true
              this.switchView(input)
            })
          })
        }
      })

    }

  }

  switchView(input) {
    const target = input.dataset.target

    if (target) {
      const superParent = input.closest('.buyerpanel__typeSelect')

      if (superParent) {
        const image = superParent.querySelector(`.type__image[data-name="${target}"]`)
        const title = superParent.querySelector(`.type__title[data-name="${target}"]`)

        const imageToHide = [...superParent.querySelectorAll(`.type__image:not([data-name="${target}"])`)]
        const titleToHide = [...superParent.querySelectorAll(`.type__title:not([data-name="${target}"])`)]

        image.classList.remove('type__image--hide')
        title.classList.remove('type__title--hide')

        if (imageToHide.length) {
          imageToHide.forEach((image) => {
            image.classList.add('type__image--hide')
          })
        }

        if (titleToHide.length) {
          titleToHide.forEach((title) => {
            title.classList.add('type__title--hide')
          })
        }
      }

    } else {
      throw new Error('data-target attribute is missing!')
    }
  }

}