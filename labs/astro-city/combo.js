const balltop = document.getElementById('balltop');

gsap.set('#joystick', { transformOrigin: '50% 100%' });

const duration = 0.1;
const cancel = `-=${duration/2}`;
const delay = `+=${duration*2}`;

const up = (timeScale = 1) => {
    let tl = gsap.timeline({ defaults: { duration: duration*timeScale, ease: 'none' } });
    tl.to('#joystick', { rotate: 0, yPercent: 0, xPercent: 0 })
      .to('#balltop', { yPercent: -10 }, 0)
      .to('.dust-cover', { xPercent: 0, yPercent: -10 }, 0);
    return tl;
};

const right = (timeScale = 1) => {
    let tl = gsap.timeline({ defaults: { duration: duration*timeScale, ease: 'none' } });
    tl.to('#joystick', { rotate: 18.5, yPercent: 0, xPercent: 2.5 })
      .to('#balltop', { yPercent: 0 }, 0)
      .to('.dust-cover', { xPercent: 5.0, yPercent: 0 }, 0);
    return tl;
};

const down = (timeScale = 1) => {
    let tl = gsap.timeline({ defaults: { duration: duration*timeScale, ease: 'none' } });
    tl.to('#joystick', { rotate: 0, yPercent: 10, xPercent: 0 })
      .to('#balltop', { yPercent: 6 }, 0)
      .to('.dust-cover', { xPercent: 0, yPercent: 10 }, 0);
    return tl;
};

const left = (timeScale = 1) => {
    let tl = gsap.timeline({ defaults: { duration: duration*timeScale, ease: 'none' } });
    tl.to('#joystick', { rotate: -18.5, yPercent: 0, xPercent: -2.5 })
      .to('#balltop', { yPercent: 0 }, 0)
      .to('.dust-cover', { xPercent: -5.0, yPercent: 0 }, 0);
    return tl;
};

const neutral = (timeScale = 1) => {
    let tl = gsap.timeline({ defaults: { duration: duration*timeScale, ease: 'none' } });
    tl.to('#joystick', { rotate: 0, yPercent: 0, xPercent: 0 })
      .to('#balltop', { yPercent: 0 }, 0)
      .to('.dust-cover', { xPercent: 0, yPercent: 0 }, 0);
    return tl;
};

const downRight = (timeScale = 1) => {
    let tl = gsap.timeline({ defaults: { duration: duration*timeScale, ease: 'none' } });
    tl.to('#joystick', { rotate: 20, yPercent: 6, xPercent: 0 })
      .to('#balltop', { yPercent: 5 }, 0)
      .to('.dust-cover', { xPercent: 5.5, yPercent: 10 }, 0);
    return tl;
};

const downLeft = (timeScale = 1) => {
    let tl = gsap.timeline({ defaults: { duration: duration*timeScale, ease: 'none' } });
    tl.to('#joystick', { rotate: -20, yPercent: 6, xPercent: 0 })
      .to('#balltop', { yPercent: 5 }, 0)
      .to('.dust-cover', { xPercent: -5.5, yPercent: 10 }, 0);
    return tl;
};

const upRight = (timeScale = 1) => {
    let tl = gsap.timeline({ defaults: { duration: duration*timeScale, ease: 'none' } });
    tl.to('#joystick', { rotate: 17, yPercent: 0, xPercent: 0.5 })
        .to('#balltop', { yPercent: -10 }, 0)
        .to('.dust-cover', { xPercent: 4.0, yPercent: -10 }, 0);
    return tl;
};

const upLeft = (timeScale = 1) => {
    let tl = gsap.timeline({ defaults: { duration: duration*timeScale, ease: 'none' } });
    tl.to('#joystick', { rotate: -17, yPercent: 0, xPercent: -0.5 })
        .to('#balltop', { yPercent: -10 }, 0)
        .to('.dust-cover', { xPercent: -4.0, yPercent: -10 }, 0);
    return tl;
};

const attackButton = (attack, pause) => {
    let tl = gsap.timeline({ defaults: { duration: duration/2 } });
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
    buttons.forEach(button => tl.add(button, `lastMotion-=${duration/2}`));
    tl.add(neutral());
    return tl;
};

