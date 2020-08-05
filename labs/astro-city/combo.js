const balltop = document.getElementById('balltop');

gsap.set('#joystick', { transformOrigin: '50% 100%' });

const duration = 0.1;
const cancel = `-=${duration / 2}`;
const delay = `+=${duration * 2}`;

const upTl = (timeScale = 1) => {
    let tl = gsap.timeline({ defaults: { duration: duration * timeScale, ease: 'none' } });
    tl.to('#joystick', { rotate: 0, yPercent: 0, xPercent: 0 })
        .to('#balltop', { yPercent: -10 }, 0)
        .to('.dust-cover', { xPercent: 0, yPercent: -10 }, 0);
    return tl;
};

const rightTl = (timeScale = 1) => {
    let tl = gsap.timeline({ defaults: { duration: duration * timeScale, ease: 'none' } });
    tl.to('#joystick', { rotate: 18.5, yPercent: 0, xPercent: 2.5 })
        .to('#balltop', { yPercent: 0 }, 0)
        .to('.dust-cover', { xPercent: 5.0, yPercent: 0 }, 0);
    return tl;
};

const downTl = (timeScale = 1) => {
    let tl = gsap.timeline({ defaults: { duration: duration * timeScale, ease: 'none' } });
    tl.to('#joystick', { rotate: 0, yPercent: 10, xPercent: 0 })
        .to('#balltop', { yPercent: 6 }, 0)
        .to('.dust-cover', { xPercent: 0, yPercent: 10 }, 0);
    return tl;
};

const leftTl = (timeScale = 1) => {
    let tl = gsap.timeline({ defaults: { duration: duration * timeScale, ease: 'none' } });
    tl.to('#joystick', { rotate: -18.5, yPercent: 0, xPercent: -2.5 })
        .to('#balltop', { yPercent: 0 }, 0)
        .to('.dust-cover', { xPercent: -5.0, yPercent: 0 }, 0);
    return tl;
};

const neutralTl = (timeScale = 1) => {
    let tl = gsap.timeline({ defaults: { duration: duration * timeScale, ease: 'none' } });
    tl.to('#joystick', { rotate: 0, yPercent: 0, xPercent: 0 })
        .to('#balltop', { yPercent: 0 }, 0)
        .to('.dust-cover', { xPercent: 0, yPercent: 0 }, 0);
    return tl;
};

const downRightTl = (timeScale = 1) => {
    let tl = gsap.timeline({ defaults: { duration: duration * timeScale, ease: 'none' } });
    tl.to('#joystick', { rotate: 20, yPercent: 6, xPercent: 0 })
        .to('#balltop', { yPercent: 5 }, 0)
        .to('.dust-cover', { xPercent: 5.5, yPercent: 10 }, 0);
    return tl;
};

const downLeftTl = (timeScale = 1) => {
    let tl = gsap.timeline({ defaults: { duration: duration * timeScale, ease: 'none' } });
    tl.to('#joystick', { rotate: -20, yPercent: 6, xPercent: 0 })
        .to('#balltop', { yPercent: 5 }, 0)
        .to('.dust-cover', { xPercent: -5.5, yPercent: 10 }, 0);
    return tl;
};

const upRightTl = (timeScale = 1) => {
    let tl = gsap.timeline({ defaults: { duration: duration * timeScale, ease: 'none' } });
    tl.to('#joystick', { rotate: 17, yPercent: 0, xPercent: 0.5 })
        .to('#balltop', { yPercent: -10 }, 0)
        .to('.dust-cover', { xPercent: 4.0, yPercent: -10 }, 0);
    return tl;
};

const upLeftTl = (timeScale = 1) => {
    let tl = gsap.timeline({ defaults: { duration: duration * timeScale, ease: 'none' } });
    tl.to('#joystick', { rotate: -17, yPercent: 0, xPercent: -0.5 })
        .to('#balltop', { yPercent: -10 }, 0)
        .to('.dust-cover', { xPercent: -4.0, yPercent: -10 }, 0);
    return tl;
};

const attackButton = (attack, pause) => {
    let tl = gsap.timeline({ defaults: { duration: duration / 2 } });
    tl.to(`.${attack}.plunger`, { yPercent: 20 })
        .to(`.${attack}.plunger`, { yPercent: 0 }, `+=${pause}`);
    return tl;
};

const jab = (pause = 0) => attackButton('lp', pause);
const strong = (pause = 0) => attackButton('mp', pause);
const fierce = (pause = 0) => attackButton('hp', pause);
const short = (pause = 0) => attackButton('lk', pause);
const forward = (pause = 0) => attackButton('mk', pause);
const roundhouse = (pause = 0) => attackButton('hk', pause);

const specialMove = (motions, buttons) => {
    let tl = gsap.timeline();
    motions.forEach((motion, index) => {
        if (index === motion.length - 1) {
            tl.addLabel('lastMotion');
        }
        tl.add(motion);
    });
    buttons.forEach(button => tl.add(button, `lastMotion-=${duration / 2}`));
    tl.add(neutralTl());
    return tl;
};

