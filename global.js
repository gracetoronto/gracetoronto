console.log("V1.439");

//----PAGE TRANSITION FUNCTIONALITY----

/// Initialize Swup
const swup = new Swup({
  animateHistoryBrowsing: true,
  plugins: [
    new SwupPreloadPlugin(),
    new SwupFragmentPlugin({
      rules: [
        {
          from: '/(.*)',
          to: '/leadership/(.*)',
          containers: ['#fragment-leadership'],
          scroll: false
        },
        {
          from: '/leadership/(.*)',
          to: '/about/leadership/',
          containers: ['#fragment-leadership'],
          scroll: false
        },
        {
          from: '/leadership/(.*)',
          to: '/(.*)',
          containers: ['#fragment-leadership'],
          scroll: false
        },
        {
          from: '/(.*)',
          to: '/bulletin/(.*)',
          containers: ['#fragment-bulletin'],
          scroll: false
        },
        {
          from: '/bulletin/(.*)',
          to: '/landing/',
          containers: ['#fragment-bulletin'],
          scroll: false
        },
        {
          from: '/bulletin/(.*)',
          to: '/(.*)',
          containers: ['#fragment-bulletin'],
          scroll: false
        },
        {
          from: '/ministries/(.*)',
          to: '/ministries/(.*)',
          containers: ['#fragment-ministries']
        },
        {
          from: ['/updates', '/updates/announcements', '/updates/news', '/updates/highlights'],
          to: ['/updates', '/updates/announcements', '/updates/news', '/updates/highlights'],
          containers: ['#fragment-updates']
        },
      ]
    }),
    new SwupScriptsPlugin ({
      head: true,
      body: false
    })
  ]
});




//UPDATE PROFILE CLOSE LINKS WITH PREVIOUS URL

// Variable to store the previous URL
let prevURL = '';

// Function to capture and store the previous URL
function updatePrevURL() {
  const currentURL = window.location.pathname;
  const leadershipRegex = /^\/leadership\/.*/;

  if (!leadershipRegex.test(currentURL)) {
    prevURL = currentURL;
    // console.log('Stored previous URL:', prevURL); // Debugging
  }
}

// Capture the URL on page load
document.addEventListener('DOMContentLoaded', () => {
  updatePrevURL();
});

// Capture the URL on Swup navigation
swup.hooks.before('content:replace', () => {
  updatePrevURL();
});

// Update .is--exit links after Swup has replaced content
swup.hooks.on('content:replace', () => {
  const currentURL = window.location.pathname;
  const leadershipRegex = /^\/leadership\/.*/;

  if (leadershipRegex.test(currentURL)) {
    const exitLinks = document.querySelectorAll('.is--exit');
    // console.log('Number of .is--exit links:', exitLinks.length); // Debugging

    exitLinks.forEach(link => {
      link.href = prevURL; // Update link href to the previously captured URL
      // console.log('Updated link href to:', link.href); // Debugging
    });
  }
});






//UPDATE BULLETIN CLOSE LINKS WITH PREVIOUS URL

// Variable to store the previous URL
let prevBulletinURL = '';

// Function to capture and store the previous URL
function updatePrevBulletinURL() {
  const currentURL = window.location.pathname;
  const leadershipRegex = /^\/bulletin\/.*/;

  if (!leadershipRegex.test(currentURL)) {
    prevBulletinURL = currentURL;
    // console.log('Stored previous URL:', prevURL); // Debugging
  }
}

// Capture the URL on page load
document.addEventListener('DOMContentLoaded', () => {
  updatePrevBulletinURL();
});

// Capture the URL on Swup navigation
swup.hooks.before('content:replace', () => {
  updatePrevBulletinURL();
});

// Update .is--exit links after Swup has replaced content
swup.hooks.on('content:replace', () => {
  const currentURL = window.location.pathname;
  const leadershipRegex = /^\/bulletin\/.*/;

  if (leadershipRegex.test(currentURL)) {
    const exitLinks = document.querySelectorAll('.is--exit');
    // console.log('Number of .is--exit links:', exitLinks.length); // Debugging

    exitLinks.forEach(link => {
      link.href = prevBulletinURL; // Update link href to the previously captured URL
      // console.log('Updated link href to:', link.href); // Debugging
    });
  }
});










//RESET AND PLAY HOMEPAGE VIDEO

function resetAndPlayHomeVideo() {
  // Check if the current URL is the homepage
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    const video = document.getElementById('home-bg');
    if (video) {
      // Reset and play the video
      video.currentTime = 0; // Reset video to start
      video.play(); // Play the video
    }
  }
}






// Listen for content replaced event
swup.hooks.on('content:replace', () => {
  // Get the current pathname of the URL
  const pathname = window.location.pathname;


  // Check if the pathname should have a transparent background
  if (isTransparentBg(pathname)) {
    // Run your function here
    navTransparent();
  } else {
    navWhite();
  }

  //All other functions that are supposed to run on page change
  document.body.classList.remove('scroll--disabled');
  showCal();
  initCarousel();
  initializeAccordions();
  initializeSliders();
  initializeShowFirstImage();
  hideMatchingEndDates();
  updateLinkedUpdate();
  updateNavButtons();
  startCountdown();
  initializeMinistryNavigation();
  ministryEventCountTag();
  initFilterOptions();
  initCheckboxBehavior();
  handleEventCardResize();
  initFilterAccordion();
  filterSelectionHover();
  checkAndModifyTimeSubtitles();
  announcementEventExpand();
  resetAndPlayHomeVideo();
  checkCurrentMinistriesLink();
  initMinistrySlideshowLoop();
  initHistoryVideoControl();
  loadYouTubeAPI();
  initSmoothScrollToCareAnchor();
  checkAndToggleLivePageClass();
});





//---UPDATE MINISTRY NAV ACTIVE STATE WITH FRAGMENT PLUGIN---

function updateNavButtons() {
  // Get the current URL path
  const currentPath = window.location.pathname;

  // Select all nav buttons
  const navButtons = document.querySelectorAll('.base__button.is--ministry');

  navButtons.forEach(button => {
    // Get the href attribute of the button
    const buttonPath = button.getAttribute('href');

    // Check if the button path matches the current path
    if (buttonPath === currentPath) {
      button.classList.add('is--active');
    } else {
      button.classList.remove('is--active');
    }
  });
}





// NAVIGATION LIVE BANNER FOR TESTING (SATURDAYS)

