console.log("V1.41");

// SWUP main code
const swup = new Swup({
  animateHistoryBrowsing: false,
  animationSelector: '[class*="transition-"]',
  animationScope: 'html',
  cache: true,
  containers: ['#swup'],
  ignoreVisit: (url, { el } = {}) => el?.closest('[data-no-swup]'),
  linkSelector: 'a[href]',
  linkToSelf: 'scroll',
  native: false,
  plugins: [],
  resolveUrl: (url) => url,
  requestHeaders: {
    'X-Requested-With': 'swup',
    'Accept': 'text/html, application/xhtml+xml'
  },
  skipPopStateHandling: (event) => event.state?.source !== 'swup',
  timeout: 0
});

function reinitializeWebflow() {
  try {
    if (window.Webflow) {
      console.log("Reinitializing Webflow...");
      window.Webflow.destroy(); // Destroy the current instance
      window.Webflow.ready();   // Reinitialize Webflow
      window.Webflow.require("ix2").init(); // Reinitialize Interactions 2.0
      console.log("Webflow reinitialized successfully.");
    } else {
      console.error("Webflow is not defined.");
    }
  } catch (error) {
    console.error("Error reinitializing Webflow:", error);
  }
}

function triggerPageChangeClicks() {
  try {
    const pageChangeElement = document.getElementById('page-change');
    const pageChangeDarkElement = document.getElementById('page-change-dark');
    if (pageChangeElement) {
      pageChangeElement.click();
      console.log("Clicked #page-change.");
    } else {
      console.error("#page-change element not found.");
    }
    if (pageChangeDarkElement) {
      pageChangeDarkElement.click();
      console.log("Clicked #page-change-dark.");
    } else {
      console.error("#page-change-dark element not found.");
    }
  } catch (error) {
    console.error("Error triggering page change clicks:", error);
  }
}

// Use Swup hooks correctly
swup.hooks.on('content:replace', () => {
  console.log("Swup content replaced.");
  reinitializeWebflow();
  triggerPageChangeClicks();
});

swup.hooks.on('page:view', () => {
  console.log("Swup page view.");
  setTimeout(() => {
    reinitializeWebflow();
    triggerPageChangeClicks();
  }, 100); // Slight delay to ensure DOM is ready
});

// Define custom transition function with delay
function customTransition() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000); // 1 second delay
  });
}






































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
  setTimeout(function () {
    document.getElementById('subpage-1').scrollTop = 0;
    document.getElementById('subpage-2').scrollTop = 0;
  }, 500);
});

document.getElementById('return-1').addEventListener('click', function () {
  setTimeout(function () {
    document.getElementById('subpage-1').scrollTop = 0;
  }, 250);
});

document.getElementById('return-2').addEventListener('click', function () {
  setTimeout(function () {
    document.getElementById('subpage-2').scrollTop = 0;
  }, 250);
});











//Close nav menu if device width is greater than 479px

var previousWindowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

window.addEventListener('resize', function() {
    var currentWindowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    
    if (previousWindowWidth < 479 && currentWindowWidth >= 479) {
      document.getElementById('menu-close').click();
    }

    // Update the previous window width
    previousWindowWidth = currentWindowWidth;
});