var img;

var canvasWebgl;

const size = 600;//triangle size
const duration = 3000;//loop duration

easeInOut = t => t > 0.5 ? 4*pow((t-1),3)+1 : 4*pow(t,3);

function preload() {
	img = loadImage("pexels-dazzle-jam-1164674.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	canvasWebgl = createGraphics(img.width + 300, img.height, WEBGL);
	canvasWebgl.stroke(255);
	canvasWebgl.strokeWeight(3);
	canvasWebgl.fill(0, 100);
	createIcosaedrum();
}

function draw() {
	background(230, 230, 125);
	
	//centralize
	var zoom = min(windowWidth/img.width, windowHeight/img.height);
	translate(width/2, height/2);
	scale(zoom);
	translate(-width/2, -height/2);
	translate((width-img.width)/2, (height-img.height)/2);
	
	//loop
	let loop = (millis()/duration)%1;
	let progress = easeInOut(loop);
	let dist = (1-progress) * size * 4 + size / 2;//progress * max distance + final size
	let curSize = min(size, dist);
	
	noStroke();
	fill(125, 255, 255);
	push();
		translate(img.width/2, img.height/2 - 100);
		rotate(PI * progress / 3);

		//center triangle
		beginShape();
		for(let a = 0; a < TWO_PI; a+=TWO_PI/3){
			let x = sin(a) * curSize;
			let y = cos(a) * curSize;
			vertex(x, y);
		}
		endShape();

		//lateral triangles
		for(let i = 0; i < 3; i++){
			let distX = sin(i/3 * TWO_PI + PI) * dist;
			let distY = cos(i/3 * TWO_PI + PI) * dist;
			beginShape();
			for(let a = 0; a < TWO_PI; a+=TWO_PI/3){
				let x = sin(a + PI) * curSize + distX;
				let y = cos(a + PI) * curSize + distY;
				vertex(x, y);
			}
			endShape();
		}
	pop();
	
	image(img, 0, 0);
	
	const face_dots = 30;
	for(let i = 0; i < 7; i++){
		fill(230, 230, 125+i*15);
		for(let a = HALF_PI; a <= PI + HALF_PI; a += TWO_PI / face_dots){
			let x = sin(a + PI + TWO_PI / face_dots * loop) * (60 + i * 20) + 330;
			let y = cos(a + PI + TWO_PI / face_dots * loop) * (130 + i * 30) + 350;
			var s = i+5;
			if(a == HALF_PI) s *= loop;
			if(a >= PI + HALF_PI) s *= 1-loop;
			circle(x, y, s);
		}
	}
	
	
	canvasWebgl.clear();
	canvasWebgl.push();
	canvasWebgl.rotateY(loop * TWO_PI);
	canvasWebgl.beginShape(TRIANGLES);
	for(var i = 0; i < triangles.length; i++) {
		canvasWebgl.vertex(triangles[i].v1.x, triangles[i].v1.y, triangles[i].v1.z);
		canvasWebgl.vertex(triangles[i].v2.x, triangles[i].v2.y, triangles[i].v2.z);
		canvasWebgl.vertex(triangles[i].v3.x, triangles[i].v3.y, triangles[i].v3.z);
	}
	canvasWebgl.endShape();
	canvasWebgl.pop();
	image(canvasWebgl, -150, 0);
}
