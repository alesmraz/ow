export default class MobileList {
  constructor () {
    this.firstLevelHeight = 0
    this.mobileList = null
    this.mobileSide = null
    this.mobileSideInner = null
  }

  init () {
    const lists = document.querySelectorAll('.mobileList[data-level="1"]')
    const backlinkPrototype = '<li class="mobileList__item"><a href="#" class="mobileList__link mobileList__link--backlink"><img class="icon" src="./assets/svg/mobile-move-left.svg"><span class="ml-2">Zpět</span></li>'
    this.mobileSide = document.querySelector('.mobileSide')

    if (this.mobileSide) {
      this.mobileSideInner = this.mobileSide.querySelector('.mobileSide__inner')
      this.mobileList = document.createElement('ul')
      this.mobileList.classList.add('mobileList')

      if (!lists.length || !this.mobileSide) {
        return false
      }

      [...lists].forEach(list => {
        [...list.querySelectorAll('li')].forEach(listItem => {
          // prepare stucture for inner list, hide all by .is-hidden class and append backlinks
          const innerUl = listItem.querySelector('ul')
          const innerLink = listItem.querySelector('a')

          if (innerUl) {
            innerUl.insertAdjacentHTML('afterBegin', `<li class="mobileList__item"><a class="mobileList__link" href="${innerLink.getAttribute('href')}">${innerLink.textContent}</a></li>`)
            innerUl.insertAdjacentHTML('afterBegin', backlinkPrototype)
            innerUl.classList.add('mobileList--hidden')
            innerLink.insertAdjacentHTML('beforeEnd', '<img class="icon" src="./assets/svg/mobile-move-right.svg" alt="">')
          }

          this._setupEvents(listItem)
        })

        const children = [...list.children]
        children.forEach(listItem => {

          this.firstLevelHeight += 0
          this.mobileList.appendChild(listItem)
        })

        list.parentNode.removeChild(list)
      })

      // Add event listener
      const mobileSideTogglers = [...document.querySelectorAll('[data-toggle="mobileSide"]')]
      if (mobileSideTogglers.length) {

        mobileSideTogglers.forEach((mobileSide) => {
          mobileSide.addEventListener('click', event => {
            event.preventDefault()
            this._toggle()
          })
        })
      }

      this._setProperLevelHeight(this.mobileList)
      this.mobileSideInner.appendChild(this.mobileList)

      setTimeout(() => {
        this.mobileSide.classList.remove('hide')
      }, 800)
    }
  }

  _hasNextLevel (listItem) {
    return listItem.querySelector('ul')
  }

  _setupEvents (listItem) {
    // Move to next level when link is clicked
    if (this._hasNextLevel(listItem)) {
      listItem.querySelector('a:not(.mobileList__link--backlink)').addEventListener('click', (event) => {
        event.preventDefault()
        const nextUl = listItem.querySelector('ul')

        if (nextUl) {
          if (nextUl.classList.contains('mobileList--hidden')) {
            nextUl.classList.remove('mobileList--hidden', 'mobileList--moves-out')
            listItem.parentNode.classList.add('mobileList--moves-out')
          }

          this._setProperLevelHeight(nextUl)
          this._jumpToTop()
        }
      })
    }

    // Go back
    const backlink = listItem.querySelector('.mobileList__link--backlink')
    if (backlink) {
      backlink.addEventListener('click', (event) => {
        event.preventDefault()
        const parentUl = backlink.parentNode.parentNode
        const prevUl = parentUl.parentNode.parentNode

        parentUl.classList.add('mobileList--hidden')
        prevUl.classList.remove('mobileList--moves-out')

        this._setProperLevelHeight(prevUl)
        this._jumpToTop()
      })
    }
  }

  _toggle () {
    this.mobileSide = document.querySelector('.mobileSide')
    this.mobileSide.classList.toggle('mobileSide--open')

    const body = document.querySelector('body')
    body.classList.toggle('has--mobileSide')
  }

  _getHeightOfActiveLevel (list) {
    let height = 0
    const children = [...list.children]
    children.forEach(listItem => {
      height += listItem.getBoundingClientRect().height
    })

    return height
  }

  _jumpToTop () {
    this.mobileSide.scrollTop = 0
  }

  _setProperLevelHeight (list) {
    const currentListHeight = this._getHeightOfActiveLevel(list)
    const firstSection = this.mobileSide.querySelector('.mobileSide__section')

    if (firstSection) {
      if (currentListHeight > this.firstLevelHeight) {
        this.mobileList.style.height = `${currentListHeight}px`
        firstSection.style.paddingTop = `${currentListHeight}px`
      } else {
        this.mobileList.style.height = `${this.firstLevelHeight}px`
        firstSection.style.paddingTop = `${this.firstLevelHeight}px`
      }
    }
  }
}