const shoryuken = (...punches) => specialMove(
    [right(0.75), down(0.75), downRight(0.75)], punches
    );

const hadouken = (...punches) => specialMove(
    [down(0.75), right(0.75)], punches
    );

const tatsumaki = (...kicks) => specialMove(
    [down(), left()], kicks
    );

const ultra = () => specialMove(
    [down(0.65), right(0.65), neutral(0.65), down(0.65), right(0.65)], [jab(), strong(), fierce()]
    );

const dash = (...btns) => specialMove(
    [right(), neutral(), right()], btns
    );

const focusAttack = () => {
    let tl = gsap.timeline();
    tl.add(strong(duration*2))
      .add(forward(duration*2), 0);
    return tl;
    };

const fadc = () => {
    let tl = gsap.timeline();
    tl.add(focusAttack())
      .add(dash(), "<");
    return tl;
}

const solarPlexus = () => specialMove(
    [right()], [fierce()]
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
        .add(down(), delay)
        .add(fierce(), cancel)
        .add(right())
        .add(jab(), cancel)
        .add(neutral(), cancel)
        .add(fadc())
        .add(fierce())
        .add(shoryuken(jab()), cancel)
        .add(fadc())
        .add(ultra())
        .timeScale(0.50);

combo2Tl.add(jab())
        .add(jab())
        .add(left())
        .add(neutral())
        .add(short())
        .add(fierce())
        .timeScale(0.50);

combo3Tl.add(fierce())
        .add(tatsumaki(fierce()), cancel)
        .add(strong())
        .add(fierce(), '<')
        .addLabel('fff')
        .add(down())
        .add(fierce(), cancel)
        .add(shoryuken(strong(), fierce()))
        .addLabel('ex-siesmo')
        .add(down())
        .add(right())
        .add(up())
        .add(neutral())
        .add(right())
        .add(strong(), '<')
        .add(forward(), '<')
        .add(neutral())
        .addLabel('sjc-fadc')
        .add(ultra())
        .timeScale(0.50);

combo4Tl.add(downRight())
        .add(downLeft())
        .add(jab(), '<0.05')
        .add(strong(), '<')
        .add(fierce(), '<-0.05')
        .add(downRight())
        .add(downLeft())
        .add(jab(), '<0.05')
        .add(fierce(), '<')
        .add(strong(), '<-0.05')
        .add(downRight())
        .add(strong(), '<')
        .add(jab(), '<0.05')
        .add(fierce(), '<-0.05')
        .add(downLeft())
        .add(strong(), '<')
        .add(downRight())
        .add(jab(), '<0.05')
        .add(fierce(), '<-0.05')
        .add(downLeft())
        .add(jab(), '<0.05')
        .add(downRight())
        .add(strong(), '<')
        .add(fierce(), '<-0.05')
        .add(downLeft())
        .add(jab(), '<0.05')
        .add(downRight())
        .add(strong(), '<')
        .add(fierce(), '<-0.05')
        .add(downLeft())
        .add(jab(), '<0.05')
        .add(downRight())
        .add(strong(), '<')
        .add(fierce(), '<-0.05')
        .add(downLeft())
        .add(downRight())
        .add(strong(), '<')
        .add(jab(), '<0.05')
        .add(downRight())
        .add(jab(), '<')
        .add(strong(), '<-0.05')
        .add(fierce(), '<0.05')
        .add(neutral(), '<')
        .timeScale(1.00);

const demo1 = document.getElementById('demo1');
demo1.addEventListener('click', () => {
    setTimeout(() => combo1Tl.play(), 500);
});
const demo2 = document.getElementById('demo2');
demo2.addEventListener('click', () => {
    setTimeout(() => combo2Tl.play(), 500);
});
const demo3 = document.getElementById('demo3');
demo3.addEventListener('click', () => {
    setTimeout(() => combo3Tl.play(), 500);
});
const demo4 = document.getElementById('demo4');
demo4.addEventListener('click', () => {
    setTimeout(() => combo4Tl.play(), 500);
});
