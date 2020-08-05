const buttonMenu = document.querySelector('.menu');
buttonMenu.addEventListener('click', function () { this.classList.toggle('expanded') });

const buttonConfig = {
    'u': 'lp',
    'i': 'mp',
    'o': 'hp',
    'j': 'lk',
    'k': 'mk',
    'l': 'hk',
};

let directionKeys = {
    'w': false,
    'a': false,
    's': false,
    'd': false,
}

gsap.set('#joystick', { transformOrigin: '50% 100%' });

window.addEventListener('keydown', (e) => {
    // prevent repeated animations from held down key;
    if (e.repeat) return;
    // if keypress is an attackbutton, dispatch button click event
    if (buttonConfig[e.key]) {
        document.querySelector(`.${buttonConfig[e.key]}.btn`).dispatchEvent(new Event('mousedown'));
    } else if (Object.keys(directionKeys).includes(e.key)) {
        switch (e.key) {
            case 'w': // up
                directionKeys[e.key] = true;
                if (directionKeys['d']) { // if (right) upRight
                    upRight();
                } else if (directionKeys['a']) { // if (left) upLeft
                    upLeft();
                } else { // up
                    up();
                }
                break;
            case 'a': // left
                directionKeys[e.key] = true;
                if (directionKeys['s']) { // if (down) downLeft
                    downLeft();
                } else if (directionKeys['w']) { // if (up) upLeft
                    upLeft();
                } else { // left
                    left();
                }
                break;
            case 's': // down
                directionKeys[e.key] = true;
                if (directionKeys['d']) { // if (right) downRight
                    downRight();
                } else if (directionKeys['a']) { // if (left) downLeft
                    downLeft();
                } else { // down
                    down();
                }
                break;
            case 'd': // right
                directionKeys[e.key] = true;
                if (directionKeys['s']) { // if (down) downRight
                    downRight();
                } else if (directionKeys['w']) { // if (up) upRight
                    upRight();
                } else { // right
                    right();
                }
                break;
            default: console.log(`You've found the last Bantha herd.`);
        }
    }
});

const up = () => {
    gsap.to('#joystick', { rotate: 0, yPercent: 0, duration: 0.1 });
    gsap.to('#balltop', { yPercent: -10, duration: 0.1 });
    gsap.to('.dust-cover', { xPercent: 0, yPercent: -10, duration: 0.1 });
}

const left = () => {
    gsap.to('#joystick', { rotate: -20, yPercent: 0, duration: 0.1 });
    gsap.to('#balltop', { yPercent: 0, duration: 0.1 });
    gsap.to('.dust-cover', { xPercent: -3.5, yPercent: 0, duration: 0.1 });
}

const down = () => {
    gsap.to('#joystick', { rotate: 0, yPercent: 10, duration: 0.1 });
    gsap.to('#balltop', { yPercent: 5, duration: 0.1 });
    gsap.to('.dust-cover', { xPercent: 0, yPercent: 10, duration: 0.1 });
}

const right = () => {
    gsap.to('#joystick', { rotate: 20, yPercent: 0, duration: 0.1 });
    gsap.to('#balltop', { yPercent: 0, duration: 0.1 });
    gsap.to('.dust-cover', { xPercent: 3.5, yPercent: 0, duration: 0.1 });
}

const downRight = () => {
    gsap.to('#joystick', { rotate: 20, yPercent: 6, xPercent: 0, duration: 0.1 });
    gsap.to('#balltop', { yPercent: 5, duration: 0.1 });
    gsap.to('.dust-cover', { xPercent: 5.5, yPercent: 10, duration: 0.1 });
};

const downLeft = () => {
    gsap.to('#joystick', { rotate: -20, yPercent: 6, xPercent: 0, duration: 0.1 });
    gsap.to('#balltop', { yPercent: 5, duration: 0.1 });
    gsap.to('.dust-cover', { xPercent: -5.5, yPercent: 10, duration: 0.1 });
};

const upRight = () => {
    gsap.to('#joystick', { rotate: 17, yPercent: 0, xPercent: 0.5, duration: 0.1 });
    gsap.to('#balltop', { yPercent: -10, duration: 0.1 });
    gsap.to('.dust-cover', { xPercent: 4.0, yPercent: -10, duration: 0.1 });
};

const upLeft = () => {
    gsap.to('#joystick', { rotate: -17, yPercent: 0, xPercent: -0.5, duration: 0.1 });
    gsap.to('#balltop', { yPercent: -10, duration: 0.1 });
    gsap.to('.dust-cover', { xPercent: -4.0, yPercent: -10, duration: 0.1 });
};

window.addEventListener('keyup', (e) => {
    if (buttonConfig[e.key]) { // keyup is an attackbutton
        document.querySelector(`.${buttonConfig[e.key]}.btn`).dispatchEvent(new Event('mouseup'));
    } else if (Object.keys(directionKeys).includes(e.key)) { // keyup is a direction
        directionKeys[e.key] = false;
        if (!Object.values(directionKeys).includes(true)) {
            gsap.to('#joystick', { rotate: 0, yPercent: 0, duration: 0.1 });
            gsap.to('#balltop', { yPercent: 0, duration: 0.1 });
            gsap.to('.dust-cover', { xPercent: 0, yPercent: 0, duration: 0.1 });
        } else {
            // another key is down (could be more than one)
            if (directionKeys['w']) up();
            if (directionKeys['a']) left();
            if (directionKeys['s']) down();
            if (directionKeys['d']) right();
        }
    }
});

gsap.utils.toArray('.btn').forEach(btn => {
    let tl = gsap.timeline({ paused: true });
    tl.to(`.${btn.classList[0]}.plunger`, { duration: .03, yPercent: 20 });

    btn.addEventListener('mousedown', () => tl.play());
    btn.addEventListener('mouseup', () => tl.reverse());
    btn.addEventListener('mouseout', () => tl.reverse());
});
