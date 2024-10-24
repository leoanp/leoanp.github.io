var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

// ------------------ Customizable Parameters ------------------ //

// Core animation values
var time = 0,
    velocity = 0.1,
    velocityTarget = 0.1;

// Visual customization
const MAX_OFFSET = 600;             // Controls the maximum distance from the center
const SPACING = 2;                  // Distance between points
const POINTS = MAX_OFFSET / SPACING -1;
const PEAK = MAX_OFFSET * 0.6;     // Affects the curvature of the y-axis distortion
const POINTS_PER_LAP = 1;           // Controls the spacing between rotations of points
const SHADOW_STRENGTH = 0;          // Strength of the shadow around the points
const NUM_ARMS = 4;                 // Number of spiral arms

// Appearance settings
const POINT_RADIUS = 2;             // Size of the individual points
const POINT_COLOR = '#fff';         // Color of the points
const SHADOW_COLOR = '#fff';        // Color of the point shadows

// Spiral appearance control
const VERTICAL_DISTORTION = 280;    // How much the spiral points curve upward (affects the y-axis distortion)
const VERTICAL_EXPANSION = 200;     // How much the spiral expands vertically as the points move outward
const HORIZONTAL_EXPANSION = 0;   // Horizontal expansion of the points; larger values create a wider spiral

// Center position of the spiral
const CENTER_X = window.innerWidth * (2 / 3);  // Horizontal center (2/3 to the left)
const CENTER_Y = window.innerHeight * (2 / 3);       // Vertical center (middle of the screen)

// ------------------ End of Customizable Parameters ------------------ //

// Internal variables for canvas size
var width, height, lastX, lastY;

setup();

function setup() {
  resize();
  step();

  window.addEventListener('resize', resize);
  window.addEventListener('mousedown', onMouseDown);
  document.addEventListener('touchstart', onTouchStart);
}

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function step() {
  time += velocity;
  velocity += (velocityTarget - velocity) * 0.3; // Smooth velocity transition

  clear();
  render();

  requestAnimationFrame(step);
}

function clear() {
  context.clearRect(0, 0, width, height); // Clear canvas for each frame
}

function render() {
  // Use the customizable center position for the spiral
  const cx = CENTER_X;
  const cy = CENTER_Y;

  context.globalCompositeOperation = 'lighter'; // Blend mode for glowy effect
  context.fillStyle = POINT_COLOR;              // Set the point color
  context.shadowColor = SHADOW_COLOR;           // Set the shadow color

  // Loop through multiple spiral arms (NUM_ARMS)
  for (let arm = 0; arm < NUM_ARMS; arm++) {
    const angleOffset = (Math.PI * 2 / NUM_ARMS) * arm; // Offset each arm by a fraction of a full rotation

    for (let i = POINTS; i > 0; i--) {
      const value = i * SPACING + (time % SPACING);

      const ax = Math.sin((value / POINTS_PER_LAP) + angleOffset) * Math.PI;
      const ay = Math.cos((value / POINTS_PER_LAP) + angleOffset) * Math.PI;

      const x = ax * value;
      let y = ay * value * 0.2;

      const o = 1 - (Math.min(value, PEAK) / PEAK); // Opacity and shadow strength adjuster

      // Apply vertical distortion
      y += Math.pow(o, 2) * VERTICAL_DISTORTION; // Distorts the spiral upward

      // Apply vertical expansion
      y += VERTICAL_EXPANSION * value / MAX_OFFSET;

      // Apply horizontal expansion
      y += (x / cx) * width * HORIZONTAL_EXPANSION;

      // Set opacity and shadow for each point
      context.globalAlpha = 1 - (value / MAX_OFFSET);
      context.shadowBlur = SHADOW_STRENGTH * o;

      // Draw the point (small circle)
      context.beginPath();
      context.arc(cx + x, cy + y, POINT_RADIUS, 0, 2 * Math.PI); // Point size
      context.fill(); // Fill the point
    }
  }
}

// ------------------ Interaction Handlers (Mouse & Touch) ------------------ //

function onMouseDown(event) {
  lastX = event.clientX;
  lastY = event.clientY;

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

function onMouseMove(event) {
  const vx = (event.clientX - lastX) / 100;
  const vy = (event.clientY - lastY) / 100;

  velocityTarget = (event.clientY < height / 2 ? -vx : vx) + (event.clientX > width / 2 ? -vy : vy);

  lastX = event.clientX;
  lastY = event.clientY;
}

function onMouseUp() {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}

function onTouchStart(event) {
  event.preventDefault();
  lastX = event.touches[0].clientX;
  lastY = event.touches[0].clientY;

  document.addEventListener('touchmove', onTouchMove);
  document.addEventListener('touchend', onTouchEnd);
}

function onTouchMove(event) {
  const vx = (event.touches[0].clientX - lastX) / 100;
  const vy = (event.touches[0].clientY - lastY) / 100;

  velocityTarget = (event.touches[0].clientY < height / 2 ? -vx : vx) + (event.touches[0].clientX > width / 2 ? -vy : vy);

  lastX = event.touches[0].clientX;
  lastY = event.touches[0].clientY;
}

function onTouchEnd() {
  document.removeEventListener('touchmove', onTouchMove);
  document.removeEventListener('touchend', onTouchEnd);
}