function toggleLiveBanner() {
  const banner = document.querySelector('.banner__container.is--live');
  if (!banner) return; // Exit if the banner is not found

  // Get the current time in Eastern Time (ET) using toLocaleString
  const now = new Date();
  
  // Convert to Eastern Time with DST consideration using toLocaleString
  const options = { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hour12: false }; 
  const estTimeString = now.toLocaleString('en-US', options);
  
  // Extract hours and minutes from the EST time string
  const [hours, minutes] = estTimeString.split(':').map(Number);
  const day = now.getDay(); // Get local day (0 = Sunday, 6 = Saturday)

  // For testing, check for Saturday (day 6)
  const isSunday = (day === 0); // Sunday is day 0 in JavaScript
  const isWithinTimeRange = (hours === 9 && minutes >= 5) || (hours === 10 && minutes <= 30); // Adjust the time range as needed for testing


  if (isSunday && isWithinTimeRange) {
    banner.style.display = 'flex'; // Show the banner
  } else {
    banner.style.display = 'none'; // Hide the banner
  }
}

// Run the function on page load
toggleLiveBanner();

// Optionally, check the time every minute to update the display state dynamically
setInterval(toggleLiveBanner, 60000);








//----NAVIGATION FUNCTIONALITY----

document.addEventListener('DOMContentLoaded', function () {
  updateNavAppearance(); // Initial load
});

// Adjusted to ensure DOM readiness after swup transition
swup.hooks.on('content:replace', function () {
  setTimeout(updateNavAppearance, 50); // Slight delay to ensure DOM readiness
});

function updateNavAppearance() {
  const pathname = window.location.pathname;
  if (isTransparentBg(pathname)) {
    navTransparent();
  } else {
    navWhite();
  }
}

function isTransparentBg(pathname) {
  // Example condition for transparent background
  return pathname === '/' || pathname === '/home';
}


let isTransitioning = false; // Flag to track if we're currently transitioning

// Function to apply the transparent navigation styles
function navTransparent() {
  // Select the elements
  const containerBlurs = document.querySelectorAll('.container__blur');
  const mainContainerBlurs = document.querySelectorAll('.container__blur.is--main');
  const buttons = document.querySelectorAll('.base__button.is--nav');
  const logoLarge = document.querySelectorAll('.logo.is--large');
  const logoWhite = document.querySelectorAll('.logo.is--white');
  const dropdownTexts = document.querySelectorAll('.button--text.is--dropdown');
  const bannerContainers = document.querySelectorAll('.banner__container.is--default');
  const bannerContents = document.querySelectorAll('.banner__content');
  const menuIcons = document.querySelectorAll('.menu__icon');

  const shouldBeTransparent = isTransparentBg(window.location.pathname);


  // Apply filter styles to invert colours
  if (containerBlurs) {
    containerBlurs.forEach((containerBlur) => {
      containerBlur.style.filter = 'invert(93%)';
    });
  }

  // Check if the current page should have a transparent navigation
  if (shouldBeTransparent) {
    mainContainerBlurs.forEach(containerBlur => {
      containerBlur.style.opacity = '0';
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


// Debounce function to limit the rate at which a function can fire
function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}





// Function to change nav back to default white
function navWhite() {
  // Select the elements
  const containerBlurs = document.querySelectorAll('.container__blur');
  const mainContainerBlurs = document.querySelectorAll('.container__blur.is--main');
  const buttons = document.querySelectorAll('.base__button.is--nav');
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
window.addEventListener('scroll', debounce(function () {
  if (window.scrollY > 200) {
    navShrink();
  } else {
    navExpand();
    updateNavAppearance();
  }
}, 25));


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

const initializeAccordions = () => {
  const accordions = document.querySelectorAll('.base__accordion');

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




//----CALENDAR INTEGRATION----

function showCal() {
  let calendars = []; // Array to store multiple calendar instances

  var calendarEls = document.querySelectorAll('.calendar'); // Use a class selector to get all calendar elements

  const events = getEvents();

  calendarEls.forEach(calendarEl => {
    let calendarInst = new FullCalendar.Calendar(calendarEl, {
      initialView: 'listThreeMonth', // Set the custom 3-month list view as the default
      headerToolbar: {
        left: 'title', // List and Calendar buttons are left aligned
        center: '', // Title is centered
        right: 'prev,next today' // Navigation buttons are right aligned
      },
      views: {
        listThreeMonth: {
          type: 'list',
          duration: { months: 2 }, // Set the duration to 2 months
          buttonText: 'List View',
          titleFormat: { // Customize the title format to use abbreviated month names
            year: 'numeric',
            month: 'short'
          }
        },
        dayGridMonth: {
          buttonText: 'Calendar'
        }
      },
      height: 'auto', // Adjust the calendar height based on the content
      events: events,
      eventTimeFormat: { // Specify time format for events
        hour: 'numeric', // Use 'numeric' to avoid leading zeros
        minute: '2-digit',
        meridiem: 'short' // Use 12-hour format with AM/PM
      },
      eventClick: function (data) {
        // alert(`User clicked the event ${data.event.title}`);
      },
      eventContent: function (info) {
        let { event } = info;

        // Create a container for the event content
        let container = document.createElement('div');
        container.innerHTML = `
          <div>${event.title}</div>
          ${event.extendedProps.updateLink ? `<a href="${event.extendedProps.updateLink}" class="btn-view-details">Read Announcement</a>` : ''}
        `;

        return { domNodes: [container] };
      }
    });

    calendarInst.render();
    calendars.push(calendarInst); // Store the calendar instance
  });
}


// Function to get events from the Webflow CMS
function getEvents() {
  const baseURL = window.location.origin; // Get the base URL dynamically
  const scripts = document.querySelectorAll('[data-element="event-data"]');
  const events = Array.prototype.slice.call(scripts).map(function (script) {
    try {
      const event = JSON.parse(script.textContent.trim());

      // Add default time if missing
      if (!event.start.includes('T')) {
        event.start += 'T00:00:00';
      }
      if (!event.end.includes('T')) {
        event.end += 'T23:59:59';
      }

      // Manually parse the date strings if they are not in ISO 8601 format
      event.start = new Date(event.start.replace(' ', 'T'));
      event.end = new Date(event.end.replace(' ', 'T'));

      // Format the time without leading zeros
      const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      };

      event.formattedStartTime = formatTime(event.start);
      event.formattedEndTime = formatTime(event.end);

      // Set event color based on the type
      switch (event.type) {
        case 'Regular or recurring':
          event.color = '#F4C449';
          break;
        case 'Special on-site':
          event.color = '#24C150';
          break;
        case 'Special off-site':
          event.color = '#9974C9';
          break;
        default:
          event.color = '#3788d8'; // Default color if type is not recognized
      }

      // Construct the update link dynamically
      if (event.update) {
        event.updateLink = `${baseURL}/updates/post/${event.update.trim()}`;
        event.updateButtonHTML = `
          <a href="${event.updateLink}" class="view-more-details">
            View more details <img src="https://uploads-ssl.webflow.com/661d375bfd27162a5e3d0193/661d6772b634bb7b8d55df31_chevron_right.svg" class="icon">→</span>
          </a>`;
      } else {
        event.updateButtonHTML = ''; // No button if no update link
      }

      return event;
    } catch (error) {
      console.error('Error parsing event data:', script.textContent, error);
      return null; // or handle error appropriately
    }
  }).filter(event => event !== null); // Filter out null values resulting from parse errors

  return events;
}

// Initial call to render the calendars on first page load
document.addEventListener('DOMContentLoaded', function () {
  showCal();
});







//---ANNOUNCEMENT IMAGE SLIDER---

if (typeof initSlider === 'undefined') {
  var initSlider = function (sliderContainer) {
    let currentIndex = 0;
    const items = sliderContainer.querySelectorAll('.anc__item');
    const totalItems = items.length;
    const dotsContainer = sliderContainer.querySelector('.anc__dots');
    const nextArrow = sliderContainer.querySelector('.arrow.is--next');
    const prevArrow = sliderContainer.querySelector('.arrow.is--prev');

    function showItem(index) {
      items.forEach((item, i) => {
        item.style.opacity = i === index ? '1' : '0';
        item.style.transition = 'opacity 0.5s ease-in-out';
      });

      // Update dots
      dots.forEach((dot, i) => {
        if (totalItems > 1) {
          if (i === index) {
            dot.classList.add('is--current');
          } else {
            dot.classList.remove('is--current');
          }
        } else {
          dot.classList.remove('is--current');
        }
      });
    }

    function nextItem() {
      currentIndex = (currentIndex + 1) % totalItems;
      showItem(currentIndex);
    }

    function prevItem() {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      showItem(currentIndex);
    }

    // Generate dots based on the number of items
    if (totalItems > 1) {
      for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('is--current'); // Make the first dot active
        dotsContainer.appendChild(dot);
      }
    } else {
      dotsContainer.style.display = 'none'; // Hide dots if there's only one item
    }

    const dots = dotsContainer.querySelectorAll('.dot');

    // Add event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        showItem(currentIndex);
      });
    });

    if (nextArrow) nextArrow.addEventListener('click', nextItem);
    if (prevArrow) prevArrow.addEventListener('click', prevItem);

    // Initially show the first item
    showItem(currentIndex);

    // Only show dots and arrows if there is more than one image
    if (totalItems <= 1) {
      dotsContainer.style.display = 'none';
      if (nextArrow) nextArrow.style.display = 'none';
      if (prevArrow) prevArrow.style.display = 'none';
    }
  };
}

