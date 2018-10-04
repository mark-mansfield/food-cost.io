
const showMobileNav = () => {
    const sidebar = document.querySelector('.sidebar')
    const mobileNav = document.querySelector('.side-nav');
    const backdrop = document.querySelector('.click-area');

    backdrop.addEventListener('click', () => {
        sidebar.classList.remove('show-element');
        mobileNav.classList.remove('show-element');
        backdrop.classList.remove('show-element');
    });

    sidebar.addEventListener('click', () => {
        sidebar.classList.remove('show-element');
        mobileNav.classList.remove('show-element');
        backdrop.classList.remove('show-element');
    });


    sidebar.classList.add('show-element')
    mobileNav.classList.add('show-element');
    backdrop.classList.add('show-element');
}

const hideMobileNav = () => {
    const mobileNav = document.querySelector('.sidebar');
    const backdrop = document.querySelector('.click-area');
    mobileNav.classList.add('hide-element');
    backdrop.classList.add('hide-element');
}

const hamburgerButton = document.querySelector('.hamburger-button');
hamburgerButton.addEventListener('click', showMobileNav);