const shoryuken = (...punches) => specialMove(
    [rightTl(0.75), downTl(0.75), downRightTl(0.75)], punches
);

const hadouken = (...punches) => specialMove(
    [downTl(0.75), rightTl(0.75)], punches
);

const tatsumaki = (...kicks) => specialMove(
    [downTl(), leftTl()], kicks
);

const ultra = () => specialMove(
    [downTl(0.65), rightTl(0.65), neutralTl(0.65), downTl(0.65), rightTl(0.65)], [jab(), strong(), fierce()]
);

const dash = (...btns) => specialMove(
    [rightTl(), neutralTl(), rightTl()], btns
);

const focusAttack = () => {
    let tl = gsap.timeline();
    tl.add(strong(duration * 2))
        .add(forward(duration * 2), 0);
    return tl;
};

const fadc = () => {
    let tl = gsap.timeline();
    tl.add(focusAttack())
        .add(dash(), "<");
    return tl;
}

const solarPlexus = () => specialMove(
    [rightTl()], [fierce()]
);

let combo1Tl = gsap.timeline({
    paused: true,
    onComplete: function () {
        this.seek(0).pause();
    }
});
let combo2Tl = gsap.timeline({
    paused: true,
    onComplete: function () {
        this.seek(0).pause();
    }
});
let combo3Tl = gsap.timeline({
    paused: true,
    onComplete: function () {
        this.seek(0).pause();
    }
});
let combo4Tl = gsap.timeline({
    paused: true,
    onComplete: function () {
        this.seek(0).pause();
    }
});


combo1Tl.add(solarPlexus())
    .add(downTl(), delay)
    .add(fierce(), cancel)
    .add(rightTl())
    .add(jab(), cancel)
    .add(neutralTl(), cancel)
    .add(fadc())
    .add(fierce())
    .add(shoryuken(jab()), cancel)
    .add(fadc())
    .add(ultra())
    .timeScale(0.50);

combo2Tl.add(jab())
    .add(jab())
    .add(leftTl())
    .add(neutralTl())
    .add(short())
    .add(fierce())
    .timeScale(0.50);

combo3Tl.add(fierce())
    .add(tatsumaki(fierce()), cancel)
    .add(strong())
    .add(fierce(), '<')
    .addLabel('fff')
    .add(downTl())
    .add(fierce(), cancel)
    .add(shoryuken(strong(), fierce()))
    .addLabel('ex-siesmo')
    .add(downTl())
    .add(rightTl())
    .add(upTl())
    .add(neutralTl())
    .add(rightTl())
    .add(strong(), '<')
    .add(forward(), '<')
    .add(neutralTl())
    .addLabel('sjc-fadc')
    .add(ultra())
    .timeScale(0.50);

combo4Tl.add(downRightTl())
    .add(downLeftTl())
    .add(jab(), '<0.05')
    .add(strong(), '<')
    .add(fierce(), '<-0.05')
    .add(downRightTl())
    .add(downLeftTl())
    .add(jab(), '<0.05')
    .add(fierce(), '<')
    .add(strong(), '<-0.05')
    .add(downRightTl())
    .add(strong(), '<')
    .add(jab(), '<0.05')
    .add(fierce(), '<-0.05')
    .add(downLeftTl())
    .add(strong(), '<')
    .add(downRightTl())
    .add(jab(), '<0.05')
    .add(fierce(), '<-0.05')
    .add(downLeftTl())
    .add(jab(), '<0.05')
    .add(downRightTl())
    .add(strong(), '<')
    .add(fierce(), '<-0.05')
    .add(downLeftTl())
    .add(jab(), '<0.05')
    .add(downRightTl())
    .add(strong(), '<')
    .add(fierce(), '<-0.05')
    .add(downLeftTl())
    .add(jab(), '<0.05')
    .add(downRightTl())
    .add(strong(), '<')
    .add(fierce(), '<-0.05')
    .add(downLeftTl())
    .add(downRightTl())
    .add(strong(), '<')
    .add(jab(), '<0.05')
    .add(downRightTl())
    .add(jab(), '<')
    .add(strong(), '<-0.05')
    .add(fierce(), '<0.05')
    .add(neutralTl(), '<')
    .timeScale(1.00);

const demo1 = document.getElementById('demo1');
demo1.addEventListener('click', () => {
    setTimeout(() => combo1Tl.play(), 800);
});
const demo2 = document.getElementById('demo2');
demo2.addEventListener('click', () => {
    setTimeout(() => combo2Tl.play(), 800);
});
const demo3 = document.getElementById('demo3');
demo3.addEventListener('click', () => {
    setTimeout(() => combo3Tl.play(), 800);
});
const demo4 = document.getElementById('demo4');
demo4.addEventListener('click', () => {
    setTimeout(() => combo4Tl.play(), 800);
});
