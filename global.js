console.log("V1.63");


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
  const containerBlurs = document.querySelectorAll('.container__blur');
  const mainContainerBlurs = document.querySelectorAll('.container__blur.is--main');
  const buttons = document.querySelectorAll('.button.is--nav');
  const logoLarge = document.querySelectorAll('.logo__large');
  const logoWhite = document.querySelectorAll('.logo.is--white');
  const dropdownTexts = document.querySelectorAll('.button--text.is--dropdown');

  // Apply filter styles to invert colors
  if (containerBlurs) {
    containerBlurs.forEach((containerBlur) => {
      containerBlur.style.filter = 'invert(95%)';
    });
  }

  // Apply opacity styles with a slight delay
  if (mainContainerBlurs) {
    mainContainerBlurs.forEach((containerBlur) => {
      if (isHomePage()) {
        containerBlur.style.transition = 'none';
        containerBlur.style.opacity = '0';
      } else {
        containerBlur.style.transition = 'opacity 0.2s ease';
        setTimeout(() => {
          containerBlur.style.opacity = '0';
        }, 10);
      }
    });
  }

  // Hide the large logo
  if (logoLarge) {
    logoLarge.forEach((logo) => {
      logo.style.display = isHomePage() ? 'none' : 'block';
    });
  }

  // Show the white logo
  if (logoWhite) {
    logoWhite.forEach((logo) => {
      logo.style.display = isHomePage() ? 'block' : 'none';
    });
  }

  // Invert and increase brightness of buttons
  if (buttons) {
    buttons.forEach((button) => {
      button.style.transition = isHomePage() ? 'none' : 'filter 0.2s ease';
      button.style.filter = 'invert(100%) brightness(200%)';
    });
  }

  // Invert and increase brightness of dropdown texts
  if (dropdownTexts) {
    dropdownTexts.forEach((dropdownText) => {
      dropdownText.style.transition = isHomePage() ? 'none' : 'filter 0.2s ease';
      dropdownText.style.filter = 'invert(100%) brightness(200%)';
    });
  }
}

// Function to expand the navigation
function navWhite() {
  // Select the elements
  const containerBlurs = document.querySelectorAll('.container__blur');
  const mainContainerBlurs = document.querySelectorAll('.container__blur.is--main');
  const buttons = document.querySelectorAll('.button.is--nav');
  const logoLarge = document.querySelectorAll('.logo__large');
  const logoWhite = document.querySelectorAll('.logo.is--white');
  const dropdownTexts = document.querySelectorAll('.button--text.is--dropdown');

  // Reset filter styles
  if (containerBlurs) {
    containerBlurs.forEach((containerBlur) => {
      containerBlur.style.filter = 'invert(0)';
    });
  }

  // Reset opacity styles
  if (mainContainerBlurs) {
    mainContainerBlurs.forEach((containerBlur) => {
      containerBlur.style.transition = 'opacity 0.2s ease';

      // Delay opacity reset by 0.1 seconds
      setTimeout(() => {
        containerBlur.style.opacity = '1';
      }, 50);
    });
  }

  // Show the large logo
  if (logoLarge) {
    logoLarge.forEach((logo) => {
      logo.style.display = 'block';
    });
  }

  // Hide the white logo
  if (logoWhite) {
    logoWhite.forEach((logo) => {
      logo.style.display = 'none';
    });
  }

  // Reset buttons
  if (buttons) {
    buttons.forEach((button) => {
      button.style.transition = 'filter 0.2s ease';
      button.style.filter = 'invert(0) brightness(100%)';
    });
  }

  // Reset dropdown texts
  if (dropdownTexts) {
    dropdownTexts.forEach((dropdownText) => {
      dropdownText.style.transition = 'filter 0.2s ease';
      dropdownText.style.filter = 'invert(0) brightness(100%)';
    });
  }
}

// Function to shrink the navigation
function navShrink() {
  // Select the elements
  const primaryContainers = document.querySelectorAll('.primary__container');
  const navBanners = document.querySelectorAll('.nav__banner');
  const logoLarge = document.querySelectorAll('.logo__large');
  const logoSmall = document.querySelectorAll('.logo__small');

  // Decrease height of primary container on devices greater than 479px
  if (primaryContainers) {
    primaryContainers.forEach((container) => {
      if (window.innerWidth > 479) {
        container.style.height = '70px';
        container.style.transition = 'height 0.3s ease';
      }
    });
  }

  // Decrease height of nav banner
  if (navBanners) {
    navBanners.forEach((banner) => {
      banner.style.height = '0px';
      banner.style.transition = 'height 0.3s ease';
    });
  }

  // Hide large logos
  if (logoLarge) {
    logoLarge.forEach((logo) => {
      logo.style.display = 'none';
    });
  }

  // Show small logos
  if (logoSmall) {
    logoSmall.forEach((logo) => {
      logo.style.display = 'block';
    });
  }

  // If homepage, fire navWhite() when scrolled past 200px
  if (isHomePage()) {
    navWhite();
  }
}

// Function to expand the navigation
function navExpand() {
  // Select the elements
  const primaryContainers = document.querySelectorAll('.primary__container');
  const navBanners = document.querySelectorAll('.nav__banner');
  const logoLarge = document.querySelectorAll('.logo__large');
  const logoSmall = document.querySelectorAll('.logo__small');

  // Increase height of primary container on devices greater than 479px
  if (primaryContainers) {
    primaryContainers.forEach((container) => {
      if (window.innerWidth > 479) {
        container.style.height = '100px';
        container.style.transition = 'height 0.3s ease';
      }
    });
  }

  // Increase height of nav banner
  if (navBanners) {
    navBanners.forEach((banner) => {
      banner.style.height = '40px';
      banner.style.transition = 'height 0.3s ease';
    });
  }

  // Show large logos
  if (logoLarge) {
    logoLarge.forEach((logo) => {
      logo.style.display = 'block';
    });
  }

  // Hide small logos
  if (logoSmall) {
    logoSmall.forEach((logo) => {
      logo.style.display = 'none';
    });
  }

  // If homepage, fire navTransparent() when scrolled less than 200px
  if (isHomePage()) {
    navTransparent();
  }
}

// Event listener to handle scroll event
window.addEventListener('scroll', function() {
  if (window.scrollY > 200) {
    navShrink();
  } else {
    navExpand();
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