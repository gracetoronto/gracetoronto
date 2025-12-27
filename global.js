console.log("V1.650");

//----PAGE TRANSITION FUNCTIONALITY----

/// Initialize Swup
const swup = new Swup({
  animateHistoryBrowsing: true,
  plugins: [
    new SwupGaPlugin(),
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
          containers: ['#fragment-ministries'],
          scroll: true
        },
        {
          from: ['/updates', '/updates/announcements', '/updates/news', '/updates/highlights'],
          to: ['/updates', '/updates/announcements', '/updates/news', '/updates/highlights'],
          containers: ['#fragment-updates']
        },
        {
          from: '/(.*)',
          to: '/events/(.*)',
          containers: ['#fragment-events'],
          scroll: false
        },
        {
          from: '/events/(.*)',
          to: '/(.*)',
          containers: ['#fragment-events'],
          scroll: false
        },
      ]
    }),
    new SwupScriptsPlugin ({
      head: true,
      body: false
    })
  ]
});








//IGNORE CMSFILTER SCRIPT ON EVENT PAGES

document.addEventListener('DOMContentLoaded', () => {
  if (typeof swup === 'undefined') {
    console.error('Swup is not initialized.');
    return;
  }

  let prevURL = window.location.pathname;
  const script = document.getElementById('cmsfilter-script');

  if (!script) {
    console.error('CMSFilter script not found!');
    return;
  }

  console.log('Handling CMSFilter script on initial load.');

  // Remove ignore to ensure future Swup transitions can run the script when needed
  script.removeAttribute('data-swup-ignore-script');

  if (window.location.pathname.startsWith('/events')) {
    console.log('Direct load on /events — re-inserting CMSFilter script to force execution.');

    // Clone and replace the script to force execution
    const newScript = document.createElement('script');
    newScript.id = 'cmsfilter-script';
    newScript.src = script.src;
    newScript.async = script.async;
    newScript.defer = script.defer;

    // Replace the old script with the new one
    script.parentNode.replaceChild(newScript, script);

    // Add ignore so Swup skips it on future transitions
    newScript.setAttribute('data-swup-ignore-script', '');
  }

  // Handle Swup navigation
  swup.hooks.before('content:replace', () => {
    const liveScript = document.getElementById('cmsfilter-script');
    if (!liveScript) return;

    if (prevURL.startsWith('/events')) {
      console.log('Navigating away from /events. Ignoring CMSFilter script.');
      liveScript.setAttribute('data-swup-ignore-script', '');
    } else {
      console.log('Navigating to new page. Ensuring CMSFilter script runs.');
      liveScript.removeAttribute('data-swup-ignore-script');
    }

    prevURL = window.location.pathname;
  });
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





//UPDATE EVENTS CLOSE LINKS WITH PREVIOUS URL

// Variable to store the previous URL
let prevEventsURL = '';

// Function to capture and store the previous URL
function updatePrevEventsURL() {
  const currentURL = window.location.pathname;
  const leadershipRegex = /^\/events\/.*/;

  if (!leadershipRegex.test(currentURL)) {
    prevEventsURL = currentURL;
    // console.log('Stored previous URL:', prevURL); // Debugging
  }
}

// Capture the URL on page load
document.addEventListener('DOMContentLoaded', () => {
  updatePrevEventsURL();
});

// Capture the URL on Swup navigation
swup.hooks.before('content:replace', () => {
  updatePrevEventsURL();
});

// Update .is--exit links after Swup has replaced content
swup.hooks.on('content:replace', () => {
  const currentURL = window.location.pathname;
  const leadershipRegex = /^\/events\/.*/;

  if (leadershipRegex.test(currentURL)) {
    const exitLinks = document.querySelectorAll('.is--exit');
    // console.log('Number of .is--exit links:', exitLinks.length); // Debugging

    exitLinks.forEach(link => {
      link.href = prevEventsURL; // Update link href to the previously captured URL
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
  handleEventCardResize();
  initFilterAccordion();
  filterSelectionHover();
  checkAndModifyTimeSubtitles();
  announcementEventExpand();
  resetAndPlayHomeVideo();
  checkCurrentMinistriesLink();
  loadYouTubeAPI();
  initSmoothScrollToCareAnchor();
  checkAndToggleLivePageClass();
  initShareLinks();
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
        let registerLink = event.extendedProps.register ? `<a href="${event.extendedProps.register}" class="btn-register-now btn-view-details" target="_blank">Register Now</a>` : '';
        let announcementLink = event.extendedProps.updateLink ? `<a href="${event.extendedProps.updateLink}" class="btn-view-details">Read Announcement</a>` : '';

        container.innerHTML = `
          <div class="fc-event-main">
            <div class="fc-event-time-title">
              <div class="fc-list-event-graphic"></div>
              <div class="fc-event-title">${event.title}</div>
            </div>
            <div class="event-links">
              ${registerLink}
              ${announcementLink}
            </div>
          </div>
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

console.log("Sliders found:", document.querySelectorAll('.anc__slider').length);

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
  // Select all collection list items within '.eventcard__list'
  const eventCardItems = document.querySelectorAll('.eventcard__list .eventcard__item');
  
  // Select all event text items
  const eventTextItems = document.querySelectorAll('.eventext');

  // Select all carousel event card items
  const carouselItems = document.querySelectorAll('.carousel .eventcard__item');

  // Function to process each set of items
  function processItems(items) {
    items.forEach(function (item) {
      const startDateElement = item.querySelector('.date--start');
      const endDateElement = item.querySelector('.date--end');
      const dateDash = item.querySelector('.date--dash');
      const dateDayElement = item.querySelector('.date--day');
      const dateCommaElement = item.querySelector('.date--comma');

      if (!startDateElement || !endDateElement) return;

      const startDateText = startDateElement.textContent.trim();
      const endDateText = endDateElement.textContent.trim();

      // Same-day event → hide end date + dash
      if (startDateText === endDateText) {
        endDateElement.style.display = 'none';
        if (dateDash) dateDash.style.display = 'none';
      } 
      // Multi-day event → hide day label + comma
      else {
        if (dateDayElement) dateDayElement.style.display = 'none';
        if (dateCommaElement) dateCommaElement.style.display = 'none';
      }
    });
  }

  // Run logic on all groups
  processItems(eventCardItems);
  processItems(eventTextItems);
  processItems(carouselItems);
}

// Initial page load
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
      // Force reflow to ensure all styles are applied
      list.style.display = 'block';
      list.style.position = 'absolute';
      list.style.visibility = 'hidden';
      list.style.maxHeight = 'none';

      let height = 0;
      for (let i = 0; i < Math.min(2, items.length); i++) {
        height += items[i].getBoundingClientRect().height;
      }

      // Add 24px if the device width is less than 767px
      if (window.innerWidth < 767) {
        height += 24;
      }

      // Reset styles
      list.style.display = '';
      list.style.position = '';
      list.style.visibility = '';
      list.style.maxHeight = '';

      console.log('Calculated initial height:', height);
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








//--- CAROUSEL FUNCTIONALITY ---

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

  function updateButtonStates() {
    const currentScrollPosition = container.scrollLeft;
    if (currentScrollPosition <= 0) {
      leftButton.style.opacity = '0.5';
      leftButton.style.cursor = 'default';
      leftButton.style.pointerEvents = 'none';
    } else {
      leftButton.style.opacity = '1';
      leftButton.style.cursor = 'pointer';
      leftButton.style.pointerEvents = 'auto';
    }
    if (currentScrollPosition >= maxScrollPosition) {
      rightButton.style.opacity = '0.5';
      rightButton.style.cursor = 'default';
      rightButton.style.pointerEvents = 'none';
    } else {
      rightButton.style.opacity = '1';
      rightButton.style.cursor = 'pointer';
      rightButton.style.pointerEvents = 'auto';
    }
  }

  leftButton.addEventListener('click', () => {
    let currentScrollPosition = container.scrollLeft;
    const nearestCardPosition = Math.round(currentScrollPosition / cardFullWidth) * cardFullWidth;
    currentScrollPosition = nearestCardPosition - cardFullWidth;
    if (currentScrollPosition < 0) {
      currentScrollPosition = 0;
    }
    container.scrollTo({ left: currentScrollPosition, behavior: 'smooth' });
    setTimeout(updateButtonStates, 300); // Ensure state update after scroll animation
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
    setTimeout(updateButtonStates, 300); // Ensure state update after scroll animation
  });

  function adjustScrollToNearestCard() {
    const currentScrollPosition = container.scrollLeft;
    const nearestCardPosition = Math.round(currentScrollPosition / cardFullWidth) * cardFullWidth;
    const adjustedPosition = Math.min(nearestCardPosition, maxScrollPosition + vw5);
    container.scrollTo({ left: adjustedPosition, behavior: 'smooth' });
    setTimeout(updateButtonStates, 300); // Ensure state update after scroll animation
  }

  // Ensure the initial state respects the max width and margin
  const containerWidth = container.offsetWidth;
  const totalCarouselWidth = carousel.scrollWidth;

  if (totalCarouselWidth < containerWidth) {
    carousel.style.justifyContent = 'flex-start';
  }

  // Initial update on page load
  updateButtonStates();
}

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initCarousel();
});





//---LIVESTREAM COUNTDOWN TIMER FUNCTIONALITY WITH DATE OVERRIDEE---

function startCountdown() {
  const dayBox = document.getElementById('day');
  const hourBox = document.getElementById('hour');
  const minuteBox = document.getElementById('minute');
  const secondBox = document.getElementById('second');

  // Optional: Add your override date here (EST timezone)
  // Format: 'YYYY-MM-DDTHH:MM:SS'
  const customOverrideDateString = '2025-12-24T13:30:00'; // April 17, 2025 @ 7:00pm

  if (!dayBox || !hourBox || !minuteBox || !secondBox) return;

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

    // Default: countdown to next Sunday at 9:15am EST
    const nextSunday = new Date(nowEST);
    nextSunday.setDate(nowEST.getDate() + (7 - nowEST.getDay()) % 7);
    nextSunday.setHours(9, 15, 0, 0);

    if (nowEST.getDay() === 0 && nowEST.getHours() >= 9 && nowEST.getMinutes() >= 15) {
      nextSunday.setDate(nextSunday.getDate() + 7);
    }

    let targetDate = nextSunday;

    // Check for override
    if (customOverrideDateString) {
      const overrideDate = new Date(customOverrideDateString);
      const overrideDateEST = getESTDate(overrideDate);

      const isOverrideInFuture = overrideDateEST > nowEST;
      const isOverrideBeforeSunday = overrideDateEST < nextSunday;

      if (isOverrideInFuture && isOverrideBeforeSunday) {
        targetDate = overrideDateEST;
      }
    }

    const timeDifference = targetDate - nowEST;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000).toString().padStart(2, '0');

    // Update UI
    dayBox.textContent = days;
    hourBox.textContent = hours;
    minuteBox.textContent = minutes;
    secondBox.textContent = seconds;

    // Optional zero-out if Sunday livestream is active
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




//---MINISTRY PAGE NAV CURRENT LINK SELECTION---

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

function initInfiniteSlideshow() {
  const slideshowTrack = document.querySelector('.slideshow__track');
  const slides = document.querySelectorAll('.slideshow__item');

  if (!slideshowTrack || slides.length === 0) return;

  // Clone the slides for infinite horizontal scrolling
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    slideshowTrack.appendChild(clone);
  });

  let scrollAmount = 0;
  const scrollSpeed = 1.5; // Adjust this value for faster/slower scrolling

  function scrollSlideshow() {
    scrollAmount += scrollSpeed;
    slideshowTrack.style.transform = `translateX(-${scrollAmount}px)`;

    // Reset the scroll when it reaches the end of the original slides
    const maxScroll = slides.length * slides[0].offsetWidth;
    if (scrollAmount >= maxScroll) {
      scrollAmount = 0;
      slideshowTrack.style.transform = 'translateX(0)';
    }

    requestAnimationFrame(scrollSlideshow);
  }

  scrollSlideshow();
}

// Reinitialize the slideshow on Swup.js page load
swup.hooks.on('content:replace', () => {
  initInfiniteSlideshow();
});

// Initialize on the first page load
document.addEventListener('DOMContentLoaded', () => {
  initInfiniteSlideshow();
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

// Store the previous URL
let previousPageURL = window.location.pathname;

// Function to initialize checkbox behavior on the /events page
function initCheckboxBehavior() {
  // Check if the current URL matches exactly /events
  const currentURL = window.location.pathname;
  if (currentURL !== '/events' || previousPageURL.startsWith('/events/') && previousPageURL !== '/events') {
    return; // Exit if the URL is not /events or if coming from /events/*
  }

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
  if (!churchWideCheckbox || ministryCheckboxLabels.length === 0 || !filtersDiv || !churchwideDiv) {
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
    }, 350); // Delay for 350ms
  }

  // Check if any ministry checkboxes are selected
  function anyMinistryCheckboxSelected() {
    return Array.from(ministryCheckboxLabels).some(label => label.querySelector('input[type="checkbox"]').checked);
  }

  // Handle change on the church-wide checkbox
  churchWideCheckbox.addEventListener('change', function() {
    updateVisibility();
    if (this.checked) {
      ministryCheckboxLabels.forEach(label => {
        const checkbox = label.querySelector('input[type="checkbox"]');
        if (checkbox) {
          forceCheckboxState(checkbox, false);
        }
      });
    } else if (!anyMinistryCheckboxSelected()) {
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
          forceCheckboxState(churchWideCheckbox, false);
        } else if (!anyMinistryCheckboxSelected()) {
          forceCheckboxState(churchWideCheckbox, true);
        }
      });
    }
  });

  // Ensure the correct initial state
  if (!anyMinistryCheckboxSelected() && !churchWideCheckbox.checked) {
    const firstCheckbox = ministryCheckboxLabels[0].querySelector('input[type="checkbox"]');
    if (firstCheckbox) {
      forceCheckboxState(firstCheckbox, true);
    } else {
      forceCheckboxState(churchWideCheckbox, true);
    }
  }

  // Initialize visibility on page load
  updateVisibility();
}

// Run the function on initial load and with Swup.js
document.addEventListener('DOMContentLoaded', () => {
  initCheckboxBehavior();

  // Reinitialize the function on Swup navigation
  if (typeof swup !== 'undefined') {
    swup.hooks.before('content:replace', () => {
      previousPageURL = window.location.pathname; // Update the previous URL before navigation
    });

    swup.hooks.on('content:replace', () => {
      initCheckboxBehavior();
    });
  }
});

initCheckboxBehavior();



//---HANDLE EVENT CARD COMPONENT RESPONSIVENESS---

function handleEventCardResize() {
  const eventCards = document.querySelectorAll('.eventcard');

  if (eventCards.length > 0) {
      const elementsToUpdate = [
          '.eventcard',
          '.eventcard__top',
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
          const viewportWidth = window.innerWidth;
          elementsToUpdate.forEach(selector => {
              const elements = eventCard.querySelectorAll(selector);
              elements.forEach(element => {
                  if (width < 750 && viewportWidth < 1200) {
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










//---SMOOTH SCROLL TO CARE ANCHOR ON DIACONATE PAGE---

function initSmoothScrollToCareAnchor() {
  // Check if the element with ID 'care-anchor' is present on the page
  const careAnchor = document.getElementById('care-anchor');
  const careButton = document.getElementById('care-button');

  if (!careAnchor) {
      return;
  }

  if (!careButton) {
      return;
  }


  // Add click event listener to the div with ID 'care-button'
  careButton.addEventListener('click', () => {

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

swup.hooks.on('content:replace', initSmoothScrollToCareAnchor);






//---GET RID OF THE LIVESTREAM BANNER ON THE NAV WHEN ON THE LIVESTREAM PAGE---

let previousPath = '';

function checkAndToggleLivePageClass() {
  const navBanners = document.querySelectorAll('.nav__banner');
  if (!navBanners.length) return; // Exit if no .nav__banner elements are found

  const currentPath = window.location.pathname;

  navBanners.forEach((navBanner) => {
    if (currentPath.startsWith('/bulletin/') || 
        (currentPath.startsWith('/leadership/') && previousPath.startsWith('/services/')) ||
        currentPath.startsWith('/services/')) {
      navBanner.classList.add('is--livepage');
    } else {
      navBanner.classList.remove('is--livepage');
    }
  });

  // Update the previous path only if the current path is /services/
  if (currentPath.startsWith('/services/')) {
    previousPath = currentPath;
  } else if (!currentPath.startsWith('/leadership/')) {
    // Reset previousPath if navigating away from /services/ or /leadership/
    previousPath = '';
  }
}

// Execute the function on initial load2
document.addEventListener('DOMContentLoaded', () => {
  checkAndToggleLivePageClass();
});

// Execute the function on every Swup page change
swup.hooks.on('content:replace', () => {
  checkAndToggleLivePageClass();
});





//---EVENT DESCRIPTION ACCORDION---

function initEventDescriptionToggle() {
  // Check if '.event' exists on the page
  if (!document.querySelector('.event')) return;

  // Get all elements with class '.event__description'
  const descriptions = document.querySelectorAll('.event__description');

  descriptions.forEach(description => {
    const fade = description.querySelector('.event__fade');
    const close = description.querySelector('.event__close');
    
    // Ensure cursor is set to pointer for both fade and close elements
    fade.style.cursor = 'pointer';
    close.style.cursor = 'pointer';

    // Set the initial styles for fade and close elements
    fade.style.opacity = 1;
    fade.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'; // Smoother fade transition
    close.style.opacity = 0;
    close.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'; // Smoother fade transition
    close.style.display = 'none'; // Initially hidden

    // Set the initial max height for the description
    description.style.maxHeight = '110px';
    description.style.overflow = 'hidden';
    description.style.transition = 'max-height 0.4s cubic-bezier(0.25, 1, 0.5, 1)'; // Smoother easing

    // Function to expand the description
    fade.addEventListener('click', () => {
      // Start fading out `.event__fade` immediately
      fade.style.opacity = 0;

      // Ensure `.event__close` starts appearing before `.event__fade` is fully hidden
      setTimeout(() => {
        close.style.display = 'block';
        close.style.opacity = 1; // Fade in `.event__close`
      }, 100); // Small delay to start `.event__close` fade-in before `.event__fade` finishes

      // Remove the max-height to calculate natural height, then set it back
      description.style.maxHeight = 'none';
      const fullHeight = description.scrollHeight + 24 + 'px'; // Add 24px to calculated height
      description.style.maxHeight = '110px'; // Reset to 110px temporarily

      // Start the transition
      setTimeout(() => {
        description.style.maxHeight = fullHeight; // Transition to full height with extra 24px
        description.style.overflow = 'visible'; // Ensure all content is visible after transition
      }, 10); // Small delay to ensure smooth transition start

      // Hide `.event__fade` after it's fully faded out
      setTimeout(() => {
        fade.style.display = 'none';
      }, 300); // Delay corresponds to the duration of the fade-out
    });

    // Function to collapse the description
    close.addEventListener('click', () => {
      // Collapse back to 110px and hide overflow
      description.style.maxHeight = '110px';
      description.style.overflow = 'hidden';

      // Start fading in `.event__fade` halfway through the collapse animation
      setTimeout(() => {
        fade.style.display = 'flex';
        fade.style.opacity = 1; // Fade in `.event__fade` during collapse
      }, 200); // Start fading in halfway through the collapse

      // Hide close button after the collapse animation completes
      description.addEventListener('transitionend', () => {
        close.style.opacity = 0;
        setTimeout(() => {
          close.style.display = 'none';
        }, 300); // Small delay to ensure fade-out is complete
      }, { once: true });
    });
  });
}

// Example of triggering this function on swup navigation
swup.hooks.on('content:replace', () => {
  initEventDescriptionToggle();
});

// You can also run it on the initial page load
document.addEventListener('DOMContentLoaded', initEventDescriptionToggle);






//---CHURCH UPDATES SHARE BUTTON FUNCTIONALITY---

function initShareLinks() {
  // Check if .share__facebook element exists on the page
  if (document.querySelector('.share__facebook')) {
    // Facebook Share
    document.querySelector('.share__facebook').addEventListener('click', function() {
      const url = encodeURIComponent(window.location.href);
      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      window.open(facebookShareUrl, '_blank');
    });

    // X (Twitter) Share
    document.querySelector('.share__x').addEventListener('click', function() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(document.title); // Customize the tweet text if needed
      const twitterShareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      window.open(twitterShareUrl, '_blank');
    });

    // Email Share
    document.querySelector('.share__email').addEventListener('click', function() {
      const subject = encodeURIComponent('{{wf {&quot;path&quot;:&quot;name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}');
      const body = encodeURIComponent(`Check out this update from Grace Toronto Church: ${window.location.href}`);
      const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
    });

    // Copy Link to Clipboard
    document.querySelector('.share__copy').addEventListener('click', function() {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(function() {
        alert('Link copied to clipboard!');
      }, function(err) {
        alert('Failed to copy the link.');
      });
    });
  }
}

// Initial call and Swup hook to reinitialize after content replacement
document.addEventListener('DOMContentLoaded', initShareLinks);
swup.hooks.on('content:replace', initShareLinks);




//---VIDEO MODAL FUNCTIONALITY---

function initVideoTriggers() {
  const triggers = document.querySelectorAll('[data-trigger]');
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent); // Detect iOS specifically

  triggers.forEach(trigger => {
    trigger.addEventListener('click', function () {
      const videoId = parseInt(this.getAttribute('data-trigger'), 10);
      const videoModal = document.querySelector(`.base__video[data-video="${videoId}"]`);
      const iframe = videoModal.querySelector('.video__container iframe');

      // Initialize Vimeo player only once per trigger click
      const player = new Vimeo.Player(iframe);

      // If on iOS, bypass modal and go directly to fullscreen
      if (isIOS) {
        player.loadVideo(videoId).then(() => {
          player.setVolume(1); // Unmute before playing
          setTimeout(() => {
            player.requestFullscreen().then(() => {
              return player.play(); // Start playing in fullscreen
            }).catch(error => console.error('Fullscreen error:', error));
          }, 500);

          // Auto-exit fullscreen and stop video when it ends on iOS
          player.on('ended', () => {
            player.exitFullscreen().then(() => {
              player.unload(); // Reset video after exit
            });
          });

        }).catch(error => console.error('Error loading video:', error));

      } else {
        // For Android and desktop, show the modal and play in the modal container
        videoModal.style.display = 'flex';
        const videoContainer = videoModal.querySelector('.video__container');
        videoContainer.style.opacity = '0';
        videoContainer.style.transition = 'opacity 1500ms';
        videoContainer.style.opacity = '1';

        player.loadVideo(videoId).then(() => {
          player.setVolume(1);
          setTimeout(() => {
            player.play().catch(error => {
              console.error('Error with autoplay:', error);
            });
          }, 500);

          player.on('ended', () => {
            videoModal.style.display = 'none';
            player.unload();
          });

        }).catch(error => console.error('Error loading video:', error));

        // Close button functionality
        const closeBtn = videoModal.querySelector('.profile__close');
        closeBtn.addEventListener('click', function () {
          player.setVolume(0); // Mute immediately on close
          player.unload().then(() => {
            console.log('Video reset and muted on close.');
          }).catch(error => {
            console.error('Error unloading video:', error);
          });

          videoModal.style.display = 'none';
        });
      }
    });
  });
}

// Initialize on DOMContentLoaded and Swup content replacement
document.addEventListener('DOMContentLoaded', function () {
  initVideoTriggers();

  swup.hooks.on('content:replace', () => {
    initVideoTriggers();
  });
});







function initFormOverlay() {
  const baseForm = document.querySelector('.base__form');
  if (!baseForm) return;

  const formDim = baseForm.querySelector('.form__dim');
  const formWrapper = baseForm.querySelector('.form__wrapper');
  const closeButton = document.querySelector('.profile__close');
  let formEmbedContainer = document.createElement('div');
  formEmbedContainer.classList.add('form__embed-container');
  formWrapper.appendChild(formEmbedContainer);

  const openButtons = document.querySelectorAll('[data-tf-form]');
  let activeFormId = null;

  // Completely reset Typeform
  function resetTypeform() {
    console.log("Resetting Typeform...");

    // Remove embed container
    formEmbedContainer.innerHTML = '';
    formEmbedContainer.remove();

    // Remove Typeform script
    document.querySelectorAll('script[src*="typeform"]').forEach(script => script.remove());

    // Recreate container
    formEmbedContainer = document.createElement('div');
    formEmbedContainer.classList.add('form__embed-container');
    formWrapper.appendChild(formEmbedContainer);

    activeFormId = null;
  }

  // Load Typeform script dynamically
  function loadTypeformScript(callback) {
    if (document.querySelector('script[src*="typeform"]')) {
      console.log("Typeform script already loaded.");
      callback();
      return;
    }

    console.log("Loading Typeform script...");
    const script = document.createElement('script');
    script.src = 'https://embed.typeform.com/embed.js';
    script.async = true;
    script.onload = () => {
      console.log("Typeform script loaded.");
      callback();
    };

    document.body.appendChild(script);
  }

  function createTypeformEmbed(formId) {
    resetTypeform(); // Wipe everything first

    // Create new embed container
    const embedDiv = document.createElement('div');
    embedDiv.setAttribute('data-tf-live', formId);
    embedDiv.setAttribute('data-tf-inline-on-mobile', true);
    formEmbedContainer.appendChild(embedDiv);

    loadTypeformScript(() => {
      setTimeout(() => {
        try {
          console.log("Initializing Typeform...");
          window.tf.createWidget(formId, { container: embedDiv });
        } catch (error) {
          console.error("Error initializing Typeform:", error);
        }
      }, 100);
    });

    activeFormId = formId;
  }

  function openForm(formId) {
    formDim.style.opacity = '0';
    formWrapper.style.transform = 'translateY(500px)';

    baseForm.style.display = 'flex';

    setTimeout(() => {
      formDim.style.transition = 'opacity 0.25s ease';
      formWrapper.style.transition = 'transform 0.25s ease';
      formDim.style.opacity = '1';
      formWrapper.style.transform = 'translateY(0)';
    }, 10);

    createTypeformEmbed(formId);
  }

  function closeForm() {
    console.log("Closing Typeform...");

    formDim.style.opacity = '0';
    formWrapper.style.transform = 'translateY(500px)';

    setTimeout(() => {
      baseForm.style.display = 'none';
      resetTypeform(); // Completely wipe it when closed
    }, 250);
  }

  // Attach click event listeners
  openButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const formId = button.getAttribute('data-tf-form');
      if (formId) openForm(formId);
    });
  });

  if (formDim) formDim.addEventListener('click', closeForm);
  if (closeButton) closeButton.addEventListener('click', closeForm);
}

// Ensure it works with Swup navigation
function setupSwupListener() {
  if (window.swup) {
    swup.hooks.on('content:replace', () => {
      console.log("Swup navigation detected: Reinitializing form overlay...");
      setTimeout(() => {
        initFormOverlay();
      }, 50);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initFormOverlay();
  setupSwupListener();
});




//---DELAY MINISTRY LINK TO ALLOW EVENT MOAL TO CLOSE---
function handleEventLinkClicks() {
  let storedURL = null; // Variable to store the URL from the clicked element

  // Add click event listener to elements with class 'is--eventlink'
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.is--eventlink'); // Ensure we're targeting the correct element

    if (target) {
      e.preventDefault(); // Prevent default link behavior
      storedURL = target.href || target.dataset.url; // Store the URL (assumes it is in href or data-url attribute)
      console.log(`Stored URL: ${storedURL}`); // Debugging: Log the stored URL

      const exitElement = document.querySelector('.is--exit'); // Check for '.is--exit' element
      if (exitElement) {
        console.log("Exit element found, triggering click..."); // Debugging
        exitElement.click(); // Trigger the 'exit' action

        // Wait 500ms for the transition to complete
        setTimeout(() => {
          if (storedURL) {
            console.log(`Navigating to stored URL: ${storedURL}`); // Debugging
            swup.navigate(storedURL); // Use Swup to navigate to the stored URL
            storedURL = null; // Clear the variable for future clicks
          } else {
            console.error("No stored URL to navigate to."); // Debugging
          }
        }, 600);
      } else {
        console.error("Exit element not found, aborting operation."); // Debugging
      }
    }
  });
}

// Initialize the function (include this in Swup hooks if using Swup.js)
swup.hooks.on('content:replace', () => {
  handleEventLinkClicks();
});

handleEventLinkClicks();




//---GSAP ANIMATE UP ANIMATIONS---

function initGSAPAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.error("GSAP or ScrollTrigger not loaded");
    return;
  }

  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  // Animate individual elements without stagger (outside of `.animate-stagger`)
  gsap.utils.toArray(".animate-up:not(.animate-stagger .animate-up)").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 98%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  // Animate and stagger elements inside each `.animate-stagger` group
  document.querySelectorAll(".animate-stagger").forEach((group) => {
    const items = gsap.utils.toArray(group.querySelectorAll(".animate-up"));

    if (items.length > 0) {
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15, // Stagger only within this group
          scrollTrigger: {
            trigger: group,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  });

  console.log("GSAP animations initialized with reusable stagger.");
}

document.addEventListener("DOMContentLoaded", initGSAPAnimations);
swup.hooks.on("content:replace", initGSAPAnimations);

initGSAPAnimations();