console.log("V1.08");


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
 });
  





  // //Simulate click on shadow link to delay navigation until menu is closed
  // document.getElementById('mobile__link1').addEventListener('click', function () {
  //   mobileNavClose();
  //   setTimeout(function () {
  //     document.getElementById('shadow__link1').click();
  //   }, 400);
  // });
  
  // document.getElementById('mobile__link2').addEventListener('click', function () {
  //   mobileNavClose();
  //   setTimeout(function () {
  //     document.getElementById('shadow__link2').click();
  //   }, 400);
  // });
  


  // //Simulate click on logo and close mobile nav if needed
  // document.getElementById('wordmark').addEventListener('click', function () {
  //   if (mobileNav.classList.contains('is--hidden')) {
  //     document.getElementById('shadow__link0').click();
  //   } else {
  //     mobileNavClose();
  //     setTimeout(function () {
  //       document.getElementById('shadow__link0').click();
  //     }, 400);
  //   }
  // });
  
  // //simulate click on contact link
  // document.getElementById('mobile__link4').addEventListener('click', function () {
  //   mobileNavClose();
  //   showContact();
  // });
  
  
  
  
  //Close nav menu if device width is greater than 479px
  
  function checkWindowWidth() {
    const windowWidth = window.innerWidth;
  
    if (windowWidth > 479) {
      document.getElementById('menu-close').click();
    }
  }
  
  window.addEventListener('resize', checkWindowWidth);