const initializeSliders = () => {
  const sliderContainers = document.querySelectorAll('.anc__slider');
  sliderContainers.forEach((sliderContainer) => {
    initSlider(sliderContainer);
  });
};

// Initialize sliders on initial load
initializeSliders();









//---SHOW IMAGE ONLY ON FIRST INSTANCE OF ANNOUNCEMENT SLIDER---

// Function to process each collection list individually
function processCollectionList(collectionListWrapper) {
  // Select all collection items within this specific collection list
  var collectionItems = collectionListWrapper.querySelectorAll('.w-dyn-item');

  // Check if there are any collection items
  if (collectionItems.length > 0) {
    // Iterate over all collection items
    collectionItems.forEach(function (item, index) {
      // Find the special element within each collection item
      var specialElement = item.querySelector('.anc__first');

      // Hide the special element if it's not the first item
      if (specialElement) {
        if (index !== 0) {
          specialElement.style.display = 'none';
        }
      }
    });
  }
}

// Function to initialize the script
function initializeShowFirstImage() {
  // Select all collection list wrappers on the page
  var collectionListWrappers = document.querySelectorAll('.w-dyn-list');

  // Process each collection list wrapper
  collectionListWrappers.forEach(function (wrapper) {
    processCollectionList(wrapper);
  });
}

// Initialize when the page is fully loaded
document.addEventListener('DOMContentLoaded', initializeShowFirstImage);





//--- EVENT CARD HIDE END DATE IF IT MATCHES START DATE---

function hideMatchingEndDates() {
  // Select all collection list items with the class 'eventcard__list'
  const collectionListItems = document.querySelectorAll('.eventcard__list .eventcard__item');

  // Iterate over each collection list item
  collectionListItems.forEach(function (item) {
    // Get the start and end date elements within this item
    const startDateElement = item.querySelector('.date--start');
    const endDateElement = item.querySelector('.date--end');
    const dateDash = item.querySelector('.date--dash');
    const dateDayElement = item.querySelector('.date--day');
    const dateCommaElement = item.querySelector('.date--comma');
    

    // Check if both start and end date elements exist to avoid errors
    if (startDateElement && endDateElement) {
      // Get the text content of the elements
      const startDateText = startDateElement.textContent.trim();
      const endDateText = endDateElement.textContent.trim();

      // Check if the start date is the same as the end date
      if (startDateText === endDateText) {
        // Hide the end date element and date dash if they are the same
        endDateElement.style.display = 'none';
        if (dateDash) {
          dateDash.style.display = 'none';
        }
      } else {
        // Hide the date day element if the start date is different from the end date
        if (dateDayElement) {
          dateDayElement.style.display = 'none';
          dateCommaElement.style.display = 'none';
        }
      }
    }
  });
}

// Run the function after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', hideMatchingEndDates);





//---UPDATE EVENT COUNT ON ANNOUNCEMENT PAGES---

