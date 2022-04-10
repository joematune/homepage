const setVhUnit = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

// avoid FOUC
const showSVG = () => {
  let svgs = document.querySelectorAll("svg");
  for (i = 0; i < svgs.length; i++) {
    svgs[i].style.display = "block";
  }
};

// hide noodles
gsap.set(".noodle-path", { x: -100 });
showSVG();

const cardinalSpline = (data, closed, tension) => {
  if (data.length < 1) return "M0 0";
  if (tension == null) tension = 1;

  const size = data.length - (closed ? 0 : 1);
  let path = "M" + data[0].x + " " + data[0].y + " C";

  for (let i = 0; i < size; i++) {
    let p0, p1, p2, p3;

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

    const x1 = p1.x + ((p2.x - p0.x) / 6) * tension;
    const y1 = p1.y + ((p2.y - p0.y) / 6) * tension;

    const x2 = p2.x - ((p3.x - p1.x) / 6) * tension;
    const y2 = p2.y - ((p3.y - p1.y) / 6) * tension;

    path += " " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + p2.x + " " + p2.y;
  }

  return closed ? path + "z" : path;
};

const createNoodle = (options) => {
  let points = [];
  let count = 0;

  const segmentSize = options.tailLength / options.numPoints;

  for (let i = 0; i < options.numPoints; i++) {
    const ratio = Power1.easeInOut(i / (options.numPoints - 1));

    points.push({
      x: 0,
      y: 0,
      ratio: ratio,
      startX: options.startX + i * segmentSize,
      startY: options.startY,
    });
  }

  let tl = gsap.timeline({
    onUpdate: update,
    repeat: -1,
    yoyo: true,
    delay: Math.random() * 2,
  });
  tl.to(
    options.wave,
    {
      duration: 3,
      speed: 0.2,
      xOffset: 3,
      yOffset: 10,
      ease: "none", // old ease Sine.easeInOut
    },
    2
  ).set({}, {}, "+=2");

  function update() {
    count -= options.wave.speed;

    for (let i = 0; i < options.numPoints; i++) {
      let p = points[i];

      p.x =
        p.startX +
        Math.cos(i * options.wave.xPhase + count) *
          options.wave.xOffset *
          p.ratio;
      p.y =
        p.startY +
        Math.sin(i * options.wave.yPhase + count) *
          options.wave.yOffset *
          p.ratio;
    }

    options.element.setAttribute("d", cardinalSpline(points));
  }
};

createNoodle({
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
  },
});
createNoodle({
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
  },
});
createNoodle({
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
  },
});

// animate showing noodle
const drawNoodle = () => {
  let tl = gsap.timeline({ defaults: { duration: 4, delay: 1.5 } });
  tl.to(".noodle-path", { x: "-30" });
  return tl;
};

// animate noodles onload
document.addEventListener("DOMContentLoaded", drawNoodle());

window.addEventListener("resize", setVhUnit);
