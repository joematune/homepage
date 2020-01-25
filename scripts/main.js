var noodle1 = createNoodle({
    element: document.querySelector("#tail-1"),
    startX: 0,
    startY: 15,
    numPoints: 14,
    tailLength: 90,
    wave: {
        speed: 0.3,
        xOffset: 1,
        yOffset: 3,
        xPhase: 0.3,
        yPhase: 0.5,
    }
});
var noodle2 = createNoodle({
    element: document.querySelector("#tail-2"),
    startX: 0,
    startY: 15,
    numPoints: 14,
    tailLength: 90,
    wave: {
        speed: 0.4,
        xOffset: 1,
        yOffset: 5,
        xPhase: 0.3,
        yPhase: 0.5,
    }
});
var noodle3 = createNoodle({
    element: document.querySelector("#tail-3"),
    startX: 0,
    startY: 15,
    numPoints: 14,
    tailLength: 90,
    wave: {
        speed: 0.5,
        xOffset: 1,
        yOffset: 5,
        xPhase: 0.3,
        yPhase: 0.5,
    }
});

gsap.set('.noodle-path', { x: -100 });

showSVG();

function showSVG() {
    var svgs = document.querySelectorAll('svg');
    for (i = 0; i < svgs.length; i++) {
        svgs[i].style.display = "inline";
    }
}
function createNoodle(options) {
    
    var points = [];
    var count = 0;
    
    var segmentSize = options.tailLength / options.numPoints;
    
    for (var i = 0; i < options.numPoints; i++) {
        
        var ratio = Power1.easeInOut(i / (options.numPoints - 1));
        
        points.push({
            x: 0,
            y: 0,
            ratio: ratio,
            startX: options.startX + i * segmentSize,
            startY: options.startY
        });
    }
    
    var tl = gsap.timeline({
        onUpdate: update,
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2
    })
        tl.to(options.wave, {
            duration: 3,
            speed: 0.2,
            xOffset: 3,
            yOffset: 10,
            ease: "none" // old ease Sine.easeInOut
        }, 2)
          .set({}, {}, "+=2");
    
    function update() {
        
        count -= options.wave.speed;
        
        for (var i = 0; i < options.numPoints; i++) {
            
            var p = points[i];
            
            p.x = p.startX + Math.cos((i * options.wave.xPhase) + count) * options.wave.xOffset * p.ratio;
            p.y = p.startY + Math.sin((i * options.wave.yPhase) + count) * options.wave.yOffset * p.ratio;
        }
        
        options.element.setAttribute("d", cardinalSpline(points));
    }    
};
function cardinalSpline(data, closed, tension) {

    if (data.length < 1) return "M0 0";
    if (tension == null) tension = 1;

    var size = data.length - (closed ? 0 : 1);
    var path = "M" + data[0].x + " " + data[0].y + " C";

    for (var i = 0; i < size; i++) {

        var p0, p1, p2, p3;

        if (closed) {
            p0 = data[(i - 1 + size) % size];
            p1 = data[i];
            p2 = data[(i + 1) % size];
            p3 = data[(i + 2) % size];

        } else {
            p0 = i == 0 ? data[0] : data[i - 1];
            p1 = data[i];
            p2 = data[i + 1];
            p3 = i == size - 1 ? p2 : data[i + 2];
        }

        var x1 = p1.x + (p2.x - p0.x) / 6 * tension;
        var y1 = p1.y + (p2.y - p0.y) / 6 * tension;

        var x2 = p2.x - (p3.x - p1.x) / 6 * tension;
        var y2 = p2.y - (p3.y - p1.y) / 6 * tension;

        path += " " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + p2.x + " " + p2.y;
    }

    return closed ? path + "z" : path;
}
function drawNoodle() {
    var tl = gsap.timeline({ defaults: { duration: 2 } });
        tl.to(".noodle-path", { x: "0" });
    return tl;
};
function undrawNoodle() {
    var tl = gsap.timeline({ defaults: { duration: 2 } });
    tl.to(".noodle-path", { x: -100 });
    return tl;
};
document.querySelector('img').addEventListener('mouseover', () => {
    drawNoodle();
})
document.querySelector('img').addEventListener('mouseout', () => {
    undrawNoodle();
})