function updateLinkedUpdate() {
  // Check if the current page has a div with class '.eventcard__header'
  if (!document.querySelector('.eventcard__header')) {
    return;
  }

  // Get the number of elements with class "calendar__item"
  var numberOfEvents = document.getElementsByClassName('eventcard__item').length;

  // Create a new div element for displaying the count
  var countElement = document.createElement('div');
  countElement.classList.add('subtitle', 'is--2');
  countElement.textContent = numberOfEvents;

  // Select the .ministry__events container
  var eventCardHeader = document.querySelector('.eventcard__header');
  var eventCardButton = document.querySelector('.eventcard__num');

  // Append the count element to the ministryEventsContainer
  eventCardHeader.appendChild(countElement);
  if (eventCardButton) {
    eventCardButton.appendChild(countElement);
  }
}

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initial update on page load
  updateLinkedUpdate();
});







//---EVENT CARD EXPANDING AND COLLAPSING ON ANNOUNCEMENT PAGES---


function announcementEventExpand() {
  setTimeout(() => {
    const button = document.querySelector('.eventcard__button');
    const list = document.querySelector('.eventcard__list');
    const openClass = document.querySelector('.eventcard__open');
    const closeClass = document.querySelector('.eventcard__close');
    const items = list ? list.querySelectorAll('.eventcard__item') : [];

    if (!button || !list || !openClass || !closeClass) return;

    let initialHeight;

    function calculateInitialHeight() {
      let height = 0;
      for (let i = 0; i < Math.min(2, items.length); i++) {
        height += items[i].getBoundingClientRect().height;
      }
      return height;
    }

    function updateMaxHeight() {
      if (list.classList.contains('expanded')) {
        list.style.maxHeight = `${list.scrollHeight}px`;
      } else {
        initialHeight = calculateInitialHeight();
        list.style.maxHeight = `${initialHeight}px`;
      }
    }

    function handleResize() {
      if (!list.classList.contains('expanded')) {
        initialHeight = calculateInitialHeight();
        list.style.maxHeight = `${initialHeight}px`;
      }
    }

    // Debounce function to delay execution
    function debounce(func, wait) {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    }

    // Initial height calculation
    initialHeight = calculateInitialHeight();
    list.style.maxHeight = `${initialHeight}px`;
    list.style.overflow = 'hidden';
    list.style.transition = 'max-height 0.5s ease';

    if (items.length <= 2) {
      button.style.display = 'none';
      closeClass.style.display = 'none';
    } else {
      button.style.display = 'flex';
      closeClass.style.display = 'none';
    }

    button.addEventListener('click', function () {
      list.classList.toggle('expanded');

      if (list.classList.contains('expanded')) {
        list.style.maxHeight = `${list.scrollHeight}px`;
        openClass.style.display = 'none';
        closeClass.style.display = 'flex';
      } else {
        list.style.maxHeight = `${initialHeight}px`;
        openClass.style.display = 'flex';
        closeClass.style.display = 'none';
      }
    });

    // Use debounce for the resize event
    window.addEventListener('resize', debounce(handleResize, 300));

    // Force reflow and recalculate height after a short delay
    setTimeout(() => {
      initialHeight = calculateInitialHeight();
      list.style.maxHeight = `${initialHeight}px`;
    }, 500);

    updateMaxHeight();
  }, 0);
}

// Call the function with a 100ms delay to initialize the event card behavior
announcementEventExpand();




//---HISTORY TIMELINE FUNCTIONALITY---

document.addEventListener("DOMContentLoaded", function () {
  // Array of dates
  const dates = [1992, 2005, 2006, 2009, 2017, 1878, 2012, 20172];

  // Function to handle scroll events
  const handleScroll = () => {
    let maxVisibleArea = 0;
    let currentDate = null;

    dates.forEach(date => {
      // Get the content block and timeline card elements
      const contentBlock = document.getElementById(`content-${date}`);
      const timelineCard = document.getElementById(`card-${date}`);

      if (contentBlock && timelineCard) {
        // Get the bounding rectangle of the content block
        const rect = contentBlock.getBoundingClientRect();

        // Calculate the visible area of the content block
        const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
        const visibleArea = visibleHeight * contentBlock.offsetWidth;

        if (visibleArea > maxVisibleArea) {
          maxVisibleArea = visibleArea;
          currentDate = date;
        }
      }
    });

    // Update the timeline cards to reflect the most visible content block
    dates.forEach(date => {
      const timelineCard = document.getElementById(`card-${date}`);
      if (timelineCard) {
        if (date === currentDate) {
          timelineCard.querySelector('.timeline__date').classList.add('is--current');
          timelineCard.querySelector('.timeline__number').classList.add('is--current');
          timelineCard.querySelector('.timeline__dot').classList.add('is--current');
        } else {
          timelineCard.querySelector('.timeline__date').classList.remove('is--current');
          timelineCard.querySelector('.timeline__number').classList.remove('is--current');
          timelineCard.querySelector('.timeline__dot').classList.remove('is--current');
        }
      }
    });
  };

  // Initial check to apply the class when the page is loaded
  handleScroll();

  // Ensure the 1992 timeline card is current by default
  const defaultCard = document.getElementById('card-1992');
  if (defaultCard) {
    defaultCard.querySelector('.timeline__date').classList.add('is--current');
    defaultCard.querySelector('.timeline__number').classList.add('is--current');
    defaultCard.querySelector('.timeline__dot').classList.add('is--current');
  }

  // Attach the scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Swup event listener
  swup.hooks.on('content:replace', () => {
    handleScroll();
    const defaultCard = document.getElementById('card-1992');
    if (defaultCard) {
      defaultCard.querySelector('.timeline__date').classList.add('is--current');
      defaultCard.querySelector('.timeline__number').classList.add('is--current');
      defaultCard.querySelector('.timeline__dot').classList.add('is--current');
    }
  });
});








//---CAROUSEL FUNCTIONALITY---

