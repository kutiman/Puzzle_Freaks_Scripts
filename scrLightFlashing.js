#pragma strict

var dimming : boolean = false;

private var dimSpeed = 0.3;

function Start () {

}

function Update () {
	FlashLight();
}

function FlashLight() {
	if (gameObject.GetComponent(Light).intensity <= 0.1 && dimming) {dimming = false;}
	if (gameObject.GetComponent(Light).intensity >= 0.5 && !dimming) {dimming = true;}
	
	if (dimming) {gameObject.GetComponent(Light).intensity -= Time.deltaTime * dimSpeed;}
	else {gameObject.GetComponent(Light).intensity += Time.deltaTime * dimSpeed;}
}