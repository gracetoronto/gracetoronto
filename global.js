console.log("V1.12");


const swup = new Swup({
    // plugins: [new SwupProgressPlugin()]
  });
  
  swup.hooks.on('page:view', () => {
    // This runs after every page change
    // example();  
  });
  
  swup.hooks.on('visit:end', () => {
    // This runs after each Swup transition completes
    console.log('Transition completed. Initializing slideshows...');
    // example();
  });


//Scroll Enable/Disable

let scrollPos = 0;

function scrollDisable() {
  document.body.classList.add('scroll--disabled');
  scrollPos = window.scrollY;
}

function scrollEnable() {
  document.body.classList.remove('scroll--disabled');
  window.scrollTo(0, scrollPos);
}

 document.getElementById('menu-open').addEventListener('click', function () {
  scrollDisable();
 });

 document.getElementById('menu-close').addEventListener('click', function () {
  scrollEnable();
  setTimeout(function() {
    document.getElementById('subpage-1').scrollTop = 0;
    document.getElementById('subpage-2').scrollTop = 0;
  }, 500);
 });

 document.getElementById('return-1').addEventListener('click', function () {
  setTimeout(function() {
    document.getElementById('subpage-1').scrollTop = 0;
  }, 500);
 });

 document.getElementById('return-2').addEventListener('click', function () {
  setTimeout(function() {
    document.getElementById('subpage-2').scrollTop = 0;
  }, 500);
 });
  





  
  
  
  
  
  //Close nav menu if device width is greater than 479px
  
  function checkWindowWidth() {
    const windowWidth = window.innerWidth;
  
    if (windowWidth > 479) {
      document.getElementById('menu-close').click();
    }
  }
  
  window.addEventListener('resize', checkWindowWidth);

