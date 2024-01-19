let selectedColor1, selectedColor2, uploadedImage, selectedShape;
let introduction = "Generate an animation with your yourself. Select your two favorite colors, then a preferred shape. Lastly, upload an image of yourself without background (png)."

function setup() {
  noCanvas();
  

  // Color selection form
  let colorSelectionDiv = createDiv();
  colorSelectionDiv.id('colorSelection');

  createElement('h2', 'Personal animation').parent(colorSelectionDiv);
  createP(introduction).parent(colorSelectionDiv); // Add this line to create and display the paragraph

  // First color selection dropdown
  let color1Select = createSelect();
  color1Select.id('color1');
  color1Select.option('yellow');
  color1Select.option('red');
  color1Select.option('green');
  color1Select.option('blue');
  color1Select.option('purple');
  color1Select.option('white');
  color1Select.option('black');
  color1Select.option('cyan');
  color1Select.option('magenta');
  color1Select.option('gray');
  color1Select.option('orange');
  color1Select.option('pink');
  color1Select.option('brown');
  
  createElement('label', 'Pick a color:').attribute('for', 'color1').parent(colorSelectionDiv);
  color1Select.parent(colorSelectionDiv);

  // Second color selection dropdown
  let color2Select = createSelect();
  color2Select.id('color2');
  color2Select.option('purple');
  color2Select.option('red');
  color2Select.option('green');
  color2Select.option('blue');
  color2Select.option('yellow');
  color2Select.option('white');
  color2Select.option('black');
  color2Select.option('cyan');
  color2Select.option('magenta');
  color2Select.option('gray');
  color2Select.option('orange');
  color2Select.option('pink');
  color2Select.option('brown');  
  createElement('label', 'Pick a second color:').attribute('for', 'color2').parent(colorSelectionDiv);
  color2Select.parent(colorSelectionDiv);

  // Shape selection dropdown
  let shapeSelect = createSelect();
  shapeSelect.id('shape');
  shapeSelect.option('triangles');
  shapeSelect.option('squares');
  shapeSelect.option('circles');
  createElement('label', 'Select a shape:').attribute('for', 'shape').parent(colorSelectionDiv);
  shapeSelect.parent(colorSelectionDiv);

  createElement('label', 'Upload a picture:').parent(colorSelectionDiv);
  let uploadButton = createFileInput(handleFile);
  uploadButton.parent(colorSelectionDiv);

  // Next page button
  let nextPageButton = createButton('Generate animation');
  nextPageButton.mousePressed(nextPage);
  nextPageButton.parent(colorSelectionDiv);
}

function handleFile(file) {
    if (file.type === 'image') {
      // Load the selected image and convert it to Base64
      loadImage(file.data, (img) => {
        uploadedImage = img; // Store the image object
        let imgBase64 = uploadedImage.canvas.toDataURL();
        localStorage.setItem('uploadedImage', imgBase64);
      });
    } else {
      alert('Please upload an image file (e.g., JPG, PNG).');
    }
  }

function nextPage() {
  selectedColor1 = select('#color1').value();
  selectedColor2 = select('#color2').value();
    selectedShape = select('#shape').value();
  
  // Save the selected colors in localStorage for use on the next page
  localStorage.setItem('selectedColor1', selectedColor1);
  localStorage.setItem('selectedColor2', selectedColor2);
  localStorage.setItem('selectedShape', selectedShape);

  // Redirect to the next page
  window.location.href = 'tool.html';
}
