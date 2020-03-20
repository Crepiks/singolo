window.onload = function() {
    activateNavLinks();
}

function activateNavLinks() {
    var NAV_LINKS = document.getElementsByClassName('top-nav__link');
    listenEventOnElements(NAV_LINKS, 'click', handleNavLinkClick);
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
    console.log("Clicked")
    scroll(2000)
}

function scroll(offset) {
    var SPEED = 50;
    var currentOffset = window.pageYOffset;
    if (currentOffset > offset) {
        for (var i = currentOffset; i > offset; i -= SPEED) {
            window.scrollTo(0, i);
        }
    } else {
        for (var i = currentOffset; i < offset; i += SPEED) {
            window.scrollTo(0, i);
        }
    }
    currentOffset = window.pageYOffset;
    if (currentOffset !== offset) {
        window.scrollTo(0, offset);
    }
}