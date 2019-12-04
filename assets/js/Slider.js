import Swiper from 'swiper'

export default class Slider {
  constructor (options = {}, namespace = 'swiper') {
    this.namespace = namespace
    this.options = {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 3000,
      },
    }
    this.instances = []
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.initSlider(entry.target)
          this.onSliderObserve(entry.target)
          this.observer.unobserve(entry.target)
        }
      })
    })
  }

  init () {
    const sliders = [...document.querySelectorAll(`.${this.namespace}:not(.${this.namespace}--thumbnails) .${this.namespace}-container`)]
    sliders.forEach(slider => this.observer.observe(slider))
  }

  onSliderObserve (slider) {
    return slider
  }

  initSlider (slider) {
    if (slider.className.indexOf(`${this.namespace}--ready`) !== -1) {
      return false
    }

    const controller = slider.parentNode.parentNode.querySelector(`.swiper--thumbnails`)

    this.setUp(slider, this.options)
    const currentInstance = new Swiper(slider, this.options)
    if (controller) {
      // Init controller
      this.options = Object.assign(this.options, {
        centeredSlides      : true,
        slidesPerView       : 3,
        spaceBetween        : 15,
        slideToClickedSlide : true,
        on                  : {
          init : function () {
          }
        }
      })

      const controllerInstance = new Swiper(controller, this.options)

      // Connect swiper to each other
      currentInstance.controller = controllerInstance
      controllerInstance.controller = currentInstance

      // Setup thumbnails click events
      const controllerSlides = [...controller.querySelectorAll(`.${this.namespace}-slide`)]

      controllerSlides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
          currentInstance.slideTo(index)
          controllerSlides.forEach((item) => item.classList.remove(`${this.namespace}-slide-active`))
          slide.classList.add(`${this.namespace}-slide-active`)
        })
      })

      // Setup thubmnails click events
      this.instances.push(controllerInstance)
    }

    this.instances.push(currentInstance)
    slider.classList.add(`${this.namespace}--ready`)
  }

  setUp (slider) {
    this.options.slidesPerView = 1
    this.options.spaceBetween = 0
  }

  /**
   * Returns null or next key in object
   * @param key
   * @param obj
   * @returns {string|null}
   */
  nextKey (key, obj) {
    let found = false
    for (let k in obj) {
      if (found) { return k }
      if (k === key) { found = true }
    }

    return null
  }
}