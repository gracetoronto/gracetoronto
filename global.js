console.log("V1.219");

//----PAGE TRANSITION FUNCTIONALITY----

/// Initialize Swup
const swup = new Swup({
  animateHistoryBrowsing: true,

  plugins: [
    new SwupFragmentPlugin({
      rules: [
        {
          from: '/ministries/(.*)',
          to: '/ministries/(.*)',
          containers: ['#fragment-ministries']
        }
      ]
    }),
    new SwupScriptsPlugin({
      head: true,
      body: true
    })
  ]
});




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
  showCal();
  initCarousel();
  initializeAccordions();
  updateEventCount();
  initializeSliders();
  initializeShowFirstImage();
  hideMatchingEndDates();
  updateLinkedUpdate();
  initializeToggle();
  updateNavButtons();
  startCountdown();
  initializeMinistryNavigation();
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


  // Apply filter styles to invert colours
  if (containerBlurs) {
    containerBlurs.forEach((containerBlur) => {
      containerBlur.style.filter = 'invert(93%)';
    });
  }

  // Check if the current page should have a transparent navigation
  if (isTransparentBg(window.location.pathname)) {
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
        left: 'listThreeMonth,dayGridMonth', // List and Calendar buttons are left aligned
        center: 'title', // Title is centered
        right: 'prev,next today' // Navigation buttons are right aligned
      },
      views: {
        listThreeMonth: {
          type: 'list',
          duration: { months: 3 }, // Set the duration to 3 months
          buttonText: 'List View'
        },
        dayGridMonth: {
          buttonText: 'Calendar'
        }
      },
      height: 'auto', // Adjust the calendar height based on the content
      events: events,
      eventTimeFormat: { // Specify time format for events
        hour: '2-digit',
        minute: '2-digit',
        meridiem: 'short' // Use 12-hour format with AM/PM
      },
      eventClick: function (data) {
        alert(`User clicked the event ${data.event.title}`);
      }
    });

    calendarInst.render();
    calendars.push(calendarInst); // Store the calendar instance
  });
}

// Function to get events from the Webflow CMS
function getEvents() {
  const scripts = document.querySelectorAll('[data-element="event-data"]');
  const events = Array.prototype.slice.call(scripts).map(function (script) {
    try {
      const event = JSON.parse(script.textContent.trim());
      event.start = new Date(event.start); // Ensure start time is parsed as a Date object
      event.end = new Date(event.end); // Ensure end time is parsed as a Date object


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







//---UPDATE CALENDAR EVENT COUNT ON MINISTRY PAGES---

function updateEventCount() {
  // Check if the current page has a div with class '.ministry__calendar'
  if (!document.querySelector('.ministry__calendar')) {
    return;
  }

  // Get the number of elements with class "calendar__item"
  var numberOfEvents = document.getElementsByClassName('calendar__item').length;

  // Create a new div element for displaying the count
  var countElement = document.createElement('div');
  countElement.classList.add('subtitle', 'is--2');

  // Update text content based on number of events
  if (numberOfEvents === 1) {
    countElement.textContent = "1 upcoming event";
  } else {
    countElement.textContent = numberOfEvents + " upcoming events";
  }

  // Select the .ministry__events container
  var ministryEventsContainer = document.querySelector('.ministry__events');

  // Remove any existing count elements (if any)
  var existingCountElement = ministryEventsContainer.querySelector('.subtitle.is--2');
  if (existingCountElement) {
    ministryEventsContainer.removeChild(existingCountElement);
  }

  // Append the count element to the ministryEventsContainer
  ministryEventsContainer.appendChild(countElement);
}

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initial update on page load
  updateEventCount();
});






//---ANNOUNCEMENT IMAGE SLIDER---

if (typeof initSlider === 'undefined') {
  var initSlider = function(sliderContainer) {
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
  eventCardButton.appendChild(countElement);
}

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initial update on page load
  updateLinkedUpdate();
});





//---EVENT CARD EXPANDING AND COLLAPSING---


function initializeToggle() {  
  const button = document.querySelector('.eventcard__button');
  const list = document.querySelector('.eventcard__list');
  const openClass = document.querySelector('.eventcard__open');
  const closeClass = document.querySelector('.eventcard__close');
  const items = list ? list.querySelectorAll('.eventcard__item') : [];

  if (!button || !list || !openClass || !closeClass) return;

  // Function to calculate the height of the first two items
  function calculateInitialHeight() {
    let height = 0;
    for (let i = 0; i < Math.min(2, items.length); i++) {
      height += items[i].offsetHeight;
    }
    return height;
  }

  // Set initial max-height based on the height of the first two items
  list.style.maxHeight = `${calculateInitialHeight()}px`;

  // Hide or show button based on the number of items
  if (items.length <= 2) {
    button.style.display = 'none';
    closeClass.style.display = 'none'; // Also hide the close button if needed
  } else {
    button.style.display = 'flex';
    closeClass.style.display = 'none'; // Ensure close button is hidden initially
  }

  button.addEventListener('click', function () {
    list.classList.toggle('expanded');
    if (list.classList.contains('expanded')) {
      list.style.maxHeight = `${list.scrollHeight}px`; // Expand to full height
      openClass.style.display = 'none';
      closeClass.style.display = 'flex';
    } else {
      list.style.maxHeight = `${calculateInitialHeight()}px`; // Collapse to initial height
      openClass.style.display = 'flex';
      closeClass.style.display = 'none';
    }
  });
}

// Initialize on page load
initializeToggle();






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

  leftButton.addEventListener('click', () => {
    console.log('left button clicked');
    let currentScrollPosition = container.scrollLeft;
    currentScrollPosition -= cardFullWidth;
    if (currentScrollPosition < 0) {
      currentScrollPosition = 0;
    }
    container.scrollTo({ left: currentScrollPosition, behavior: 'smooth' });
    setTimeout(adjustScrollToNearestCard, 500); // Adjust after the scroll animation
  });

  rightButton.addEventListener('click', () => {
    console.log('right button clicked');
    let currentScrollPosition = container.scrollLeft;
    currentScrollPosition += cardFullWidth;
    const maxScrollPosition = carousel.scrollWidth - container.offsetWidth;
    if (currentScrollPosition > maxScrollPosition) {
      currentScrollPosition = maxScrollPosition;
    }
    container.scrollTo({ left: currentScrollPosition, behavior: 'smooth' });
    setTimeout(adjustScrollToNearestCard, 500); // Adjust after the scroll animation
  });

  function adjustScrollToNearestCard() {
    const currentScrollPosition = container.scrollLeft;
    const nearestCardPosition = Math.round(currentScrollPosition / cardFullWidth) * cardFullWidth;
    container.scrollTo({ left: nearestCardPosition, behavior: 'smooth' });
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

    if (nowEST.getDay() === 0 && nowEST.getHours() >= 9 && nowEST.getHours() < 13 && (nowEST.getHours() !== 12 || nowEST.getMinutes() < 30)) {
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
