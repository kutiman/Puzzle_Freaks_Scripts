#pragma strict

var dimming : boolean = false;
var flashing : boolean = false;
var lightOn : boolean = true;
var lastFlash : float = 0.0;
var lightComp : Light;
var colorList : Array = new Array();

private var dimSpeed = 0.5;
private var lightIntensity = 0.5;

function Start () {
	
	lightComp = gameObject.GetComponent(Light);
	colorList[0] = Color.red;
	colorList[1] = Color.blue;
	colorList[2] = Color.green;
	
	SetLight(lightComp, 1);
}

function Update () {
	FlashLight();
	
}

function SetLight (comp : Light, colorNumber : int) {
	comp.type = LightType.Spot;
	comp.range = 50;
	comp.intensity = 0.3;
	comp.spotAngle = Random.Range(50,60);
	if (colorNumber > colorList.length - 1) {colorNumber = colorList.length - 1;}
	lightComp.color = colorList[colorNumber];
}

function DimLight() {
	if (lightComp.intensity <= 0.1 && dimming) {dimming = false;}
	if (lightComp.intensity >= 0.5 && !dimming) {dimming = true;}
	
	if (dimming) {lightComp.intensity -= Time.deltaTime * dimSpeed;}
	else {lightComp.intensity += Time.deltaTime * dimSpeed;}
}

function ChangeColor () {

}

function FlashLight() {
	if (lastFlash + dimSpeed <= Time.time) {
		ToggleLight();
		lastFlash = Time.time;
	}
}

function ToggleLight() {
	lightOn = !lightOn;
	if (lightOn) {lightComp.intensity = lightIntensity;}
	else {lightComp.intensity = 0.0;}
}




