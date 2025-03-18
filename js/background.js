/*
Hey, 
now there's a hoopy frood who really knows where their towel is!
*/

var canvas;
var tris = [];

function windowResized()
{
    resizeCanvas(windowWidth, windowHeight);
    tris.length=0;
}

function setup()
{
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0)
    canvas.style('z-index', '-1')
    noLoop();
}

var cachedTris = [];

function calculateSize()
{
    // allow a small chance for big shapes
    x = random (1, 100);
    if(x > 81)
    {
        return random(90, 160);
    }

    else
    {
        return random(25,50);
    }
}

function draw()
{

    if (windowWidth > 700){
    let xc = 200, yc = 220;
        for (var i = 0; i < 200; i++)
        {
            var tri = {
                x: random(0, displayWidth),
                y: random(0, displayHeight),
                s: calculateSize()
            };

            var overlap = false;
            for (var b = 0; b < tris.length; b++)
            {
                var other = tris[b]
                // find distance between tri midpoints
                var d = dist(tri.x, tri.y, other.x, other.y);

                if(tri.x >= windowWidth*0.27 && tri.x <= windowWidth*0.67)
                {
                    // break if intersecting text area
                    overlap = true;
                    break;
                }

                if(d < tri.s + other.s)
                {
                    overlap = true;
                    break;
                }
            }
            if(!overlap)
            {
                tris.push(tri)
            }
        }

        for (var j = 0; j < tris.length; j++) {
            _tri = tris[j];

            rng = random(1,4)
            
            // add triangles
            if(rng < 2.5)
            {
                push();
                translate(_tri.x, _tri.y);
                rotate(random(0, PI*2))
                scale(_tri.s/2);
                stroke(0,0,0, 255 - (_tri.y/windowHeight*255));
                strokeWeight(0.02);
                var rc = random(xc,yc);
                fill(rc,rc,24, 255 - (_tri.y/windowHeight*255));
                triangle(-0.866, 0.5, 0.866, 0.5, 0, -1);
                pop();
            }

            // add ellipses
            else if(rng < 3.6)
            {
                push();
                var reverse = windowHeight-(0-_tri.y);
                stroke(0,0,0, 255 - (_tri.y/windowHeight*255));
                strokeWeight(1);
                var rc = random(xc,yc);
                fill(rc,rc,24, 255 - (_tri.y/windowHeight*255));
                ellipse(_tri.x, _tri.y, _tri.s, _tri.s);
                pop();
            }

            // add rects
            else if(rng >= 3.6)
            {
                push();
                translate(_tri.x, _tri.y);
                rotate(random(0, PI*2))
                stroke(0,0,0, 255 - (_tri.y/windowHeight*255));
                strokeWeight(1);
                var rc = random(xc,yc)
                fill(rc,rc,24, 255 - (_tri.y/windowHeight*255));
                rect(0, 0, _tri.s*0.8, _tri.s);
                pop();
            }
        }
    }

}

function minmax(val, max, min) 
{ 
    return (val - min) / (max - min); 
}