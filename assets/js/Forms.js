export default class Forms {
  constructor() {

  }

  init() {
    this.initPasswordShow()
  }

  initPasswordShow() {
    const passwordShowButtons = [...document.querySelectorAll('.password-show')]

    if (passwordShowButtons.length) {

      passwordShowButtons.forEach((button) => {
        button.addEventListener('click', (ev) => {
          ev.preventDefault()

          const target = button.dataset.target

          if (target) {
            const targetInput = document.querySelector(target)

            if (targetInput) {
              if (targetInput.type === 'password') {
                targetInput.type = 'text'
              } else {
                targetInput.type = 'password'
              }
            }

          }

        })
      })

    }
  }
}