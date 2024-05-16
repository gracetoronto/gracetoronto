console.log("V1.48");


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

// Define your function to run when navigating to the specific URL
function navTransparent() {
    console.log('Nav is transparent');
}

function navWhite() {
  console.log('Nav is white');
}





function navTransparent() {
  // Select the elements
  const containerBlur = document.querySelector('.container__blur');
  const navDropdowns = document.querySelectorAll('.nav__dropdown');
  const textElements = document.querySelectorAll('.button--text.is--nav');

  // Apply styles to invert colors with transition
  if (containerBlur) {
      containerBlur.style.transition = 'filter 0.2s ease, opacity 0.2s ease';
      containerBlur.style.filter = 'invert(100%)';
      containerBlur.style.opacity = '0';
  }

  if (navDropdowns) {
      navDropdowns.forEach((dropdown) => {
          dropdown.style.transition = 'filter 0.2s ease';
          dropdown.style.filter = 'invert(100%)';
      });
  }

  // Change text color to white
  if (textElements) {
      textElements.forEach((textElement) => {
          textElement.style.color = '#FFFFFF'; // White color
      });
  }
}

function navWhite() {
  // Select the elements
  const containerBlur = document.querySelector('.container__blur');
  const navDropdowns = document.querySelectorAll('.nav__dropdown');
  const textElements = document.querySelectorAll('.button--text.is--nav');

  // Reset styles
  if (containerBlur) {
      containerBlur.style.transition = 'filter 0.2s ease, opacity 0.2s ease';
      containerBlur.style.filter = 'invert(0)';
      containerBlur.style.opacity = '1';
  }

  if (navDropdowns) {
      navDropdowns.forEach((dropdown) => {
          dropdown.style.transition = 'filter 0.2s ease';
          dropdown.style.filter = 'invert(0)';
      });
  }

  // Change text color back to #606060
  if (textElements) {
      textElements.forEach((textElement) => {
          textElement.style.color = '#606060'; // #606060 color
      });
  }
}






function navWhite() {
  // Select the elements
  const containerBlur = document.querySelector('.container__blur');
  const navDropdowns = document.querySelectorAll('.nav__dropdown');
  const textElements = document.querySelectorAll('.button--text.is--nav');

  // Reset styles
  if (containerBlur) {
      containerBlur.style.transition = 'filter 0.2s ease, opacity 0.2s ease';
      containerBlur.style.filter = 'invert(0)';
      containerBlur.style.opacity = '1';
  }

  if (navDropdowns) {
      navDropdowns.forEach((dropdown) => {
          dropdown.style.transition = 'filter 0.2s ease';
          dropdown.style.filter = 'invert(0)';
      });
  }

  // Change text color back to #606060
  if (textElements) {
      textElements.forEach((textElement) => {
          textElement.style.color = '#606060'; // #606060 color
      });
  }
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