function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const container = document.querySelector('.carousel-container');
  const leftButton = document.getElementById('carousel-left');
  const rightButton = document.getElementById('carousel-right');

  if (!carousel || !container || !leftButton || !rightButton) {
    return; // Exit if any of the elements are not found
  }

  const cardWidth = document.querySelector('.carousel-card').offsetWidth;
  const gap = parseInt(window.getComputedStyle(carousel).gap);
  const cardFullWidth = cardWidth + gap;
  const vw5 = window.innerWidth * 0.05;
  const maxScrollPosition = carousel.scrollWidth - container.offsetWidth;

  leftButton.addEventListener('click', () => {
    let currentScrollPosition = container.scrollLeft;
    const nearestCardPosition = Math.round(currentScrollPosition / cardFullWidth) * cardFullWidth;
    currentScrollPosition = nearestCardPosition - cardFullWidth;
    if (currentScrollPosition < 0) {
      currentScrollPosition = 0;
    }
    container.scrollTo({ left: currentScrollPosition, behavior: 'smooth' });
  });

  rightButton.addEventListener('click', () => {
    let currentScrollPosition = container.scrollLeft;
    const remainingScroll = maxScrollPosition - currentScrollPosition;
    if (remainingScroll <= cardFullWidth) {
      currentScrollPosition = maxScrollPosition + vw5;
    } else {
      const nearestCardPosition = Math.round(currentScrollPosition / cardFullWidth) * cardFullWidth;
      currentScrollPosition = nearestCardPosition + cardFullWidth;
    }
    container.scrollTo({ left: currentScrollPosition, behavior: 'smooth' });
  });

  function adjustScrollToNearestCard() {
    const currentScrollPosition = container.scrollLeft;
    const nearestCardPosition = Math.round(currentScrollPosition / cardFullWidth) * cardFullWidth;
    const adjustedPosition = Math.min(nearestCardPosition, maxScrollPosition + vw5);
    container.scrollTo({ left: adjustedPosition, behavior: 'smooth' });
  }

  // Ensure the initial state respects the max width and margin
  const containerWidth = container.offsetWidth;
  const totalCarouselWidth = carousel.scrollWidth;

  if (totalCarouselWidth < containerWidth) {
    carousel.style.justifyContent = 'flex-start';
  }
}

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initial update on page load
  initCarousel();
});



//---LIVESTREAM COUNTDOWN TIMER FUNCTIONALITY---

function startCountdown() {
  const dayBox = document.getElementById('day');
  const hourBox = document.getElementById('hour');
  const minuteBox = document.getElementById('minute');
  const secondBox = document.getElementById('second');

  // Check if countdown elements exist
  if (!dayBox || !hourBox || !minuteBox || !secondBox) {
    return; // Exit the function if any element is missing
  }

  function getESTDate(date) {
    const options = { timeZone: 'America/New_York', hour12: false };
    const formatter = new Intl.DateTimeFormat([], options);
    const parts = formatter.formatToParts(date);
    const estDate = new Date(date);

    parts.forEach(({ type, value }) => {
      if (type === 'year') estDate.setFullYear(value);
      if (type === 'month') estDate.setMonth(value - 1);
      if (type === 'day') estDate.setDate(value);
      if (type === 'hour') estDate.setHours(value);
      if (type === 'minute') estDate.setMinutes(value);
      if (type === 'second') estDate.setSeconds(value);
    });

    return estDate;
  }

  function updateCountdown() {
    const now = new Date();
    const nowEST = getESTDate(now);

    const nextSunday = new Date(nowEST);
    nextSunday.setDate(nowEST.getDate() + (7 - nowEST.getDay()) % 7);
    nextSunday.setHours(9, 15, 0, 0);

    if (nowEST.getDay() === 0 && nowEST.getHours() >= 9 && nowEST.getMinutes() >= 15) {
      nextSunday.setDate(nextSunday.getDate() + 7);
    }

    const timeDifference = nextSunday - nowEST;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000).toString().padStart(2, '0');

    dayBox.textContent = days;
    hourBox.textContent = hours;
    minuteBox.textContent = minutes;
    secondBox.textContent = seconds;

    if (nowEST.getDay() === 0 && nowEST.getHours() >= 9 && nowEST.getHours() < 13 && (nowEST.getHours() !== 10 || nowEST.getMinutes() < 30)) {
      dayBox.textContent = '00';
      hourBox.textContent = '00';
      minuteBox.textContent = '00';
      secondBox.textContent = '00';
    }

    if (nowEST.getDay() === 0 && nowEST.getHours() === 13 && nowEST.getMinutes() >= 30) {
      nextSunday.setDate(nextSunday.getDate() + 7);
    }
  }

  setInterval(updateCountdown, 1000);
}

// Start the countdown when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  startCountdown();
});





//---MINISTRY NAVIGATION FUNCTIONALITY---

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector('.ministry__arrow')) {
    initializeMinistryNavigation();
  }
});

function initializeMinistryNavigation() {
  if (!document.querySelector('.ministry__arrow')) {
    return;
  }

  const container = document.querySelector('.ministry__container');
  const buttons = container.querySelectorAll('.base__button');
  const arrowLeft = document.getElementById('arrow-left');
  const arrowRight = document.getElementById('arrow-right');
  const arrowLeftContainer = document.querySelector('.ministry__arrow.is--left');
  const arrowRightContainer = document.querySelector('.ministry__arrow.is--right');

  function updateArrows() {
    const containerWidth = container.offsetWidth;
    const contentWidth = container.scrollWidth;
    const scrollLeft = container.scrollLeft;

    if (scrollLeft + containerWidth >= contentWidth) {
      arrowRightContainer.classList.add('hidden');
    } else {
      arrowRightContainer.classList.remove('hidden');
    }

    if (scrollLeft <= 0) {
      arrowLeftContainer.classList.add('hidden');
    } else {
      arrowLeftContainer.classList.remove('hidden');
    }
  }

  function scrollRight() {
    const containerWidth = container.offsetWidth;
    const nextButton = Array.from(buttons).find(button => button.offsetLeft + button.offsetWidth > container.scrollLeft + containerWidth);
    if (nextButton) {
      if (nextButton === buttons[buttons.length - 1]) {
        container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: nextButton.offsetWidth, behavior: 'smooth' });
      }
    } else {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    }
    setTimeout(updateArrows, 500); // Ensure arrows are updated after scroll
  }

  function scrollLeft() {
    const prevButton = Array.from(buttons).reverse().find(button => button.offsetLeft < container.scrollLeft);
    if (prevButton) {
      if (prevButton === buttons[0]) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -prevButton.offsetWidth, behavior: 'smooth' });
      }
    } else {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    }
    setTimeout(updateArrows, 500); // Ensure arrows are updated after scroll
  }

  function scrollToCurrentPageButton() {
    const currentPageButton = Array.from(buttons).find(button => button.classList.contains('current-page'));
    if (currentPageButton) {
      const buttonLeft = currentPageButton.offsetLeft;
      const buttonRight = buttonLeft + currentPageButton.offsetWidth;
      const containerLeft = container.scrollLeft;
      const containerRight = containerLeft + container.offsetWidth;

      if (buttonLeft < containerLeft) {
        container.scrollTo({ left: buttonLeft, behavior: 'smooth' });
      } else if (buttonRight > containerRight) {
        container.scrollTo({ left: buttonRight - container.offsetWidth, behavior: 'smooth' });
      }
    }
    setTimeout(updateArrows, 500); // Ensure arrows are updated after scroll
  }

  arrowRight.addEventListener('click', scrollRight);
  arrowLeft.addEventListener('click', scrollLeft);
  container.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);

  updateArrows();
  scrollToCurrentPageButton();
}




