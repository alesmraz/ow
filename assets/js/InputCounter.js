export default class InputCounter {
  constructor() {
    this.selector = '.inputCounter'
    this.bottlesInBox = 6
  }

  init () {
    const inputs = [...document.querySelectorAll(this.selector)]

    if (inputs.length) {
      inputs.forEach(input => {
        this.controlInput(input)
      })
    }
  }

  controlInput(input) {
    const plus = input.querySelector('.plus')
    const minus = input.querySelector('.minus')
    const number = input.querySelector('input')
    const type = input.name // bottle, box or pet

    if (plus && minus && number) {
      plus.addEventListener('click', () => {
        number.value++
        this.getActualData(number.name, number.value)
      })

      minus.addEventListener('click', () => {
        if (number.value > 0) {
          number.value--
          this.getActualData(number.name, number.value)
        }
      })

      number.addEventListener('change', () => {
        this.getActualData(number.name, number.value)
      })

    }
  }

  getActualData(type, inputValue) {
    //TODO: add ajax call to server to fetch calc price. then fill variable: values - now with mock data.
  }


}