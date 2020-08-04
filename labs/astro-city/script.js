const buttonMenu = document.querySelector('.menu');
buttonMenu.addEventListener('click', function() { this.classList.toggle('expanded') });

const buttonConfig = {
    'u': 'lp',
    'i': 'mp',
    'o': 'hp',
    'j': 'lk',
    'k': 'mk',
    'l': 'hk'
};

let directionKeyIsDown = {
    'w': false,
    'd': false,
    's': false,
    'a': false
}

gsap.set('#joystick', { transformOrigin: '50% 100%'});

window.addEventListener('keydown', (e) => {
    if (e.repeat) return; // prevent repeated animations from held down key;
    if (buttonConfig[e.key]) {
        document.querySelector(`.${buttonConfig[e.key]}.btn`).dispatchEvent(new Event('mousedown'));
    } else if (Object.keys(directionKeyIsDown).includes(e.key)) {
        switch (e.key) {
            case 'w': // up
                directionKeyIsDown[e.key] = true;
                gsap.to('#joystick', { rotate: 0, yPercent: 0, duration: 0.1 });
                gsap.to('#balltop', { yPercent: -10, duration: 0.1 });
                gsap.to('.dust-cover', { xPercent: 0, yPercent: -10, duration: 0.1 });
                break;
            case 'd': // right
                directionKeyIsDown[e.key] = true;
                gsap.to('#joystick', { rotate: 20, yPercent: 0, duration: 0.1 });
                gsap.to('#balltop', { yPercent: 0, duration: 0.1 });
                gsap.to('.dust-cover', { xPercent: 3.5, yPercent: 0, duration: 0.1 });
                break;
            case 's': //down
                directionKeyIsDown[e.key] = true;
                gsap.to('#joystick', { rotate: 0, yPercent: 10, duration: 0.1 });
                gsap.to('#balltop', { yPercent: 5, duration: 0.1 });
                gsap.to('.dust-cover', { xPercent: 0, yPercent: 10, duration: 0.1 });
                break;
            case 'a': // left
                directionKeyIsDown[e.key] = true;
                gsap.to('#joystick', { rotate: -20, yPercent: 0, duration: 0.1 });
                gsap.to('#balltop', { yPercent: 0, duration: 0.1 });
                gsap.to('.dust-cover', { xPercent: -3.5, yPercent: 0, duration: 0.1 });
                break;
            default: console.log(`You've found the last Bantha herd.`);
        }
    }
});

window.addEventListener('keyup', (e) => {
    if (buttonConfig[e.key]) {
        document.querySelector(`.${buttonConfig[e.key]}.btn`).dispatchEvent(new Event('mouseup'));
    } else if (Object.keys(directionKeyIsDown).includes(e.key)) {
        directionKeyIsDown[e.key] = false;
        if (!Object.values(directionKeyIsDown).includes(true)) {
            gsap.to('#joystick', { rotate: 0, yPercent: 0, duration: 0.1 });
            gsap.to('#balltop', { yPercent: 0, duration: 0.1 });
            gsap.to('.dust-cover', { xPercent: 0, yPercent: 0, duration: 0.1 });
        }
    }
});

gsap.utils.toArray('.btn').forEach(btn => {
    let tl = gsap.timeline({ paused: true });
    tl.to(`.${btn.classList[0]}.plunger`, { duration: .03, yPercent: 20 });

    btn.addEventListener('mousedown', () => tl.play());
    btn.addEventListener('mouseup',   () => tl.reverse());
    btn.addEventListener('mouseout',  () => tl.reverse());
});
