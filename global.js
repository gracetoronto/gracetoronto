console.log("V1.42");

/// Initialize Swup
const swup = new Swup();

// Listen for content replaced event
swup.on('contentReplaced', () => {
    // Get the current URL
    const currentUrl = window.location.href;

    // Check if the current URL matches the specific URL you want to target
    if (currentUrl === 'http://example.com/specific-url') {
        // Run your function here
        // myFunction();
        console.log('The function has run successfully');
    }
});

// Define your function to run when navigating to the specific URL
function myFunction() {
    // Your code here
    console.log('Function executed when navigating to specific URL.');
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