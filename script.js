window.onload = function() {
    activateNavLinks();
    activatePortfolioSection();
}

/* TopNav links effects and scrolling */
function activateNavLinks() {
    var NAV_LINKS = document.getElementsByClassName('top-nav__link');
    listenEventOnElements(NAV_LINKS, 'click', handleNavLinkClick);
    window.addEventListener('scroll', activateNavLinkOnScroll);
}

function activateNavLinkOnScroll() {
    var HEADER_HEIGHT = 95;
    var currentOffset = window.pageYOffset;
    var sections = getSections();
    for (var i = 0; i < sections.length; i++) {
        if (currentOffset >= sections[i].offsetTop - HEADER_HEIGHT - 1 && currentOffset <= sections[i].offsetTop + sections[i].offsetHeight - HEADER_HEIGHT) {
            var associatedLink = getLinkByAnchor(sections[i].id);
            if (!linkIsActive(associatedLink)) {
                inactivateNavLinks();
                activateNavLink(associatedLink);
            }
        }
    }
}

function getLinkByAnchor(url) {
    var NAV_LINKS = document.getElementsByClassName('top-nav__link');
    for (var i = 0; i < NAV_LINKS.length; i++) {
        if (getAnchor(NAV_LINKS[i].href) === url) {
            return NAV_LINKS[i];
        }
    }
    return null;
}

function linkIsActive(link) {
    return link.classList.contains('top-nav__link_active');
}


function activateNavLink(link) {
    link.classList.add('top-nav__link_active');
}

function getSections() {
    var NAV_LINKS = document.getElementsByClassName("top-nav__link");
    var sections = [];
    for (var i = 0; i < NAV_LINKS.length; i++) {
        var section = document.getElementById(getAnchor(NAV_LINKS[i].href));
        if (section) {
            sections.push(section);
        }
    }
    return sections;
}

function listenEventOnElements(elements, event, cb) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener(event, cb);
    }
}

function inactivateNavLinks() {
    var NAV_LINKS = document.getElementsByClassName('top-nav__link');
    var ACTIVE_CLASS = 'top-nav__link_active';
    for (var i = 0; i < NAV_LINKS.length; i++) {
        if (NAV_LINKS[i].classList.contains(ACTIVE_CLASS)) {
            NAV_LINKS[i].classList.remove(ACTIVE_CLASS);
        }
    }
}

function changeActiveNavLink(event) {
    inactivateNavLinks();
    var ACTIVE_CLASS = 'top-nav__link_active';
    var clickedLink = event.target;
    clickedLink.classList.add(ACTIVE_CLASS);
}

function handleNavLinkClick(event) {
    event.preventDefault();
    changeActiveNavLink(event);
    console.log("Clicked");
    console.log(event.target.href);
    var targetId = getAnchor(event.target.href);
    if (targetId) {
        var targetElement = document.getElementById(targetId);
        scroll(targetElement.offsetTop)
    }
}

function getAnchor(url) {
    return (url.split('#').length > 1) ? url.split('#')[1] : null;
}

function scroll(offset) {
    var SPEED = 50;
    var DELAY = 10;
    var HEADER_HEIGHT = 95;
    var currentOffset = window.pageYOffset;

    function scrollDown() {
        if (currentOffset < offset) {
            window.scrollTo(0, currentOffset);
            currentOffset += SPEED;
            timer = setTimeout(scrollDown, DELAY);
        } else {
            clearTimeout(timer);
            window.scrollTo(0, offset - HEADER_HEIGHT);
        }
    }

    function scrollUp() {
        if (currentOffset > offset) {
            window.scrollTo(0, currentOffset);
            currentOffset -= SPEED;
            timer = setTimeout(scrollUp, DELAY);
        } else {
            clearTimeout(timer);
            window.scrollTo(0, offset - HEADER_HEIGHT);
        }
    }

    if (currentOffset > offset) {
        scrollUp();
    } else {
        scrollDown();
    }
}

/* TopNav links effects and scrolling end */

/* Portfolio section effects */

function activatePortfolioSection() {
    listenPortfolioTabsClick();
    listenPortfolioImagesClick();
}

function listenPortfolioTabsClick() {
    var PORTFOLIO_TABS = getPortolioTabs();
    for (var i = 0; i < PORTFOLIO_TABS.length; i++) {
        PORTFOLIO_TABS[i].addEventListener('click', handlePortfolioTabClick);
    }
}

function handlePortfolioTabClick(e) {
    var CURRENT_TAB = e.target;
    var PORTFOLIO_TABS = getPortolioTabs();
    var ACTIVE_CLASS = 'filter__item_active';
    deactivatePortfolioTabs(PORTFOLIO_TABS, ACTIVE_CLASS);
    activatePortfolioTab(CURRENT_TAB, ACTIVE_CLASS);

    var portfolioImages = getPortfolioImages();
    var newPortfolioImages = changePortfolioImagesOrder(portfolioImages);
    unmountPortfolioImages();
    mountPortfolioImages(newPortfolioImages);
}

function activatePortfolioTab(tab, activeClass) {
    if (!tab.classList.contains(activeClass)) {
        tab.classList.add(activeClass);
    }
}

function deactivatePortfolioTabs(tabs, activeClass) {
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].classList.contains(activeClass)) {
            tabs[i].classList.remove(activeClass);
        }
    }
}

function getPortolioTabs() {
    return document.querySelector('.portfolio__filter').getElementsByClassName('filter__item');
}

function getPortfolioImages() {
    return document.getElementsByClassName('portfolio__image');
}

function changePortfolioImagesOrder(images) {
    var lastElement = images[images.length - 1];
    var newImagesArray = [];
    newImagesArray.push(lastElement);
    for (var i = 0; i < images.length - 1; i++) {
        newImagesArray.push(images[i]);
    }
    return newImagesArray;
}

function unmountPortfolioImages() {
    var CONTAINER = document.querySelector('.portfolio__grid');
    CONTAINER.innerHTML = '';
}

function mountPortfolioImages(images) {
    var CONTAINER = document.querySelector('.portfolio__grid');
    for (var i = 0; i < images.length; i++) {
        CONTAINER.appendChild(images[i]);
    }
}

function listenPortfolioImagesClick() {
    var PORTFOLIO_IMAGES = getPortfolioImages();
    for (var i = 0; i < PORTFOLIO_IMAGES.length; i++) {
        PORTFOLIO_IMAGES[i].addEventListener('click', handlePortfolioImageClick);
    }
}

function handlePortfolioImageClick(e) {
    var CURRENT_ELEMENT = e.target;
    var PORTFOLIO_IMAGES = getPortfolioImages();
    var ACTIVE_CLASS = 'portfolio__image_active';
    deactivateAllPortfolioImages(PORTFOLIO_IMAGES, ACTIVE_CLASS);
    activatePortfolioImage(CURRENT_ELEMENT, ACTIVE_CLASS);
}

function deactivateAllPortfolioImages(images, activeClass) {
    for (var i = 0; i < images.length; i++) {
        var currentImage = images[i];
        if (currentImage.classList.contains(activeClass)) {
            currentImage.classList.remove(activeClass);
        }
    }
}

function activatePortfolioImage(portfolioImage, activeClass) {
    if (!portfolioImage.classList.contains(activeClass)) {
        portfolioImage.classList.add(activeClass);
    }
}

/* Portfolio section effects end */

/* helpers */

/* helpers end */