//============================= Scroll Up ===================//

function scrollUp(){
const scrollup = document.getElementById('scroll-up');
if(this.scrollY >= 560) {
    scrollup.classList.add('show-scroll');
}
else {
    scrollup.classList.remove('show-scroll');
}
}

window.addEventListener('scroll', scrollUp)

//================================================================ CARD =================//
function factor(elemA,elemB, prop) {
    //This method returns a DOMRect object with eight properties:
    const sizeA = elemA.getBoundingClientRect()[prop];
    const sizeB = elemB.getBoundingClientRect()[prop];
    console.log(sizeB/sizeA)
    return (sizeB / sizeA)
}
const height = (elem) => {
    return elem.getBoundingClientRect().height
}

const distance = (elemA, elemB, prop) => {
    const sizeA = elemA.getBoundingClientRect()[prop];
    const sizeB = elemB.getBoundingClientRect()[prop];
    return (sizeB - sizeA)
}

document.querySelectorAll('.card').forEach(i=>{
    const head = i.querySelector('.card__head')
    const image = i.querySelector('.card__image')
    const author = i.querySelector('.card__author')
    const body = i.querySelector('.card__body')
    const foot = i.querySelector('.card__foot')

    console.log(head.getBoundingClientRect())

    //using event handlers instead of event listeners
    i.onmouseenter = () => {
        console.log('mouse enter')
        i.classList.add('hover') //text white color & bg blue
        //we haven't added yet but we will get that in a second

        //now the bg scale
        const imageScale = 1 + factor(head, body, 'height')
        image.style.transform = `scale(${imageScale})`;

        //body moving up
        const bodyDistance = height(foot) * -1
        body.style.transform = `translateY(${bodyDistance}px)`

        //head mobing up
        const authorDistance = distance(head, author, 'height') 
        author.style.transform = `translateY(${authorDistance}px)`;
    }
    i.onmouseleave = () => {
        console.log('mouse leave')
        i.classList.remove('hover');
        //re-start the transform property 
        image.style.transform = 'none';
        body.style.transform = 'none';
        author.style.transform = 'none';
    }
})

$.fn.commentCards = function(){

    return this.each(function(){
  
      var $this = $(this),
          $cards = $this.find('.card'),
          $current = $cards.filter('.card--current'),
          $next;
  
      $cards.on('click',function(){
        if ( !$current.is(this) ) {
          $cards.removeClass('card--current card--out card--next');
          $current.addClass('card--out');
          $current = $(this).addClass('card--current');
          $next = $current.next();
          $next = $next.length ? $next : $cards.first();
          $next.addClass('card--next');
        }
      });
  
      if ( !$current.length ) {
        $current = $cards.last();
        $cards.first().trigger('click');
      }
  
      $this.addClass('cards--active');
  
    })
  
  };
  
  $('.cards').commentCards();