// Get Canvas from HTML
var canvas = document.querySelector("canvas");
// Define Width and Height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Variables
var c = canvas.getContext("2d");
var gridcellArray = [];
var cellwidth = 50;
var cellXcount = 40;
var cellYcount = 20;
var rgbaColor = "rgba(255,0,0, 0.25)";
var distancetraveled = 0;
// Grid Object
class Gridcell {
    constructor(x, y, dx, rgba) {
        //Internal Variables
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.rgba = rgba;
        //Draw
        this.draw = function() {
            //Linha Vertical
            c.beginPath();
            c.moveTo(this.x, this.y);
            c.lineTo(this.x + 10, this.y);
            c.strokeStyle = rgba;
            c.stroke();
            // Linha Horizontal
            c.beginPath();
            c.moveTo(this.x + 5, this.y - 5);
            c.lineTo(this.x + 5, this.y + 5);
            c.strokeStyle = rgba;
            c.stroke();
        };
        //Update
        this.update = function() {
            this.x += this.dx;
            this.draw();
        };
    }
}

// Interactivity

// Grid Spawn

for (var d = 0; d < cellYcount; d++) {
    for (var i = 0.5; i < cellXcount; i++) {
        //Left to right cells
        gridcellArray.push(
            new Gridcell(i * cellwidth, d * cellwidth, 0.3, rgbaColor)
        );
        //Right to left cells
        gridcellArray.push(
            new Gridcell(-i * cellwidth, d * cellwidth, 0.3, rgbaColor)
        );
    }
}

// Animate
function animate() {
    //Loop
    requestAnimationFrame(animate);
    //Clear Canvas
    c.clearRect(0, 0, innerWidth, innerHeight);
    // Animate Grid
    for (var i = 0; i < gridcellArray.length; i++) {
        gridcellArray[i].update();
    }
    distancetraveled += 0.3;
}

// Change background
var gridstep = 0;

document.getElementById("findout").onclick = function changebackground() {
    if (gridstep < 1) {
        gridcellArray.length = 0;
        document.querySelector("canvas").style.backgroundColor = "#FF5050";
        document.getElementById("thebest").style.color = "#fff";
        document.getElementById("the").style.color = "#fff";
        document.getElementById("world").style.color = "#fff";
        document.getElementById("findout").style.color = "#fff";
        document.getElementById("after").style.backgroundColor = "#fff";
        document.getElementById("findout").classList.add("outanimation");

        rgbaColor = "rgba(255,255,255, 1)";
        for (var d = 0; d < cellYcount; d++) {
            for (var i = 0.5; i < cellXcount; i++) {
                //Left to right cells
                gridcellArray.push(
                    new Gridcell(
                        i * cellwidth + distancetraveled,
                        d * cellwidth,
                        0.3,
                        rgbaColor
                    )
                );
                //Right to left cells
                gridcellArray.push(
                    new Gridcell(-i * cellwidth + distancetraveled,
                        d * cellwidth,
                        0.3,
                        rgbaColor
                    )
                );
            }
        }
        gridstep++;
    }
};

// Calling all functions
animate();