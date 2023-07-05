// Create a new sketch
new p5(function(sketch) {

  var bubbles = [];
  var themes = [
    new Theme('Black and White', 255, ['#fafafa', '#adadad']),
    new Theme('White and Black', 0, ['#131313', '#222222', '#333333']),
    new Theme('Multi','#FAFAFA' , ['#0129E2', '#E2B001', '#E23821']),
    new Theme('Fidenza Cream', '#E9E4D9', ['#1A1A1A']),
    new Theme('Fidenza Main', '#E5DFD7',['#513E30', '#382B21','#BED7CD', '#CB5858', '#F5D276', '#85A7BD', '#223255', '#52A391', '#ECB4A3', '#D88044']),
    new Theme('Fidenza Purple', '#3D364B', ['#2B2931', '#95B296', '#D9948C', '#7D737E']),
    new Theme('Blue', '#7AD7F0', ['#92DFF3', '#B7E9F7', '#DBF3FA', '#F5FCFF']),
    new Theme('Fidenza Night', '#1A1A1A', ['#383939', '#212222', '#282828']),
    new Theme('Peach', '#C21E57', ['#F34A93', '#E73F84', '#DA3475', '#CE2966', '#FF55A2']),
    new Theme('XCOPY Guzzler', '#E5E8E7', ['#212121', '#5E37D0', '#DADEDC']),
    new Theme('Orange', '#FF6200', ['#FD7F2C', '#FD9346', '#FDA766', '#FDB777']),
    new Theme('Chromie', '#F5F5F5',['#00ECFD', '#0076FC','#0101FC', '#9500FD', '#EF00FE', '#FE0081', '#FE0024', '#FE7101', '#FEAA00', '#F6FD01', '#80FE01', '#00FE1E']),
    new Theme('Pepe Grass', '#19A919', ['#F7191E', '#3120F4', '#FAFAFA', '#0A0D0A']),
    new Theme('Marilyn', '#8bc8bf', ['#f5969d', '#e6bf3a', '#be321d', '#98b8c6']),
    new Theme('Soup', '#f2f2f2', ['#a6202a', '#2a1714', '#a6661f']),
    new Theme('God is Typing', '#f22fc5', ['#c6f708', '#400066']),
    new Theme('Right Click Save As', '#000e12', ['#5a38bb', '#e14fa5', '#301c51', '#82c68e']),
    new Theme('JPEG Summer', '#086bb0', ['#ef1b6b', '#e4f7f7', '#17336e', '#010714']),
    new Theme('Zombie Punk', '#648596', ['#7da36a', '#c9c9c9', '#000000', '#ad2160', '#8c0d5c', '#690c45']),
    new Theme('Noun', '#e1d7d5', ['#d2220b', '#d08c12', '#b41a5e', '#fffbff', '#030000', '#c16711', '#fee93f']),
    new Theme('Convergence', '#dcbc9b', ['#eb562e', '#d7b249', '#1b4e83', '#e3d2c2', '#171609', '#9ba9af', '#fe7c6f', '#b7af67']),
    new Theme('Guernica', '#141415', ['#56594a', '#dcd7d4', '#a09c98', '#131215', '#beada4', '#333931']),
    new Theme('Les Demoiselles', '#aa775a', ['#bd9a85', '#a36465', '#b18386', '#427586', '#446e52', '#448592', '#5b4545', '#a6a6a1']),
    new Theme('Charmander', '#f5f5f5', ['#ee9664', '#ddd894', '#bbbd51', '#a7663e', '#e3715e', '#e0cb6e']),
    new Theme('Pikachu', '#f5f5f5', ['#ffd63f', '#ef4f35', '#272727', '#903f21']),
    new Theme('Squirtle', '#f5f5f5', ['#ade1df', '#35a5a8', '#dddf95', '#dc988b', '#c86435']),
    new Theme('Bulbasaur', '#f5f5f5', ['#8fdcc8', '#178a9c', '#d69d91', '#9cc799', '#398254']),
    new Theme('Akatsuki', '#2d3038', ['#983c42', '#f5f5f5']),
    new Theme('Vitruvian Man', '#e1b982', ['#87270b', '#ca592f', '#986525', '#e5bd89']),
    new Theme('Starry Night', '#2e42a2', ['#6084b7', '#476ea4', '#bca824', '#fee93fff', '#162826', '#11141c', '#fdf016']),
    new Theme('The Great Wave', '#0a1a42', ['#4f6a83', '#97b2bf', '#cfb67c', '#f3efde', '#e1c8a9', '#a29a92']),
  
  ];
  var currentTheme = sketch.random(themes); // Randomly select a theme

  // Theme class
  function Theme(name, backgroundColor, colors) {
    this.name = name;
    this.backgroundColor = backgroundColor;
    this.colors = colors;
  }

  // Setup function runs once
  sketch.setup = function() {
    // Create a canvas
    sketch.createCanvas(3200, 4000); // Set the size of the canvas
    sketch.background(currentTheme.backgroundColor); // Set background color from current theme

    // Create a number of bubbles
    for (var i = 0; i < 10000; i++) { // Number of bubbles
      var x = sketch.random(sketch.width);
      var y = sketch.random(sketch.height);
      var radius = sketch.random(5, 1000); // Random radius between 5 and 1000
      var filled = sketch.random() < .66; // 66% chance of being filled
      var strokeWeight = sketch.random(1, 10); // Random stroke weight between 1 and 10
      var color = sketch.random(currentTheme.colors); // Choose a random color from the current theme
      var bubble = new Bubble(sketch, x, y, radius, filled, strokeWeight, color);

      // Ensure the bubble does not overlap with others
      var overlapping = false;
      for (var j = 0; j < bubbles.length; j++) {
        var other = bubbles[j];
        var d = sketch.dist(bubble.x, bubble.y, other.x, other.y);
        if (d < bubble.radius + other.radius) {
          overlapping = true;
          break;
        }
      }

      // Only add the bubble if it's not overlapping
      if (!overlapping) {
        bubbles.push(bubble);
      }
    }
  };

  // Draw function runs in a loop
  sketch.draw = function() {
    sketch.background(currentTheme.backgroundColor); // Redraw the background each time

    // Draw all bubbles
    for (var i = 0; i < bubbles.length; i++) {
      bubbles[i].display();
    }
  };

});

// Bubble class
function Bubble(sketch, x, y, radius, filled, strokeWeight, color) {
  this.sketch = sketch;
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.filled = filled;
  this.strokeWeight = strokeWeight;
  this.color = color;
  this.shadow = sketch.random() < 0.66; // 66% chance of having a shadow

  this.display = function() {
    this.sketch.strokeWeight(this.strokeWeight); // Set stroke weight
    this.sketch.stroke(this.color); // Set stroke color from bubble color
    if (this.filled) {
      this.sketch.fill(this.color); // Set fill color from bubble color
    } else {
      this.sketch.noFill(); // No fill color
    }

    // If the bubble has a shadow
    if (this.shadow) {
      this.sketch.push(); // Save current drawing state
      this.sketch.fill(0, 30); // Semi-transparent black
      this.sketch.ellipse(this.x + this.radius / 4, this.y + this.radius / 4, this.radius * 2, this.radius * 2); // Draw shadow
      this.sketch.pop(); // Restore drawing state
    }

    // Draw the bubble
    this.sketch.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  };
}
