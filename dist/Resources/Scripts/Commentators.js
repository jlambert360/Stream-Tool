const fadeInTime = .3; //(seconds)
const fadeOutTime = .2;

//max text sizes (used when resizing back)
const casterSize = '24px';
const twitterSize = '20px';

//variables for the twitter/twitch constant change
let socialInt1;
let socialInt2;
let twitter1, twitch1, twitter2, twitch2;
let socialSwitch = true; //true = twitter, false = twitch
const socialInterval = 12000;


let startup = true;


window.onload = init;

function init() {
	async function mainLoop() {
		const scInfo = await getInfo();
		getData(scInfo);
	}

	mainLoop();
	setInterval( () => { mainLoop(); }, 500); //update interval
}

async function getData(scInfo) {
	let caster1 = scInfo['caster1Name'];
	twitter1 = scInfo['caster1Twitter'];
	twitch1 = scInfo['caster1Twitch'];
	let caster2 = scInfo['caster2Name'];
	twitter2 = scInfo['caster2Twitter'];
	twitch2 = scInfo['caster2Twitch'];;


	//first, things that will happen only the first time the html loads
	if (startup) {
		//set the caster info
		updateSocialText("caster1N", caster1, casterSize, "caster1TextBox");
		updateSocialText("caster1Tr", twitter1, twitterSize, "caster1TwitterBox");
		updateSocialText("caster1Th", twitch1, twitterSize, "caster1TwitchBox");
		updateSocialText("caster2N", caster2, casterSize, "caster2TextBox");
		updateSocialText("caster2Tr", twitter2, twitterSize, "caster2TwitterBox");
		updateSocialText("caster2Th", twitch2, twitterSize, "caster2TwitchBox");

		//setup twitter/twitch change
		socialChange1("caster1TwitterBox", "caster1TwitchBox");
		socialChange2("caster2TwitterBox", "caster2TwitchBox");
		//set an interval to keep changing the names
		socialInt1 = setInterval( () => {
			socialChange1("caster1TwitterBox", "caster1TwitchBox");
		}, socialInterval);
		socialInt2 = setInterval(() => {
			socialChange2("caster2TwitterBox", "caster2TwitchBox");
		}, socialInterval);

		//keep changing this boolean for the previous intervals
		setInterval(() => {
			if (socialSwitch) { //true = twitter, false = twitch
				socialSwitch = false;
			} else {
				socialSwitch = true;
			}
		}, socialInterval);

		//if a caster has no name, hide its icon
		if (caster1 == "") {
			document.getElementById('caster1TextBox').style.opacity = 0;
		}
		if (caster2 == "") {
			document.getElementById('caster2TextBox').style.opacity = 0;
		}

		startup = false; //next time we run this function, it will skip all we just did
	}

	//now things that will happen constantly
	else {
		
		//update caster 1 info
		if (document.getElementById('caster1N').textContent != caster1){
			fadeOut("#caster1TextBox", () => {
				updateSocialText("caster1N", caster1, casterSize, 'caster1TextBox');
				//if no caster name, dont fade in the caster icon
				if (caster1 != "") {
					fadeIn("#caster1TextBox", .2);
				}
			});
		}
		//caster 1's twitter
		if (document.getElementById('caster1Tr').textContent != twitter1){
			updateSocial(twitter1, "caster1Tr", "caster1TwitterBox", twitch1, "caster1TwitchBox");
		}
		//caster 2's twitch (same as above)
		if (document.getElementById('caster1Th').textContent != twitch1){
			updateSocial(twitch1, "caster1Th", "caster1TwitchBox", twitter1, "caster1TwitterBox");
		}

		//caster 2, same as above
		if (document.getElementById('caster2N').textContent != caster2){
			fadeOut("#caster2TextBox", () => {
				updateSocialText("caster2N", caster2, casterSize, 'caster2TextBox');
				if (caster2 != "") {
					fadeIn("#caster2TextBox", .2);
				}
			});
		}
		if (document.getElementById('caster2Tr').textContent != twitter2){
			updateSocial(twitter2, "caster2Tr", "caster2TwitterBox", twitch2, "caster2TwitchBox");
		}

		if (document.getElementById('caster2Th').textContent != twitch2){
			updateSocial(twitch2, "caster2Th", "caster2TwitchBox", twitter2, "caster2TwitterBox");
		}
	}
}


