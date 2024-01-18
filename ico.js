const radius = 450;
var subdivisions = 1;//starting from 0

var triangles = [];
function createIcosaedrum(){
	var X = .525731112119133606*radius;
	var Z = .850650808352039932*radius;
	var vdata = [    
		createVector(-X, 0.0, Z), 
		createVector(X, 0.0, Z),
		createVector(-X, 0.0, -Z),
		createVector(X, 0.0, -Z),    
		createVector(0.0, Z, X),
		createVector(0.0, Z, -X),
		createVector(0.0, -Z, X),
		createVector(0.0, -Z, -X),    
		createVector(Z, X, 0.0),
		createVector(-Z, X, 0.0),
		createVector(Z, -X, 0.0),
		createVector(-Z, -X, 0.0) 
	];
	subdivide(vdata[0],		vdata[4],		vdata[1], 	subdivisions);
	subdivide(vdata[0],		vdata[9],		vdata[4], 	subdivisions);
	subdivide(vdata[9],		vdata[5],		vdata[4], 	subdivisions);
	subdivide(vdata[4],		vdata[5],		vdata[8], 	subdivisions);
	subdivide(vdata[4],		vdata[8],		vdata[1], 	subdivisions);
	subdivide(vdata[8],		vdata[10],	vdata[1], 	subdivisions);
	subdivide(vdata[8],		vdata[3],		vdata[10], 	subdivisions);
	subdivide(vdata[5],		vdata[3],		vdata[8], 	subdivisions);
	subdivide(vdata[5],		vdata[2],		vdata[3], 	subdivisions);
	subdivide(vdata[2],		vdata[7],		vdata[3], 	subdivisions);
	subdivide(vdata[7],		vdata[10],	vdata[3], 	subdivisions);
	subdivide(vdata[7],		vdata[6],		vdata[10], 	subdivisions);
	subdivide(vdata[7],		vdata[11],	vdata[6], 	subdivisions);
	subdivide(vdata[11],	vdata[0],		vdata[6], 	subdivisions);
	subdivide(vdata[0],		vdata[1],		vdata[6], 	subdivisions);
	subdivide(vdata[6],		vdata[1],		vdata[10], 	subdivisions);
	subdivide(vdata[9],		vdata[0],		vdata[11], 	subdivisions);
	subdivide(vdata[9],		vdata[11],	vdata[2], 	subdivisions);
	subdivide(vdata[9],		vdata[2],		vdata[5], 	subdivisions);
	subdivide(vdata[7],		vdata[2],		vdata[11], 	subdivisions);	
}

function subdivide(v1, v2, v3, depth)
{
	if (depth == 0 || random()>0.5) {
		triangles.push({v1:v1, v2:v2, v3:v3});
		return;
	}
	var v12 = p5.Vector.add(v1, v2);
	var v23 = p5.Vector.add(v2, v3);
	var v31 = p5.Vector.add(v3, v1);
	v12.normalize();
	v23.normalize();
	v31.normalize();
	v12.mult(radius);
	v23.mult(radius);
	v31.mult(radius);
	subdivide(v1, v12, v31, depth-1);
	subdivide(v2, v23, v12, depth-1);
	subdivide(v3, v31, v23, depth-1);
	subdivide(v12, v23, v31, depth-1);
}

function function mousePressed(){
	triangles = [];
	subdivisions = (subdivisions+1)%4;
	createIcosaedrum();
}