//MINISTRY PAGE NAV CURRENT LINK SELECTION

function checkCurrentMinistriesLink() {
  // Check if the current URL matches the pattern /ministries/(*)
  const urlPattern = /^\/ministries\/.+/;
  const currentURL = window.location.pathname;

  if (urlPattern.test(currentURL)) {
    const ministriesList = document.querySelector('.ministry__list');

    // Ensure the '.ministries__list' collection list is present on the page
    if (ministriesList) {
      // Select all links with the class '.base__button.is--ministry' within '.ministries__list'
      const ministryButtons = ministriesList.querySelectorAll('.base__button.is--ministry');

      ministryButtons.forEach(button => {
        // Remove the 'current' styling from all buttons
        button.classList.remove('current');

        // Check if the link URL matches the current URL
        const linkURL = new URL(button.href).pathname;
        if (linkURL === currentURL) {
          // Add the 'current' styling to the matched button
          button.classList.add('current');
        }
      });
    }
  }
}

// Run the function on initial page load
checkCurrentMinistriesLink();

// Run the function again after Swup navigation
swup.hooks.on('content:replace', () => {
  checkCurrentMinistriesLink();
});







//--MINISTRY EVENT COUNT TAG FUNCTIONALITY---

function ministryEventCountTag() {
  // Only execute if the URL contains /ministries/
  if (window.location.pathname.includes('/ministries/')) {
    // Get all elements with class "calendar__item"
    var calendarItems = document.getElementsByClassName('calendar__item');
    var today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight


    var upcomingEventsCount = 0;

    // Loop through each calendar item to check the end date
    for (var i = 0; i < calendarItems.length; i++) {
      // Find the script element containing the JSON data within the calendar item
      var scriptElement = calendarItems[i].querySelector('script[data-element="event-data"]');

      if (!scriptElement) {
        console.error("Script element with event-data not found in calendar item:", calendarItems[i]);
        continue;
      }

      // Parse the JSON data from the script element
      var eventData = JSON.parse(scriptElement.textContent);


      // Create a Date object from the ISO 8601 end date string
      var endDate = new Date(eventData.end);
      endDate.setHours(0, 0, 0, 0); // Set time to midnight


      // Check if the end date is today or in the future
      if (isNaN(endDate.getTime())) {
        console.error("Invalid date parsed for event:", eventData.title, "Raw end date:", eventData.end);
      } else if (endDate >= today) {
        upcomingEventsCount++;
      } else {
      }
    }

    // Select the .events__amount container
    var eventsAmountContainer = document.querySelector('.events__amount');
    if (eventsAmountContainer) {
      // Clear the existing content
      eventsAmountContainer.innerHTML = '';

      // Determine the correct text for the count
      var eventText = upcomingEventsCount === 1 ? "1 Upcoming event." : upcomingEventsCount + " Upcoming events.";
      // Update the content of .events__amount
      eventsAmountContainer.textContent = eventText;
    }

    // Select the .ministry__events container
    var ministryEventsContainer = document.querySelector('.ministry__events');

    // Check if there are no upcoming events and hide the container if true
    if (upcomingEventsCount === 0 && ministryEventsContainer) {
      ministryEventsContainer.style.display = 'none';
    }

    // Function to smoothly scroll to an element with offset
    function scrollToElementWithOffset(elementId, offset) {
      var element = document.getElementById(elementId);
      if (element) {
        var elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        var offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }

    // Add click event listener to .ministry__events
    if (ministryEventsContainer) {
      ministryEventsContainer.addEventListener('click', function () {
        scrollToElementWithOffset('content', 40);
      });
    }
  }
}

// Run the function after the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  ministryEventCountTag();
});





//---MINISTRY SLIDESHOW FUNCTIONALITY---

function initMinistrySlideshowLoop() {
  console.log('initMinistrySlideshowLoop called');
  // Check if the URL matches the pattern /ministries/(*) and if the .slideshow element is present
  if (window.location.pathname.startsWith('/ministries/')) {
    console.log('URL matches /ministries/');
    // Add a 2-second delay before starting the animation
    setTimeout(() => {
      const slideshow = document.querySelector('.slideshow');
      if (slideshow) {
        console.log('.slideshow element found');
        // Remove any previous animation classes
        slideshow.classList.remove('slideshow-animation');

        // Force a reflow to ensure the removal of old styles
        void slideshow.offsetWidth;

        // Add the animation class to start the animation
        slideshow.classList.add('slideshow-animation');
      } else {
        console.log('.slideshow element not found');
      }
    }, 2000);
  } else {
    console.log('URL does not match /ministries/');
  }
}

// Ensure the function runs on page load and Swup content replacement
document.addEventListener('DOMContentLoaded', () => {
  initMinistrySlideshowLoop();
});

// Listen for Swup content replacement event
document.addEventListener('swup:contentReplaced', () => {
  initMinistrySlideshowLoop();
});








//---CALENDAR FILTER OPTION CHECKBOX STYLING---

function initFilterOptions() {
  document.querySelectorAll('.filter__option').forEach(function(option) {
    const checkbox = option.querySelector('input[type="checkbox"]');
    
    if (checkbox) { // Check if the checkbox element exists
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          option.classList.add('is--selected'); // Adds class to the label
        } else {
          option.classList.remove('is--selected'); // Removes class from the label
        }
      });
    } else {
      console.warn('No checkbox found within:', option);
    }
  });
}

// Call the function on initial page load
initFilterOptions();




//---CALENDAR FILTER CHECKBOX FUNCTIONALITY---

