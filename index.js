// Select and cache the <main> element in a variable named mainEl.
const mainEl = document.querySelector('main');

// Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
mainEl.style.backgroundColor = 'var(--main-bg)';

// Set the content of mainEl to <h1>DOM Manipulation</h1>. 
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';

// Add a class of flex-ctr to mainEl.
// Hint: Use the Element.classList API.
mainEl.classList.add('flex-ctr');


// Part 2: Creating a Menu Bar
// Next, create a blank menu bar that we can use to later add some interactivity to the page:
// Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
const topMenuEl = document.getElementById('top-menu');

// Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height = '100%';
// Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
// Add a class of flex-around to topMenuEl.
topMenuEl.classList.add('flex-around');

// Menu data structure
var menuLinks = [
    { text: 'about', href: '/about' },
    { text: 'catalog', href: '/catalog' },
    { text: 'orders', href: '/orders' },
    { text: 'account', href: '/account' },
  ];

  
  const nav = document.querySelector('nav')

  for (var i = 0; i < menuLinks.length; i++) {
      var link = menuLinks[i];
      var menuItem = document.createElement('a');
      menuItem.textContent = link.text;
      menuItem.href = link.href;
      nav.appendChild(menuItem);
  }


//   ======== R-ALAB-DOM2==========

// Part 3: Creating the Submenu

// Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
const subMenuEl = document.getElementById('sub-menu');

// Set the height subMenuEl element to be "100%".
subMenuEl.style.height = '100%';

// Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';

// Add the class of flex-around to the subMenuEl element.
subMenuEl.classList.add('flex-around');

// Part 4: Adding Menu Interaction
// In order to add submenu links, we will need to restructure the menuLinks array within index.js. Update the menuLinks array to the following:

var menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
      {text: 'all', href: '/catalog/all'},
      {text: 'top selling', href: '/catalog/top'},
      {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
      {text: 'new', href: '/orders/new'},
      {text: 'pending', href: '/orders/pending'},
      {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
      {text: 'profile', href: '/account/profile'},
      {text: 'sign out', href: '/account/signout'},
    ]},
  ];

//   Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
const topMenuLinks = topMenuEl.querySelectorAll('a');
// Attach a delegated 'click' event listener to topMenuEl.
topMenuEl.addEventListener('click', function(event){
    // Call preventDefault() method of the event object
    event.preventDefault();

    // Immediately return if the element clicked was not an <a> element
    if (!event.target.matches('a')) {
        return;
    }
// Log the content of the <a> to verify the handler is working.
console.log(event.target.textContent);
});



// // Loop through each <a> element in topMenuLinks
// topMenuLinks.forEach(function(link) {
//     // Remove the 'active' class from each <a> element
//     link.classList.remove('active');
// });

// // Toggle the 'active' class for the clicked <a> element
// event.target.classList.toggle('active');

var clickedLink = event.target;
if (!clickedLink.classList.contains('active')) {
  for (var i = 0; i < topMenuLinks.length; i++) {
    topMenuLinks[i].classList.remove('active');
  }
  clickedLink.classList.add('active');
} else {
  clickedLink.classList.remove('active');
}

// Toggling submenu

var linkText = clickedLink.textContent.toLowerCase();
var linkObject = menuLinks.find(link => link.text.toLowerCase() === linkText);
if (linkObject && linkObject.subLinks) {
  if (!clickedLink.classList.contains('active')) {
    subMenuEl.style.top = '100%';
  } else {
    subMenuEl.style.top = '0';
  }
  buildSubMenu(linkObject.subLinks);
} else {
  subMenuEl.style.top = '0';
}


// Helper function to build submenu
function buildSubMenu(subLinks) {
var subMenuEl = document.getElementById('subMenu');
subMenuEl.innerHTML = '';
subLinks.forEach(function(subLink) {
  var a = document.createElement('a');
  a.setAttribute('href', subLink.href);
  a.textContent = subLink.text;
  subMenuEl.appendChild(a);
});
}

// Adding event listener to submenu items

subMenuEl.addEventListener('click', function(event) {
event.preventDefault();
if (!event.target.matches('a')) return;

subMenuEl.style.top = '0';
var clickedSubLink = event.target;
for (var i = 0; i < topMenuLinks.length; i++) {
  topMenuLinks[i].classList.remove('active');
}
var mainEl = document.getElementById('main');
mainEl.innerHTML = '<h1>' + clickedSubLink.textContent + '</h1>';
});