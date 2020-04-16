let reset = {
    start: function () {
        mTimeline.play(0);
        this.timeoutID = undefined;
    },
    tween: function() {
        // Tween all SVG points to their starting position
        for (i = 0; i < points.length; i++) {
            let pt = points[i];
            gsap.to(pt, { x: m.coordinates[i].x, y: m.coordinates[i].y });
        }
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
let main = document.querySelector('main');

window.addEventListener('scroll', function (e) {
    reset.setup();
    if (document.documentElement.scrollTop === 0) {
        logoSvg.style.height = '48vh';
        logoSvg.style.width = '48vh';
        main.style.marginTop = '50vh';
    } else {
        logoSvg.style.height = '60px';
        logoSvg.style.width = '50px';
        main.style.marginTop = '10vh';
    }
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
    let tl = gsap.timeline({ defaults: {
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
    }});
    tl.to(point, { x: `-=${Math.sin(coordinate.x) * 13}`, duration: random(1, 3) });
    tl.to(point, { y: `-=${Math.sin(coordinate.y) * 19}`, duration: random(6, 9) });
    mTimeline.add(tl, 0);
    return point;
}

// Setup points creating capital M
const m = {
    coordinates: [
        { x:  5, y:  5 },
        { x: 30, y:  5 },
        { x: 50, y: 45 },
        { x: 70, y:  5 },
        { x: 95, y:  5 },
        { x: 95, y: 95 },
        { x: 70, y: 95 },
        { x: 70, y: 55 },
        { x: 50, y: 95 },
        { x: 30, y: 55 },
        { x: 30, y: 95 },
        { x:  5, y: 95 }
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