function initCheckboxBehavior() {

  // Check if there is an element with class '.eventcard' on the page
  if (!document.querySelector('.eventcard')) {
    return; // Exit the function if no such element exists
  }
  
  // Select the church-wide checkbox using custom attribute
  const churchWideCheckbox = document.querySelector('[fs-cmsfilter-field="church-wide"]');
  
  // Select ministry checkbox labels with the class '.filter__option' and attribute 'fs-cmsfilter-field="ministry"'
  const ministryCheckboxLabels = document.querySelectorAll('.filter__option[fs-cmsfilter-field="ministry"]');

  // Select the divs for showing/hiding based on church-wide checkbox state
  const filtersDiv = document.querySelector('.eventcard__filters');
  const churchwideDiv = document.querySelector('.eventcard__churchwide');

  // Check if elements are found
  if (!churchWideCheckbox) {
    return;
  }
  if (ministryCheckboxLabels.length === 0) {
    return;
  }
  if (!filtersDiv || !churchwideDiv) {
    return;
  }


  // Force checkbox state
  function forceCheckboxState(checkbox, state) {
    if (checkbox.checked !== state) {
      checkbox.checked = state;
      checkbox.setAttribute('checked', state); // Update the attribute
      checkbox.dispatchEvent(new Event('change', { bubbles: true })); // Trigger change event
      checkbox.dispatchEvent(new Event('input', { bubbles: true })); // Trigger input event
    }
  }

  // Update visibility of divs based on church-wide checkbox state
  function updateVisibility() {
    setTimeout(() => {
      if (churchWideCheckbox.checked) {
        filtersDiv.style.display = 'none';
        churchwideDiv.style.display = 'flex';
      } else {
        filtersDiv.style.display = 'flex';
        churchwideDiv.style.display = 'none';
      }
    }, 350); // Delay for 250ms
  }

  // Check if any ministry checkboxes are selected
  function anyMinistryCheckboxSelected() {
    return Array.from(ministryCheckboxLabels).some(label => label.querySelector('input[type="checkbox"]').checked);
  }

  // Handle change on the church-wide checkbox
  churchWideCheckbox.addEventListener('change', function() {
    updateVisibility();
    if (this.checked) {
      // Uncheck all ministry checkboxes
      ministryCheckboxLabels.forEach(label => {
        const checkbox = label.querySelector('input[type="checkbox"]');
        if (checkbox) {
          forceCheckboxState(checkbox, false);
        }
      });
    } else if (!anyMinistryCheckboxSelected()) {
      // If the church-wide checkbox is deselected and no ministry checkboxes are selected, select the first ministry checkbox
      const firstCheckbox = ministryCheckboxLabels[0].querySelector('input[type="checkbox"]');
      if (firstCheckbox) {
        forceCheckboxState(firstCheckbox, true);
      }
    }
  });

  // Handle change on the ministry checkboxes
  ministryCheckboxLabels.forEach(function(label) {
    const checkbox = label.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          // Deselect the church-wide checkbox
          forceCheckboxState(churchWideCheckbox, false);
        } else if (!anyMinistryCheckboxSelected()) {
          // If no ministry checkboxes are selected, select the church-wide checkbox
          forceCheckboxState(churchWideCheckbox, true);
        }
      });
    }
  });

  // Ensure the correct initial state
  if (!anyMinistryCheckboxSelected() && !churchWideCheckbox.checked) {
    // Select the first ministry checkbox if the church-wide checkbox is not checked and no ministry checkboxes are selected
    const firstCheckbox = ministryCheckboxLabels[0].querySelector('input[type="checkbox"]');
    if (firstCheckbox) {
      forceCheckboxState(firstCheckbox, true);
    } else {
      // If no ministry checkbox found, select the church-wide checkbox
      forceCheckboxState(churchWideCheckbox, true);
    }
  }

  // Initialize visibility on page load
  updateVisibility();
}

// Ensure the function runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initCheckboxBehavior);





//---HANDLE EVENT CARD COMPONENT RESPONSIVENESS---

function handleEventCardResize() {
  const eventCards = document.querySelectorAll('.eventcard');

  if (eventCards.length > 0) {
      const elementsToUpdate = [
          '.eventcard',
          '.eventcard__item',
          '.event__img',
          '.card__img',
          '.event',
          '.event__top',
          '.event__type',
          '.event__bottom',
          '.event__datetime',
          '.event__date',
          '.event__time',
          '.event__actions',
          '.heading.is--3.date--day',
          '.heading.is--3.date--comma',
          '.heading.is--3.date--start',
          '.heading.is--3.date--dash',
          '.heading.is--3.date--end'
      ];

      let resizeTimeout;

      const applyStylesBasedOnWidth = (eventCard, width) => {
          elementsToUpdate.forEach(selector => {
              const elements = eventCard.querySelectorAll(selector);
              elements.forEach(element => {
                  if (width < 750) {
                      element.classList.add('br--small');
                  } else {
                      element.classList.remove('br--small');
                  }
              });
          });
      };

      const onResize = (entries) => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
              for (let entry of entries) {
                  applyStylesBasedOnWidth(entry.target, entry.contentRect.width);
              }
          }, 100); // Adjust the debounce time as needed
      };

      const resizeObserver = new ResizeObserver(onResize);

      // Observe each event card individually
      eventCards.forEach(eventCard => {
          resizeObserver.observe(eventCard);
      });
  }
}

// Call the function to initialize the observer
handleEventCardResize();






//---FILTER ACCORDION FOR MOBILE---

function initFilterAccordion() {
  // Select elements
  const accordion = document.querySelector('.filter__accordion');
  
  // Check if the accordion element exists
  if (!accordion) {
    return;
  }

  const content = document.querySelector('.filter__content');
  const plusIcon = document.querySelector('.filter__plus');
  const minusIcon = document.querySelector('.filter__minus');
  const showFilter = document.getElementById('filter__show');
  const hideFilter = document.getElementById('filter__hide');

  // Set initial state
  content.style.height = '0';
  content.style.overflow = 'hidden';
  content.style.transition = 'height 0.3s ease-in-out';

  // Add click event listener to the accordion
  accordion.addEventListener('click', function () {
    if (content.style.height === '0px' || content.style.height === '') {
      // Expand content
      content.style.height = content.scrollHeight + 'px';
      
      // Show/hide relevant elements
      plusIcon.style.display = 'none';
      minusIcon.style.display = 'block';
      showFilter.style.display = 'none';
      hideFilter.style.display = 'block';
    } else {
      // Collapse content
      content.style.height = '0';
      
      // Show/hide relevant elements
      plusIcon.style.display = 'block';
      minusIcon.style.display = 'none';
      showFilter.style.display = 'block';
      hideFilter.style.display = 'none';
    }
  });

  // Ensure height is auto if the screen is wider than 991px
  function checkWidth() {
    if (window.innerWidth > 991) {
      content.style.height = 'auto';
      content.style.overflow = 'visible';  // Reset overflow
    }
  }

  // Initial check
  checkWidth();

  // Add resize event listener to adjust when screen width changes
  window.addEventListener('resize', checkWidth);
}

