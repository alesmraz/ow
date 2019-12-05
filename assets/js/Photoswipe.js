import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

export default class Photoswipe {
  constructor() {}

  init() {
    let initPhotoSwipeFromDOM = (gallerySelector) => {
      // parse slide data (url, title, size ...) from DOM elements
      // (children of gallerySelector)
      let parseThumbnailElements = (el) => {
        let thumbElements = el.childNodes,
          numNodes = thumbElements.length,
          items = [],
          figureEl,
          linkEl,
          size,
          item;

        for (let i = 0; i < numNodes; i++) {
          figureEl = thumbElements[i]; // <figure> element

          // include only element nodes
          if (figureEl.nodeType !== 1) {
            continue;
          }

          linkEl = figureEl.children[0]; // <a> element

          if (linkEl) {
            const datasize = linkEl.getAttribute("data-size")

            if (datasize) {
              size = datasize.split("x");

              // create slide object
              item = {
                src: linkEl.getAttribute("href"),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
              };

              if (figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML;
              }

              if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute("src");
              }

              item.el = figureEl; // save link to element for getThumbBoundsFn
              items.push(item);
            }
          }
        }

        return items;
      };

      // find nearest parent element
      let closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
      };

      // triggers when user clicks on thumbnail
      let onThumbnailsClick = (e) => {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);

        let eTarget = e.target || e.srcElement;

        // find root element of slide
        let clickedListItem = closest(eTarget, (el) => {
          return el.tagName && el.tagName.toUpperCase() === "DIV";
        });

        if (!clickedListItem) {
          return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        let clickedGallery = clickedListItem.parentNode,
          childNodes = clickedListItem.parentNode.childNodes,
          numChildNodes = childNodes.length,
          nodeIndex = 0,
          index;

        for (let i = 0; i < numChildNodes; i++) {
          if (childNodes[i].nodeType !== 1) {
            continue;
          }

          if (childNodes[i] === clickedListItem) {
            index = nodeIndex;
            break;
          }
          nodeIndex++;
        }

        if (index >= 0) {
          // open PhotoSwipe if valid index found
          openPhotoSwipe(index, clickedGallery);
        }
        return false;
      };

      // parse picture index and gallery index from URL (#&pid=1&gid=2)
      let photoswipeParseHash = () => {
        let hash = window.location.hash.substring(1),
          params = {};

        if (hash.length < 5) {
          return params;
        }

        let vars = hash.split("&");
        for (let i = 0; i < vars.length; i++) {
          if (!vars[i]) {
            continue;
          }
          let pair = vars[i].split("=");
          if (pair.length < 2) {
            continue;
          }
          params[pair[0]] = pair[1];
        }

        if (params.gid) {
          params.gid = parseInt(params.gid, 10);
        }

        return params;
      };

      let openPhotoSwipe = function(
        index,
        galleryElement,
        disableAnimation,
        fromURL
      ) {
        let pswpElement = document.querySelectorAll(".pswp")[0],
          gallery,
          options,
          items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)

        options = {
          /* "showHideOpacity" uncomment this If dimensions of your small thumbnail don't match dimensions of large image */
          //showHideOpacity:true,

          // Buttons/elements
          closeEl: true,
          captionEl: true,
          fullscreenEl: true,
          zoomEl: true,
          shareEl: false,
          counterEl: false,
          arrowEl: true,
          preloaderEl: true,
          // define gallery index (for URL)
          galleryUID: galleryElement.getAttribute("data-pswp-uid"),
          getThumbBoundsFn: (index) => {
            // See Options -> getThumbBoundsFn section of documentation for more info
            if (items[index]) {
              let thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
                pageYScroll =
                  window.pageYOffset || document.documentElement.scrollTop,
                rect = thumbnail.getBoundingClientRect();
              return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
            }
            return { x: 0, y: 0, w: 0 };

          }
        };

        // PhotoSwipe opened from URL
        if (fromURL) {
          if (options.galleryPIDs) {
            // parse real index when custom PIDs are used
            // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
            for (let j = 0; j < items.length; j++) {
              if (items[j].pid == index) {
                options.index = j;
                break;
              }
            }
          } else {
            // in URL indexes start from 1
            options.index = parseInt(index, 10) - 1;
          }
        } else {
          options.index = parseInt(index, 10);
        }

        // exit if index not found
        if (isNaN(options.index)) {
          return;
        }

        if (disableAnimation) {
          options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI, items, options);
        gallery.init();

      };

      // loop through all gallery elements and bind events
      let galleryElements = document.querySelectorAll(gallerySelector);

      for (let i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute("data-pswp-uid", i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
      }

      // Parse URL and open gallery if it contains #&pid=3&gid=1
      let hashData = photoswipeParseHash();
      if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
      }
    };

    initPhotoSwipeFromDOM(".pswp-gallery");
  }
}