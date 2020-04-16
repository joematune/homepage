console.log('happy');

// Setup master timeline for laughing head
let masterTimelime = gsap.timeline({ repeat: -1 });

function talking() {
    let tl = gsap.timeline({
        delay: 0.1,
        defaults: {
            transformOrigin: '50% 100%',
            ease: 'none',
            duration: 0.1
        }
    });
    tl.to('.top', { y: '-30%', rotate: -15, duration: 0.2, ease: 'easeOut' }, 'firstUp')
      .to('.bottom', { rotate: -3 }, 'firstUp')
      .to('.bottom', { rotate: 1 }, 'firstDown')
      .to('.top', { rotate: 8 })
      .to('.top', { y:   '-5%', rotate: 0 }, 'firstDown')
      .to('.top', { x: '-8%', y: '-30%', rotate: -20 }, 'secondUp')
      .to('.top', { x: 0 }, 'secondUp')
      .to('.bottom', { rotate: -2 }, 'secondUp')
      .to('.top', { y: '-5%', rotate: -8 }, 'secondDown')
      .to('.bottom', { rotate: 3 }, 'secondDown')
      .to('.top', { y: '-30%', rotate: 15 }, 'thirdUp')
      .to('.bottom', { rotate: -3 }, 'thirdUp')
      .to('.top', { x: '5%', rotate: -5 })
      .to('.top', { x: '10%', y: '-35%', rotate: 15 })
      .add('thirdDown')
      .to('.bottom', { rotate: 0 }, 'thirdDown')
      .to('.top', { x: '3%', y: '-5%', rotate: 3 }, 'thirdDown+=0.05')
      .to('.top', { x: '0%', y: '0%', rotate: 0 })
    return tl;
}

masterTimelime.add(talking());

let reset = {
    start: function () {
        mTimeline.play(0);
        // Tween head opacity to disappear
        gsap.to('.head', { duration: 2, opacity: 1.0 });
        this.timeoutID = undefined;
    },
    tween: function () {
        // Tween all SVG points to their starting position
        for (i = 0; i < points.length; i++) {
            let pt = points[i];
            gsap.to(pt, { x: m.coordinates[i].x, y: m.coordinates[i].y });
        }
        // Tween head opacity to disappear
        gsap.to('.head', { opacity: 0.05 });
    },
    setup: function () {
        mTimeline.pause();
        this.tween();
        if (typeof this.timeoutID === 'number') {
            this.cancel();
        }
        this.timeoutID = window.setTimeout(function (msg) {
            this.start(msg);
        }.bind(this), 50);
    },
    cancel: function () {
        window.clearTimeout(this.timeoutID);
    }
};

let logoSvg = document.querySelector('svg.logo');
let logoPolygon = document.querySelector('polygon.logo');

window.addEventListener('scroll', function (e) {
    reset.setup();
});

// Avoid FOUC
logoSvg.style.visibility = 'visible';

// Create masterTL for letter M
let mTimeline = gsap.timeline();

// Create SVGPoint from letter coordinates && append to polygon
function addPoint(coordinate, svg = logoSvg, poly = logoPolygon) {
    let point = svg.createSVGPoint();
    point.x = coordinate.x;
    point.y = coordinate.y;
    poly.points.appendItem(point);
    let tl = gsap.timeline({
        defaults: {
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        }
    });
    tl.to(point, { x: `-=${Math.sin(coordinate.x) * 13}`, duration: random(1, 3) });
    tl.to(point, { y: `-=${Math.sin(coordinate.y) * 19}`, duration: random(6, 9) });
    mTimeline.add(tl, 0);
    return point;
}

// Setup points creating capital M
const m = {
    coordinates: [
        { x: 5, y: 5 },
        { x: 30, y: 5 },
        { x: 50, y: 45 },
        { x: 70, y: 5 },
        { x: 95, y: 5 },
        { x: 95, y: 95 },
        { x: 70, y: 95 },
        { x: 70, y: 55 },
        { x: 50, y: 95 },
        { x: 30, y: 55 },
        { x: 30, y: 95 },
        { x: 5, y: 95 }
    ]
}

const points = [];

for (i = 0; i < m.coordinates.length; i++) {
    points.push(addPoint(m.coordinates[i]));
}

function random(min, max) {
    if (max == null) { max = min; min = 0; }
    if (min > max) { var tmp = min; min = max; max = tmp; }
    return min + (max - min) * Math.random();
}