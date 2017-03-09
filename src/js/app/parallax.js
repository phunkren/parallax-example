// 1. Fix the parallax container when it reaches the top of the page

// 2a. Calculate the height of each row in the parallax container
// 2b. As the user scrolls, subtract pixels from the height of the div

// 3. Once all content has been shown, return the parallax container to static positioning 

export default class Parallax {
  
  constructor() {
    this.elements = {
      html: document.querySelectorAll('html')[0],
      body: document.querySelectorAll('body')[0],
      parallax: document.querySelectorAll('#parallax')[0],
      fixed: 'u-fixed',
      active: false,
    }

    this.activate();
  }

  activate() {
    
    this.active = true;
    this.elements.parallax.classList.add(this.elements.fixed);
    this.elements.html.style.overflowY = 'hidden';

    this.setImgHeights();
  }

  setImgHeights() {
    const parallaxRows = this.elements.parallax.getElementsByClassName('c-parallax__row');

    for (let row = 0; row < parallaxRows.length; row++) {
      
      // For each row, find the panel quadrant and retrieve it's rendered height;
      const panel = parallaxRows[row].getElementsByClassName('js-panel-quadrant')[0];
      const panelQuadrant = parallaxRows[row].getElementsByClassName('c-parallax__panelQuadrant')[0];

      const $rowHeight = $(panel).height();

      // Assign the height amongst each of the row's images
      const rowImages = parallaxRows[row].getElementsByClassName('c-parallax__imgQuadrant__img');
      const imgHeight = $rowHeight / rowImages.length;

      for (let img = 0; img < rowImages.length; img++) {
        rowImages[img].style.height = `${imgHeight}px`;
      }

      var last_known_scroll_position = 0;
      var ticking = false;
      var self = this;

      panelQuadrant.addEventListener('scroll', (e) => { 

        if (!ticking) {
          last_known_scroll_position = window.scrollY;

          window.requestAnimationFrame(() => {       
            self.overlapImages(panelQuadrant.scrollTop, rowImages, imgHeight);
            ticking = false;
          });
        }

        ticking = true;

      });
    }
  }

  overlapImages(scrollPosition, rowImages, imgHeight) {

    // Reduce the height of the images on scroll, starting with the lowest
    let value = imgHeight - scrollPosition;

    rowImages[rowImages.length-1].style.height = `${value}px`; 

  }
}
  