// Initialize the accordion
initFilterAccordion();






//---FILTER BUTTON HOVER ON DESKTOP---

function filterSelectionHover() {
  const filterOptions = document.querySelectorAll('.filter__option');

  filterOptions.forEach(option => {
    option.addEventListener('mouseenter', function () {
      if (window.innerWidth > 991) {
        const hoverElement = this.querySelector('.filter__hover');
        if (hoverElement) hoverElement.style.display = 'block';
      }
    });

    option.addEventListener('mouseleave', function () {
      if (window.innerWidth > 991) {
        const hoverElement = this.querySelector('.filter__hover');
        if (hoverElement) hoverElement.style.display = 'none';
      }
    });
  });
}

// Execute the function when the page is loaded or use with swup.js
document.addEventListener('DOMContentLoaded', filterSelectionHover);






//---CHECK AND MODIFY EVENT TIMES TO NOT SHOW PM OR AM TWICE---

function checkAndModifyTimeSubtitles() {
  // Check if any '.event__time' elements are present on the page
  const eventTimes = document.querySelectorAll('.event__time');

  if (eventTimes.length > 0) {
    eventTimes.forEach((eventTime) => {
      const startTimeElement = eventTime.querySelector('.subtitle.is--starttime');
      const endTimeElement = eventTime.querySelector('.subtitle.is--endtime');

      if (startTimeElement && endTimeElement) {
        const startTimeText = startTimeElement.textContent;
        const endTimeText = endTimeElement.textContent;

        const startContainsPM = startTimeText.includes(' pm');
        const startContainsAM = startTimeText.includes(' am');
        const endContainsPM = endTimeText.includes(' pm');
        const endContainsAM = endTimeText.includes(' am');

        // If both are 'pm' or both are 'am', remove it from startTimeElement
        if ((startContainsPM && endContainsPM) || (startContainsAM && endContainsAM)) {
          startTimeElement.textContent = startTimeText.replace(' pm', '').replace(' am', '');
        }
      }
    });
  }
}

// Execute the function when the page is loaded or use with swup.js
document.addEventListener('DOMContentLoaded', checkAndModifyTimeSubtitles);




//---HISTORY VIDEO PLAY PAUSE---

function initHistoryVideoControl() {
  // Check if the page contains an element with class 'history__video'
  if (document.querySelector('.history__video')) {

      // Get all instances of '.history__bg' and '.history__fullvideo'
      const backgrounds = document.querySelectorAll('.history__bg');
      const videos = document.querySelectorAll('.history__fullvideo');
      

      backgrounds.forEach((bg, index) => {
          // Ensure there's a corresponding video element
          const video = videos[index];
          if (video) {
              const iframe = video.querySelector('iframe');

              if (iframe) {
                  const player = new YT.Player(iframe, {
                      events: {
                          'onStateChange': (event) => {
                              if (event.data === YT.PlayerState.PAUSED) {
                                  video.style.display = 'none';
                              }
                          }
                      }
                  });

                  // Add click event listener to the background element
                  bg.addEventListener('click', () => {
                      console.log('Background clicked');
                      video.style.display = 'block';

                      // Check if player instance exists
                      if (player) {
                          player.playVideo();
                      } else {
                      }
                  });
              } else {
              }
          } else {
          }
      });
  } else {
  }
}

// Load the IFrame API script if not already loaded
function loadYouTubeAPI() {
  if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
      console.log('Loading YouTube IFrame API.');
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
      // Initialize the video control after the API is loaded
      window.onYouTubeIframeAPIReady = () => {
          console.log('YouTube IFrame API is ready');
          initHistoryVideoControl();
      };
  } else {
      console.log('YouTube IFrame API already loaded.');
      initHistoryVideoControl();
  }
}

document.addEventListener('DOMContentLoaded', loadYouTubeAPI);





//---SMOOTH SCROLL TO CARE ANCHOR ON DIACONATE PAGE---

function initSmoothScrollToCareAnchor() {
  // Check if the element with ID 'care-anchor' is present on the page
  const careAnchor = document.getElementById('care-anchor');
  const careButton = document.getElementById('care-button');

  if (!careAnchor) {
      console.log('Element with ID "care-anchor" not found.');
      return;
  }

  if (!careButton) {
      console.log('Element with ID "care-button" not found.');
      return;
  }

  console.log('Both elements found. Setting up event listener.');

  // Add click event listener to the div with ID 'care-button'
  careButton.addEventListener('click', () => {
      console.log('Button clicked. Scrolling...');

      // Calculate the position to scroll to (115px above the element)
      const offsetPosition = careAnchor.getBoundingClientRect().top + window.pageYOffset - 115;

      // Smoothly scroll to the calculated position
      window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
      });
  });
}

// Initialize the function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', initSmoothScrollToCareAnchor);



//---GET RID OF THE LIVESTREAM BANNER ON THE NAV WHEN ON THE LIVESTREAM PAGE---

let previousPath = '';

function checkAndToggleLivePageClass() {
  const navBanners = document.querySelectorAll('.nav__banner');
  if (!navBanners.length) return; // Exit if no .nav__banner elements are found

  const currentPath = window.location.pathname;

  console.log('Current Path:', currentPath);
  console.log('Previous Path:', previousPath);

  navBanners.forEach((navBanner) => {
    if (currentPath.startsWith('/bulletin/') || 
        (currentPath.startsWith('/leadership/') && previousPath.startsWith('/services/')) ||
        currentPath.startsWith('/services/')) {
      navBanner.classList.add('is--livepage');
      console.log('Added is--livepage class');
    } else {
      navBanner.classList.remove('is--livepage');
      console.log('Removed is--livepage class');
    }
  });
}

// Capture the previous path before Swup replaces the content
swup.hooks.on('animation:out:start', () => {
  previousPath = window.location.pathname;
  console.log('Captured Previous Path:', previousPath);
});

// Capture the previous path on browser navigation
window.addEventListener('popstate', () => {
  previousPath = window.location.pathname;
  console.log('Captured Previous Path on popstate:', previousPath);
});

// Execute the function on initial load and on every page change using Swup.js
document.addEventListener('DOMContentLoaded', () => {
  checkAndToggleLivePageClass();
  swup.hooks.on('content:replace', () => {
    checkAndToggleLivePageClass();
  });
});