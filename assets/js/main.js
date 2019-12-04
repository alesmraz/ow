import 'jquery'
import 'popper.js'
import 'bootstrap'
import objectFitImages from 'object-fit-images'
import Slider from './Slider'
import Filter from './Filter'
import MobileList from './MobileList'
import InputCounter from './InputCounter'
import Cart from './Cart'
import Modal from './Modal'
import Forms from './Forms'
import Photoswipe from './Photoswipe'
import Buyerpannel from './Buyerpannel'
import BackLink from './BackLink'

document.addEventListener('DOMContentLoaded', () => {
  const sliders = new Slider()
  sliders.init()

  const filter = new Filter();
  filter.init();

  objectFitImages() // Polyfill: Object-fit (css property)

  // Responsive mobile list
  window.mobileList = new MobileList()
  window.mobileList.init()

  const inputCounter = new InputCounter()
  inputCounter.init()

  const cart = new Cart()
  cart.init()

  const modal = new Modal();
  modal.init()

  const forms = new Forms();
  forms.init()

  const photoswipe = new Photoswipe()
  photoswipe.init()

  const buyerpannel = new Buyerpannel();
  buyerpannel.init()

  const backLink = new BackLink();
  backLink.init();

});