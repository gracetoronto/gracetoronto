console.log("V1.92");

//----PAGE TRANSITION FUNCTIONALITY----

/// Initialize Swup
const swup = new Swup();

// Listen for content replaced event
swup.hooks.on('content:replace', () => {
  // Get the current pathname of the URL
  const pathname = window.location.pathname;

  showCal();
  // Check if the pathname should have a transparent background
  if (isTransparentBg(pathname)) {
    // Run your function here
    navTransparent();
  } else {
    navWhite();
  }
});



//----NAVIGATION FUNCTIONALITY----

// Function to check if the current URL should have a transparent background
function isTransparentBg(pathname) {
  const transparentSlugs = ['/', '', '/about/beliefs']; // Add more slugs here as needed
  return transparentSlugs.includes(pathname);
}

// Function to apply the transparent navigation styles
function navTransparent() {
  // Select the elements
  const containerBlurs = document.querySelectorAll('.container__blur');
  const mainContainerBlurs = document.querySelectorAll('.container__blur.is--main');
  const buttons = document.querySelectorAll('.button.is--nav');
  const logoLarge = document.querySelectorAll('.logo.is--large');
  const logoWhite = document.querySelectorAll('.logo.is--white');
  const dropdownTexts = document.querySelectorAll('.button--text.is--dropdown');
  const bannerContainers = document.querySelectorAll('.banner__container.is--default');
  const bannerContents = document.querySelectorAll('.banner__content');
  const menuIcons = document.querySelectorAll('.menu__icon');

  // Apply filter styles to invert colors
  if (containerBlurs) {
    containerBlurs.forEach((containerBlur) => {
      containerBlur.style.filter = 'invert(93%)';
    });
  }

  // Apply opacity styles with a slight delay
  if (mainContainerBlurs) {
    mainContainerBlurs.forEach((containerBlur) => {
      if (isTransparentBg(window.location.pathname)) {
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

  // Hide the large logo and show the white logo using CSS classes
  if (logoLarge) {
    logoLarge.forEach((logo) => {
      logo.classList.add('hidden');
      logo.classList.remove('visible');
    });
  }

  if (logoWhite) {
    logoWhite.forEach((logo) => {
      logo.classList.add('visible');
      logo.classList.remove('hidden');
    });
  }

  // Invert and increase brightness of buttons
  if (buttons) {
    buttons.forEach((button) => {
      button.style.transition = isTransparentBg(window.location.pathname) ? 'none' : 'filter 0.2s ease';
      button.style.filter = 'invert(100%) brightness(200%)';
    });
  }

  // Invert and increase brightness of dropdown texts
  if (dropdownTexts) {
    dropdownTexts.forEach((dropdownText) => {
      dropdownText.style.transition = isTransparentBg(window.location.pathname) ? 'none' : 'filter 0.2s ease';
      dropdownText.style.filter = 'invert(100%)';
    });
  }

  // Invert banner container with transition
  if (bannerContainers) {
    bannerContainers.forEach((bannerContainer) => {
      bannerContainer.style.transition = 'filter 0.3s ease';
      bannerContainer.style.filter = 'invert(95%)';
    });
  }

  // Decrease brightness of banner content with transition
  if (bannerContents) {
    bannerContents.forEach((bannerContent) => {
      bannerContent.style.transition = 'filter 0.3s ease';
      bannerContent.style.filter = 'brightness(0%)';
    });
  }

  // Invert menu icons with transition
  if (menuIcons) {
    menuIcons.forEach((menuIcon) => {
      menuIcon.style.transition = 'filter 0.3s ease';
      menuIcon.style.filter = 'invert(100%)';
    });
  }
}

// Function to change nav back to default white
function navWhite() {
  // Select the elements
  const containerBlurs = document.querySelectorAll('.container__blur');
  const mainContainerBlurs = document.querySelectorAll('.container__blur.is--main');
  const buttons = document.querySelectorAll('.button.is--nav');
  const logoLarge = document.querySelectorAll('.logo.is--large');
  const logoWhite = document.querySelectorAll('.logo.is--white');
  const dropdownTexts = document.querySelectorAll('.button--text.is--dropdown');
  const bannerContainers = document.querySelectorAll('.banner__container.is--default');
  const bannerContents = document.querySelectorAll('.banner__content');
  const menuIcons = document.querySelectorAll('.menu__icon');

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

  // Show the large logo and hide the white logo using CSS classes
  if (logoLarge) {
    logoLarge.forEach((logo) => {
      logo.classList.add('visible');
      logo.classList.remove('hidden');
    });
  }

  if (logoWhite) {
    logoWhite.forEach((logo) => {
      logo.classList.add('hidden');
      logo.classList.remove('visible');
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

  // Reset banner container with transition
  if (bannerContainers) {
    bannerContainers.forEach((bannerContainer) => {
      bannerContainer.style.transition = 'filter 0.3s ease';
      bannerContainer.style.filter = 'invert(0)';
    });
  }

  // Reset brightness of banner content with transition
  if (bannerContents) {
    bannerContents.forEach((bannerContent) => {
      bannerContent.style.transition = 'filter 0.3s ease';
      bannerContent.style.filter = 'brightness(100%)';
    });
  }

  // Reset menu icons with transition
  if (menuIcons) {
    menuIcons.forEach((menuIcon) => {
      menuIcon.style.transition = 'filter 0.3s ease';
      menuIcon.style.filter = 'invert(0)';
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

  // Hide large logos and show small logos using CSS classes
  if (logoLarge) {
    logoLarge.forEach((logo) => {
      logo.classList.add('hidden');
      logo.classList.remove('visible');
    });
  }

  if (logoSmall) {
    logoSmall.forEach((logo) => {
      logo.classList.add('visible');
      logo.classList.remove('hidden');
    });
  }

  // If homepage, fire navWhite() when scrolled past 200px
  if (isTransparentBg(window.location.pathname)) {
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

  // Show large logos and hide small logos using CSS classes
  if (logoLarge) {
    logoLarge.forEach((logo) => {
      logo.classList.add('visible');
      logo.classList.remove('hidden');
    });
  }

  if (logoSmall) {
    logoSmall.forEach((logo) => {
      logo.classList.add('hidden');
      logo.classList.remove('visible');
    });
  }

  // If homepage, fire navTransparent() when scrolled less than 200px
  if (isTransparentBg(window.location.pathname)) {
    navTransparent();
  }
}

// Event listener to handle scroll event
window.addEventListener('scroll', function () {
  if (window.scrollY > 200) {
    navShrink();
  } else {
    navExpand();
  }
});

// Ensure navTransparent is called on initial load if it's the homepage
document.addEventListener('DOMContentLoaded', function () {
  if (isTransparentBg(window.location.pathname)) {
    navTransparent();
  }
});

// Scroll Enable/Disable

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

// Close nav menu if device width is greater than 479px

var previousWindowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

window.addEventListener('resize', function () {
  var currentWindowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (previousWindowWidth < 479 && currentWindowWidth >= 479) {
    document.getElementById('menu-close').click();
  }

  // Update the previous window width
  previousWindowWidth = currentWindowWidth;
});










//----ACCORDION FUNCTIONALITY----

document.addEventListener('DOMContentLoaded', () => {
  const initializeAccordions = () => {
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
      const items = accordion.querySelectorAll('.accordion__item');

      items.forEach(item => {
        const title = item.querySelector('.accordion__title');
        const content = item.querySelector('.accordion__content');
        const plusIcon = item.querySelector('.accordion__plus');
        const minusIcon = item.querySelector('.accordion__minus');

        // Initially hide all content and show plus icons
        content.style.height = '0';
        content.style.overflow = 'hidden';
        plusIcon.style.display = 'block';
        minusIcon.style.display = 'none';

        // Add click event to the title
        title.addEventListener('click', () => {
          // Close all other items
          items.forEach(otherItem => {
            if (otherItem !== item) {
              const otherContent = otherItem.querySelector('.accordion__content');
              const otherPlusIcon = otherItem.querySelector('.accordion__plus');
              const otherMinusIcon = otherItem.querySelector('.accordion__minus');

              // Trigger the height transition for closing
              if (otherContent.style.height !== '0px') {
                otherContent.style.height = otherContent.scrollHeight + 'px'; // Set to scrollHeight to trigger the transition
                setTimeout(() => {
                  otherContent.style.height = '0';
                }, 10); // Slight delay to ensure the height change is registered
                otherPlusIcon.style.display = 'block';
                otherMinusIcon.style.display = 'none';
              }
            }
          });

          // Toggle the clicked item
          if (content.style.height === '0px' || content.style.height === '') {
            content.style.height = content.scrollHeight + 'px';
            content.addEventListener('transitionend', () => {
              if (content.style.height !== '0px') {
                content.style.height = 'auto';
              }
            }, { once: true });
            plusIcon.style.display = 'none';
            minusIcon.style.display = 'block';
          } else {
            content.style.height = content.scrollHeight + 'px'; // Set to scrollHeight to trigger the transition
            setTimeout(() => {
              content.style.height = '0';
            }, 10); // Slight delay to ensure the height change is registered
            plusIcon.style.display = 'block';
            minusIcon.style.display = 'none';
          }
        });
      });
    });
  };

  // Initialize accordions on DOMContentLoaded
  initializeAccordions();

  // Swup event listener to reinitialize accordions on page transition
  swup.hooks.on('content:replace', initializeAccordions);
});




//----CALENDAR INTEGRATION----
let calendars = []; // Array to store multiple calendar instances

function showCal() {
  console.log("showCal called");

  var calendarEls = document.querySelectorAll('.calendar'); // Use a class selector to get all calendar elements
  console.log("Found calendar elements: ", calendarEls.length);

  calendars.forEach(calendar => calendar.destroy()); // Destroy any existing calendars
  calendars = []; // Reset the calendar instances array

  const events = getEvents();
  console.log({ events });

  calendarEls.forEach(calendarEl => {
    let calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listPlugin',
      },
      events: events,
      eventClick: function (data) {
        alert(`User clicked the event ${data.event.title}`);
      }
    });

    calendar.render();
    calendars.push(calendar); // Store the calendar instance
    console.log("Calendar initialized and rendered");
  });
}

// Function to get events from the Webflow CMS
function getEvents() {
  const scripts = document.querySelectorAll('[data-element="event-data"]');
  const events = Array.prototype.slice.call(scripts).map(function (script) {
    const event = JSON.parse(script.textContent);
    event.start = new Date(event.start);
    event.end = new Date(event.end);

    return event;
  });

  return events;
}

// Initial call to render the calendars on first page load
document.addEventListener('DOMContentLoaded', function () {
  console.log("DOMContentLoaded event fired");
  showCal();
});

// Use Swup hooks to re-initialize the calendars after content is replaced
swup.hooks.on('content:replace', function () {
  console.log("Swup content replaced");
  showCal();
});

