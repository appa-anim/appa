// Creates the div for where appa will be
function createAnimationzone(x, appaHeight)
{
	var div = document.createElement("div");
	div.style.width = "100%";
	div.style.height = appaHeight * 2 + "px";
	div.offsetTop = 0;
	div.id = "animationZone";
	div.style.top = 0 + "px";
	div.style.position = "fixed";
	div.style.zIndex = 999;

	document.getElementById('container').appendChild(div);

	return div;
}

// Creates an appa image
function createAppa(source) 
{
	var image = document.createElement("IMG");
	
	// image tag properties
	image.setAttribute("src", source);
	image.id = "appa"
	image.setAttribute("alt", "Appa Animation");

	// css properties
	var animationZone = document.getElementById("animationZone");

	image.style.position = "absolute";
	image.style.top = animationZone.offsetTop + "px";
	image.style.left = animationZone.offsetWidth + "px";

	// z-index
	image.style.zIndex = -999;

	// Add appa to the div
	animationZone.appendChild(image);

	return image;
}


// Changes the image source to the new source
function nextFrame(image, newSource)
{
	image.setAttribute("src", newSource);

	return image;
}

// Moves the image left and right
function moveHorizontal(image, animationZone, stepSize, direction)
{
	if(direction == "left")
	{
		var newPosX = image.offsetLeft - stepSize;

		if(newPosX < -1*image.width)
			return "finished"
		else
			image.style.left = newPosX + "px";

		return "left"

	}
	else
	{
		var newPosX = image.offsetLeft + stepSize;

		if(newPosX > animationZone.offsetWidth)
		{
			return "finished"
		}
		else
			image.style.left = newPosX + "px";

		return "right"

	}
}

// Moves the image up and down 
function moveVertical(image, animationZone, stepSize, direction)
{
	if(direction == "top")
	{
		var newPosY = image.offsetTop - stepSize;

		if(newPosY < animationZone.offsetTop)
			return "finished"
		else
			image.style.top = newPosY + "px";

		return "top"

	}
	else
	{
		var newPosY = image.offsetTop + stepSize;

		if(newPosY > animationZone.offsetHeight 
		 + animationZone.offsetTop - image.height)
			return "finished"
		else
			image.style.top = newPosY + "px";

		return "bottom"

	}
}

function moveAppaHorz(appa, animationZone, stepSize, direction)
{
	var movement = moveHorizontal(appa, animationZone, stepSize, 
		direction.valueOf);
	if(movement == "finished")
	{
		if(direction.valueOf == "right")
			direction.valueOf = "left"
		else
			direction.valueOf = "right"
	}
}

function moveAppaVert(appa, animationZone, stepSize, direction)
{
		var movement = moveVertical(appa, animationZone, stepSize, 
			direction.valueOf);
		if(movement == "finished")
		{
			if(direction.valueOf == "bottom")
				direction.valueOf = "top"
			else
				direction.valueOf = "bottom"
		}
}

/******************************************************************************
									Main
******************************************************************************/
var leftFrames = 
	[	
		'https://i.imgur.com/mdhVt3E.png', 'https://i.imgur.com/hpMKfNL.png', 
		'https://i.imgur.com/FzcqXJY.png', 'https://i.imgur.com/cpIxwIL.png', 
		'https://i.imgur.com/2Lbq4xm.png', 'https://i.imgur.com/xPuw8rB.png', 
		'https://i.imgur.com/RAm1Kmp.png', 'https://i.imgur.com/OzuQOlH.png', 
		'https://i.imgur.com/lLeV5Ho.png', 'https://i.imgur.com/G4Vu5Vk.png',
		'https://i.imgur.com/cNXtjwd.png', 'https://i.imgur.com/ma67Enp.png', 
		'https://i.imgur.com/ZtX3Pi9.png'	
	]

var rightFrames = 
	[	
		'https://i.imgur.com/UEOkRMa.png', 'https://i.imgur.com/LTC8S4H.png', 
		'https://i.imgur.com/3AKajSk.png', 'https://i.imgur.com/mNkejOM.png', 
		'https://i.imgur.com/UVd5F6F.png', 'https://i.imgur.com/9KhC1k3.png', 
		'https://i.imgur.com/N7DPrDy.png', 'https://i.imgur.com/bfsVvEX.png', 
		'https://i.imgur.com/EtOStk8.png', 'https://i.imgur.com/29JIBy8.png',
		'https://i.imgur.com/JXOFWWl.png', 'https://i.imgur.com/fKSAHNV.png', 
		'https://i.imgur.com/mL9B41O.png'	
	]

$(window).load(function() {
// Create animation zone : (starting x value on webpage, height of appa)
var animationZone = createAnimationzone(0, 150)

var appa = createAppa(leftFrames[0]);

var count = 0;

// convert string to object to pass by reference in setInterval functions
var horzDirection = "left"
	horzDirection = Object(horzDirection);

var vertDirection = "bottom"
	vertDirection = Object(vertDirection);

var frameDir = leftFrames

var updateFrame = setInterval(
	function() 
	{ 		
		if(horzDirection.valueOf == "left")
			frameDir = leftFrames
		else
			frameDir = rightFrames

		if( count < 13)
		{
			appa = nextFrame(appa, frameDir[count]);
			count++;
		}
		else
		{
			count = 0;
		} 
	}, 100);

// Create event to move appa after half a second to give time for the div to 
// initialize
setTimeout(function(){
	var moveAppaHorizontally = setInterval(
	 moveAppaHorz, 150, appa, animationZone,
	 animationZone.offsetWidth / 50, horzDirection);

	var moveAppaVertically = setInterval(
	 moveAppaVert, 150, appa, animationZone,
	 animationZone.offsetHeight / 50, vertDirection);
}, 500)
});

