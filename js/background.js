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
    // small chance for big bois

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
        //noFill();
        //stroke(8);
        noStroke()
        //strokeWeight(15);

        //strokeWeight(random(7,10));
        //background(0);
        // scale = random(10,20)

        // x = random(0, windowWidth);
        // y = random(0, windowHeight);

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
                //var d = dist(tri.x + tri.s/2, tri.y-tri.s/2, other.x, other.y);
                if(tri.x >= windowWidth*0.28 && tri.x <= windowWidth*0.68)
                {
                    // break if intersecting text area
                    overlap = true;
                    break;
                }

                if(d < tri.s*0.9 + other.s * 0.9)
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

            if(rng < 2.5)
            {
                push();
                //strokeWeight(random(8,9.5));
                translate(_tri.x + tri.s/2, _tri.y-other.s/2);
                rotate(random(0, PI*2))
                translate(-_tri.x + -tri.s/2, -_tri.y-other.s/2);
                // translate(-_tri.x + -_tri.s/2, -(tri.y-_tri.s)/2);
                //translate(-tri.s/2, -tri.s/2);
                var rc = random(18,24);
                fill(rc,rc,24, 255 - (_tri.y/windowHeight*255));
                var biggerSize = _tri.s*1.2;
                var littleRandom = _tri.s*(random(0.8,1.2));
                triangle(_tri.x, _tri.y, _tri.x + biggerSize, _tri.y, _tri.x + biggerSize/2, _tri.y+littleRandom);

                pop();
            }
            else if(rng < 3.6)
            {
                //strokeWeight(random(7,8));
                var reverse = windowHeight-(0-_tri.y);
                //stroke(0,0,0,(_tri.y/windowHeight)*255);
                //stroke(0,0,0,(minmax(_tri.y/windowHeight)*255, 255, 0));
                var rc = random(18,24);
                fill(rc,rc,24, 255 - (_tri.y/windowHeight*255));
                ellipse(_tri.x, _tri.y, _tri.s, _tri.s);
                pop();
            }

            else if(rng >= 3.6)
            {
                push();
                //strokeWeight(random(6,7));
                translate(_tri.x + tri.s/2, _tri.y-other.s/2);
                rotate(random(0, PI*2))
                translate(-_tri.x + -tri.s/2, -_tri.y-other.s/2);
                // translate(-_tri.x + -_tri.s/2, -(tri.y-_tri.s)/2);
                //translate(-tri.s/2, -tri.s/2);
                var rc = random(18,24)
                fill(rc,rc,24, 255 - (_tri.y/windowHeight*255));
                rect(_tri.x, _tri.y, _tri.s*0.8, _tri.s);
                pop();
            }
        }

}

function minmax(val, max, min)
{
    return (val - min) / (max - min);
}