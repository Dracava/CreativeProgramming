var img;
var canvasWebgl;

const size = 600;
const duration = 3000;

let angle = 0;
let ellipseSize = 90;
let distance = 500;
let diameter = 700;
let minDiameter = 400;
let maxDiameter = 700;
let growthSpeed = 5;

easeInOut = t => t > 0.5 ? 4 * pow((t - 1), 3) + 1 : 4 * pow(t, 3);

function preload() {
  const uploadedImage = localStorage.getItem('uploadedImage');
  if (uploadedImage) {
    img = loadImage(uploadedImage);
  } else {
    img = loadImage("example2.png");
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  canvasWebgl = createGraphics(img.width + 300, img.height, WEBGL);
  canvasWebgl.stroke(255);
  canvasWebgl.strokeWeight(3);
  canvasWebgl.fill(0, 100);
  createIcosaedrum();

  selectedColor1 = localStorage.getItem('selectedColor1');
  selectedColor2 = localStorage.getItem('selectedColor2');
  selectedShape = localStorage.getItem('selectedShape');
}

function draw() {
	let c = frameCount % 255;
	fill(c);
  background(color(selectedColor1));

  var zoom = min(windowWidth / img.width, windowHeight / img.height);
  translate(width / 2, height / 2);
  scale(zoom);
  translate(-width / 2, -height / 2);
  translate((width - img.width) / 2, (height - img.height) / 2);

  let loop = (millis() / duration) % 1;
  let progress = easeInOut(loop);
  let dist = (1 - progress) * size * 4 + size / 2;
  let curSize = min(size, dist);

  noStroke();
  fill(color(selectedColor2));
  push();
  translate(img.width / 2, img.height / 2 - 100);
  rotate(PI * progress / 3);

if (selectedShape == "triangles") {    
	// center triangle
    beginShape();
    for (let a = 0; a < TWO_PI; a += TWO_PI / 3) {
      let x = sin(a) * curSize;
      let y = cos(a) * curSize;
      vertex(x, y);
    }
    endShape();

    // lateral triangles
    for (let i = 0; i < 3; i++) {
      let distX = sin(i / 3 * TWO_PI + PI) * dist;
      let distY = cos(i / 3 * TWO_PI + PI) * dist;
      beginShape();
      for (let a = 0; a < TWO_PI; a += TWO_PI / 3) {
        let x = sin(a + PI) * curSize + distX;
        let y = cos(a + PI) * curSize + distY;
        vertex(x, y);
      }
      endShape();
    }
  } else if (selectedShape == "squares"){
    // center rectangle
	rotate(PI / 4);
    rectMode(CENTER);
    rect(0, 0, curSize, curSize);

    // lateral rectangles
    for (let i = 0; i < 3; i++) {
      let distX = sin(i / 3 * TWO_PI + PI) * dist;
      let distY = cos(i / 3 * TWO_PI + PI) * dist;
      rect(distX, distY, curSize, curSize);
    }
  }
  else if (selectedShape == "circles"){
	  // Move ellipses in from outside the screen
	  let x = cos(angle) * distance;
	  let y = sin(angle) * distance;
	
	  // Draw rotating ellipses
	  ellipse(0, 0, diameter, diameter);

	  // Update diameter for pulsating effect
	  diameter = diameter + growthSpeed;
	
	  // Reset diameter if it exceeds the maximum
	  if (diameter > maxDiameter || diameter < minDiameter) {
		growthSpeed *= -1; // Reverse the growth direction
	  }
	  for (let i = 0; i < 9; i++) {
		ellipse(x, y, ellipseSize, ellipseSize);
		x = cos(angle + i * PI / 4) * distance;
		y = sin(angle + i * PI / 4) * distance;
		distance-=0.5;
	  }
	  // Update angle for animation
	  angle += 0.01;
}
  pop();

  tint(255, 220);
  image(img, 0, 0);
  noTint();

  canvasWebgl.clear();
  canvasWebgl.push();
  canvasWebgl.rotateY(loop * TWO_PI);
  canvasWebgl.beginShape(TRIANGLES);
  for (var i = 0; i < triangles.length; i++) {
    canvasWebgl.vertex(triangles[i].v1.x, triangles[i].v1.y, triangles[i].v1.z);
    canvasWebgl.vertex(triangles[i].v2.x, triangles[i].v2.y, triangles[i].v2.z);
    canvasWebgl.vertex(triangles[i].v3.x, triangles[i].v3.y, triangles[i].v3.z);
  }
  canvasWebgl.endShape();
  canvasWebgl.pop();
  image(canvasWebgl, -150, 0);
  
}

function keyPressed() {
	if (key === 's') {
	  saveGif('mySketch', 5);
	}
  }
