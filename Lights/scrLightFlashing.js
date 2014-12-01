#pragma strict

var dimming : boolean = false;
var flashing : boolean = false;
var lightOn : boolean = true;
var lastFlash : float = 0.0;
var lightComp : Light;
var colorList : Array = new Array();

private var lightIntensity = 0.3;

function Start () {
	
	lightComp = gameObject.GetComponent(Light);
	colorList.Add(Color.red);
	colorList.Add(Color.blue);
	colorList.Add(Color.green);
	colorList.Add(Color.yellow);
	colorList.Add(Color.gray);
	colorList.Add(Color.cyan);
	colorList.Add(Color.magenta);
	
	SetLight(lightComp, 1);
}

function Update () {
	FlashLight();
	
}

function SetLight (comp : Light, colorNumber : int) {
	comp.type = LightType.Spot;
	comp.range = 50;
	comp.intensity = 0.5;
	comp.spotAngle = Random.Range(50,60);
	if (colorNumber > colorList.length - 1) {colorNumber = colorList.length - 1;}
	lightComp.color = colorList[colorNumber];
}
/*
function DimLight() {
	if (lightComp.intensity <= 0.1 && dimming) {dimming = false;}
	if (lightComp.intensity >= 0.5 && !dimming) {dimming = true;}
	
	if (dimming) {lightComp.intensity -= Time.deltaTime * beatSpeed;}
	else {lightComp.intensity += Time.deltaTime * beatSpeed;}
}
*/
function ChangeColor () {
	lightComp.color = colorList[Random.Range(0, colorList.length - 1)];
}

function FlashLight() {
	if (lastFlash != scrConGame.lastBeat) {
		ToggleLight();
		ChangeColor();
		lastFlash = scrConGame.lastBeat;
	}
}

function ToggleLight() {
	lightOn = !lightOn;
	if (lightOn) {lightComp.intensity = lightIntensity;}
	else {lightComp.intensity = 0.0;}
}

