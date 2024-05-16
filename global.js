console.log("V1.56");


/// Initialize Swup
const swup = new Swup();

// Listen for content replaced event
swup.hooks.on('content:replace', () => {
    // Get the current pathname of the URL
    const pathname = window.location.pathname;

    // Check if the pathname is either '/' or an empty string
    if (pathname === '/' || pathname === '') {
        // Run your function here
        navTransparent();
    } else {
      navWhite();
    }
});



// Function to check if the current URL is the homepage
function isHomePage() {
  const currentUrl = window.location.pathname;
  return currentUrl === '/' || currentUrl === '';
}


// Function to apply the transparent navigation styles
function navTransparent() {
  // Select the elements
  const containerBlur = document.querySelector('.container__blur');
  const navDropdowns = document.querySelectorAll('.nav__dropdown');
  const buttons = document.querySelectorAll('.button.is--nav');
  const logoLarge = document.querySelector('.logo.is--large');
  const logoWhite = document.querySelector('.logo.is--white');

  // Apply styles to invert colors without transition if it's the homepage
  if (containerBlur) {
      if (isHomePage()) {
          containerBlur.style.transition = 'none';
      } else {
          containerBlur.style.transition = 'filter 0.2s ease, opacity 0.2s ease';
      }
      containerBlur.style.filter = 'invert(100%)';
      containerBlur.style.opacity = '0';
  }

  if (navDropdowns) {
      navDropdowns.forEach((dropdown) => {
          dropdown.style.transition = isHomePage() ? 'none' : 'filter 0.2s ease';
          dropdown.style.filter = 'invert(100%)';
      });
  }

  // Hide the large logo
  if (logoLarge) {
      logoLarge.style.display = isHomePage() ? 'none' : 'block';
  }

  // Show the white logo
  if (logoWhite) {
      logoWhite.style.display = isHomePage() ? 'block' : 'none';
  }

  // Invert and increase brightness of buttons
  if (buttons) {
      buttons.forEach((button) => {
          button.style.transition = isHomePage() ? 'none' : 'filter 0.2s ease';
          button.style.filter = 'invert(100%) brightness(200%)';
      });
  }
}


function navWhite() {
  // Select the elements
  const containerBlur = document.querySelector('.container__blur');
  const navDropdowns = document.querySelectorAll('.nav__dropdown');
  const buttons = document.querySelectorAll('.button.is--nav');
  const logoLarge = document.querySelector('.logo.is--large');
  const logoWhite = document.querySelector('.logo.is--white');

  // Reset styles
  if (containerBlur) {
      containerBlur.style.transition = 'opacity 0.2s ease';
      containerBlur.style.filter = 'invert(0)';
      
      // Delay opacity reset by 0.1 seconds
      setTimeout(() => {
          containerBlur.style.opacity = '1';
      }, 50);
  }

  if (navDropdowns) {
      navDropdowns.forEach((dropdown) => {
          dropdown.style.transition = 'filter 0.1s ease';
          dropdown.style.filter = 'invert(0)';
      });
  }

  // Show the large logo
  if (logoLarge) {
      logoLarge.style.display = 'block';
  }

  // Hide the white logo
  if (logoWhite) {
      logoWhite.style.display = 'none';
  }

  // Reset buttons
  if (buttons) {
      buttons.forEach((button) => {
          button.style.transition = 'filter 0.2s ease';
          button.style.filter = 'invert(0) brightness(100%)';
      });
  }
}



// Call navTransparent() when the document is ready and URL is the homepage
document.addEventListener('DOMContentLoaded', function () {
  if (isHomePage()) {
      navTransparent();
  }
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