//the logic behind the twitter/twitch constant change
function socialChange1(twitterWrapperID, twitchWrapperID) {

	const twitterWrapperEL = document.getElementById(twitterWrapperID);
	const twitchWrapperEL = document.getElementById(twitchWrapperID);

	if (startup) {

		//if first time, set initial opacities so we can read them later
		if (!twitter1 && !twitch1) { //if all blank
			twitterWrapperEL.style.opacity = 0;
			twitchWrapperEL.style.opacity = 0;
		} else if (!twitter1 && !!twitch1) { //if twitter blank
			twitterWrapperEL.style.opacity = 0;
			twitchWrapperEL.style.opacity = 1;
		} else {
			twitterWrapperEL.style.opacity = 1;
			twitchWrapperEL.style.opacity = 0;
		}
		

	} else if (!!twitter1 && !!twitch1) {

		if (socialSwitch) {
			fadeOut(twitterWrapperEL, () => {
				fadeIn(twitchWrapperEL, 0);
			});
		} else {
			fadeOut(twitchWrapperEL, () => {
				fadeIn(twitterWrapperEL, 0);
			});
		}

	}
}
//i didnt know how to make it a single function im sorry ;_;
function socialChange2(twitterWrapperID, twitchWrapperID) {

	const twitterWrapperEL = document.getElementById(twitterWrapperID);
	const twitchWrapperEL = document.getElementById(twitchWrapperID);

	if (startup) {

		if (!twitter2 && !twitch2) {
			twitterWrapperEL.style.opacity = 0;
			twitchWrapperEL.style.opacity = 0;
		} else if (!twitter2 && !!twitch2) {
			twitterWrapperEL.style.opacity = 0;
			twitchWrapperEL.style.opacity = 1;
		} else {
			twitterWrapperEL.style.opacity = 1;
			twitchWrapperEL.style.opacity = 0;
		}

	} else if (!!twitter2 && !!twitch2) {

		if (socialSwitch) {
			fadeOut(twitterWrapperEL, () => {
				fadeIn(twitchWrapperEL, 0);
			});
		} else {
			fadeOut(twitchWrapperEL, () => {
				fadeIn(twitterWrapperEL, 0);
			});
		}

	}
}
//function to decide when to change to what
function updateSocial(mainSocial, mainText, mainBox, otherSocial, otherBox) {
	//check if this is for twitch or twitter
	let localSwitch = socialSwitch;
	if (mainText == "caster1Th" || mainText == "caster2Th") {
		localSwitch = !localSwitch;
	}
	//check if this is their turn so we fade out the other one
	if (localSwitch) {
		fadeOut("#"+otherBox, () => {})
	}

	//now do the classics
	fadeOut("#"+mainBox, () => {
		updateSocialText(mainText, mainSocial, twitterSize, mainBox);
		//check if its twitter's turn to show up
		if (otherSocial == "" && mainSocial != "") {
			fadeIn("#"+mainBox, .2);
		} else if (localSwitch && mainSocial != "") {
			fadeIn("#"+mainBox, .2);
		} else if (otherSocial != "") {
			fadeIn("#"+otherBox, .2);
		}
	});
}

//social text changer
function updateSocialText(textID, textToType, maxSize, wrapper) {
	const textEL = document.getElementById(textID);
	textEL.style.fontSize = maxSize; //set original text size
	textEL.textContent = textToType; //change the actual text
	const wrapperEL = document.getElementById(wrapper)
	resizeText(wrapperEL); //resize it if it overflows
}


//fade out
function fadeOut(itemID, funct) {
	gsap.to(itemID, {opacity: 0, duration: fadeOutTime, onComplete: funct});
}

//fade in
function fadeIn(itemID) {
	gsap.to(itemID, {delay: .2, opacity: 1, duration: fadeInTime});
}

//text resize, keeps making the text smaller until it fits
function resizeText(textEL) {
	const childrens = textEL.children;
	while (textEL.scrollWidth > textEL.offsetWidth || textEL.scrollHeight > textEL.offsetHeight) {
		if (childrens.length > 0) { //for team+player texts
			Array.from(childrens).forEach(function (child) {
				child.style.fontSize = getFontSize(child);
			});
		} else {
			textEL.style.fontSize = getFontSize(textEL);
		}
	}
}
//returns a smaller fontSize for the given element
function getFontSize(textElement) {
	return (parseFloat(textElement.style.fontSize.slice(0, -2)) * .90) + 'px';
}

//searches for the main json file
function getInfo() {
	return new Promise(function (resolve) {
		const oReq = new XMLHttpRequest();
		oReq.addEventListener("load", reqListener);
		oReq.open("GET", 'Resources/Texts/ScoreboardInfo.json');
		oReq.send();

		//will trigger when file loads
		function reqListener () {
			resolve(JSON.parse(oReq.responseText))
		}
	})
	//i would gladly have used fetch, but OBS local files wont support that :(
}