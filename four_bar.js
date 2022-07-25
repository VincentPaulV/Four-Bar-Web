/*________________ Written by Vincent Paul V _______________*/

/*                  HTML DOC Declarations:                  */

const base = document.getElementById("base")
const base_length = document.getElementById("base_length")
const crank = document.getElementById("crank")
const crank_rad = document.getElementById("crank_rad")
const connectingRod = document.getElementById("connecting-rod")
const connecting_rod = document.getElementById("connecting_rod")
const rocker = document.getElementById("rocker")
const rocker_length = document.getElementById("rocker_length")
const shaft2 = document.getElementById("shaft2")
const pin1 = document.getElementById("pin1")
const pin2 = document.getElementById("pin2")
const theta2_val = document.getElementById("thetha2_val")
const angularVelocity = 2 * Math.PI;

/*                       Functions:                       */

/* Loop Animation: */

function animate(time)
{
    const baseLength = parseInt(base_length.value);
    const crankLength = parseInt(crank_rad.value);
    const connectingRodLength = parseInt(connecting_rod.value);
    const rockerLength = parseInt(rocker_length.value);
    const timeSeconds = time / 1000;
    const thetha2 = angularVelocity * timeSeconds;
    
    const bd = Math.sqrt((baseLength ** 2) + (crankLength ** 2) - (2*baseLength*crankLength*Math.cos(thetha2)))
    const gamma = Math.acos(((connectingRodLength ** 2)+(rockerLength ** 2)-((bd) ** 2))/(2*connectingRodLength*rockerLength))
    const thetha3 = 2*Math.atan2(((-1*crankLength*Math.sin(thetha2)) + rockerLength*Math.sin(gamma)), (baseLength + connectingRodLength - (crankLength*Math.cos(thetha2)) - (rockerLength*Math.cos(gamma))))
    const thetha4 = 2*Math.PI + 2*Math.atan2(crankLength*Math.sin(thetha2) - connectingRodLength*Math.sin(gamma),(rockerLength - baseLength + (crankLength*Math.cos(thetha2)) - (connectingRodLength*Math.cos(gamma))))
    
    const xPin1 = crankLength * Math.cos(thetha2);
    const yPin1 = crankLength * Math.sin(thetha2);

    crank.setAttribute("x2", xPin1);
    crank.setAttribute("y2", yPin1);

    pin1.setAttribute("cx", xPin1);
    pin1.setAttribute("cy", yPin1);

    connectingRod.setAttribute("x1", xPin1);
    connectingRod.setAttribute("y1", yPin1);

    const xPin2 = (crankLength * Math.cos(thetha2)) + (connectingRodLength * Math.cos(thetha3));
    const yPin2 = rockerLength * Math.sin(thetha4);

    connectingRod.setAttribute("x2", xPin2);
    connectingRod.setAttribute("y2", yPin2);

    rocker.setAttribute("x1", baseLength);
    rocker.setAttribute("y1", 0);

    base.setAttribute("x2", baseLength);
    base.setAttribute("y2", 0);

    shaft2.setAttribute("cx", baseLength);
    shaft2.setAttribute("cy", 0);

    pin2.setAttribute("cx", xPin2);
    pin2.setAttribute("cy", yPin2);

    rocker.setAttribute("x2", xPin2);
    rocker.setAttribute("y2", yPin2);

    reqAnim = window.requestAnimationFrame(animate);
}

/* Animation Frame (Based on thetha2_val): */

function animate_frame(time)
{
    const baseLength = parseInt(base_length.value);
    const crankLength = parseInt(crank_rad.value);
    const connectingRodLength = parseInt(connecting_rod.value);
    const rockerLength = parseInt(rocker_length.value);
    const timeSeconds = time / 1000;
    const thetha2 = angularVelocity - parseInt(theta2_val.value)*(angularVelocity/360);
    
    const bd = Math.sqrt((baseLength ** 2) + (crankLength ** 2) - (2*baseLength*crankLength*Math.cos(thetha2)))
    const gamma = Math.acos(((connectingRodLength ** 2)+(rockerLength ** 2)-((bd) ** 2))/(2*connectingRodLength*rockerLength))
    const thetha3 = 2*Math.atan2(((-1*crankLength*Math.sin(thetha2)) + rockerLength*Math.sin(gamma)), (baseLength + connectingRodLength - (crankLength*Math.cos(thetha2)) - (rockerLength*Math.cos(gamma))))
    const thetha4 = 2*Math.PI + 2*Math.atan2(crankLength*Math.sin(thetha2) - connectingRodLength*Math.sin(gamma),(rockerLength - baseLength + (crankLength*Math.cos(thetha2)) - (connectingRodLength*Math.cos(gamma))))
    
    const xPin1 = crankLength * Math.cos(thetha2);
    const yPin1 = crankLength * Math.sin(thetha2);

    crank.setAttribute("x2", xPin1);
    crank.setAttribute("y2", yPin1);

    pin1.setAttribute("cx", xPin1);
    pin1.setAttribute("cy", yPin1);

    connectingRod.setAttribute("x1", xPin1);
    connectingRod.setAttribute("y1", yPin1);

    const xPin2 = (crankLength * Math.cos(thetha2)) + (connectingRodLength * Math.cos(thetha3));
    const yPin2 = rockerLength * Math.sin(thetha4);

    connectingRod.setAttribute("x2", xPin2);
    connectingRod.setAttribute("y2", yPin2);

    rocker.setAttribute("x1", baseLength);
    rocker.setAttribute("y1", 0);

    shaft2.setAttribute("cx", baseLength);
    shaft2.setAttribute("cy", 0);

    pin2.setAttribute("cx", xPin2);
    pin2.setAttribute("cy", yPin2);

    rocker.setAttribute("x2", xPin2);
    rocker.setAttribute("y2", yPin2);

    reqAnim_frame = window.requestAnimationFrame(animate_frame);
}

/* Start Animation: */

function startAnimation()
{
    window.requestAnimationFrame(animate);
    theta2_val.disabled = true;
}

/* Stop Animation: */

function stopAnimation()
{
    window.cancelAnimationFrame(reqAnim);
    theta2_val.disabled = false;
    animate_frame();
}


