// Navigation
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');


navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav--visible');
})

// Dark Mode Switch Button
document.documentElement.classList.remove('no-js');

const STORAGE_KEY = 'user-color-scheme';
const COLOR_MODE_KEY = '--color-mode';

const modeToggleButton = document.querySelector('.js-mode-toggle');
const modeToggleText = document.querySelector('.js-mode-toggle-text');
const modeStatusElement = document.querySelector('.js-mode-status');

const getCSSCustomProp = (propKey) => {
    let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

    if (response.length) {
        response = response.replace(/\'|"/g, '').trim();
    }

    return response;
};

const applySetting = passedSetting => {
    let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

    if (currentSetting) {
        document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
        setButtonLabelAndStatus(currentSetting);
    } else {
        setButtonLabelAndStatus(getCSSCustomProp(COLOR_MODE_KEY));
    }
}

const toggleSetting = () => {
    let currentSetting = localStorage.getItem(STORAGE_KEY);

    switch(currentSetting) {
        case null:
            currentSetting = getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
            break;
        case 'light':
            currentSetting = 'dark';
            break;
        case 'dark':
            currentSetting = 'light';
            break;
    }

    localStorage.setItem(STORAGE_KEY, currentSetting);

    return currentSetting;
}

const setButtonLabelAndStatus = currentSetting => {
    modeToggleText.innerText = `Enable ${currentSetting === 'dark' ? 'light' : 'dark'} mode`;
    modeStatusElement.innerText = `Color mode is now "${currentSetting}"`;
}

modeToggleButton.addEventListener('click', evt => {
    evt.preventDefault();
    applySetting(toggleSetting());
});

applySetting();

// To Top Button
const scrollToTopButton = document.getElementById('to-top');

const scrollFunction = () => {
    let y = window.scrollY;
    if (y > 0) {
        scrollToTopButton.className = "top show";
    } else {
        scrollToTopButton.className = "top hide";
    }
};

window.addEventListener("scroll", scrollFunction);

const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 5);
    }
};

scrollToTopButton.onclick = function(e) {
    e.preventDefault();
    scrollToTop();
}