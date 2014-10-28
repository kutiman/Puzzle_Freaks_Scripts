#pragma strict

var timeBorn : float;
var momentum = 1;
var verSpeed : float;
var horSpeed : float;
private var grav = 0.02;
var ground : float;
var landing : boolean;
var lifespan = 1000;
var lastStep : float = 0.0;
var currentStep : float = 0.0;

function Start () {
	timeBorn = Time.time;
	currentStep = Time.time;
	verSpeed = Random.Range(0.4, 0.5);
	horSpeed = Random.Range(-0.2,0.2);
	ground = Random.Range(-6.5, -6);
}

function Update () {
	//landing = (gameObject.transform.position.y + verSpeed <= ground);
	var stepTime : float = 0.01;
	var y = gameObject.transform.position.y;
	var x = gameObject.transform.position.x;
	currentStep = Time.time;
	
	if (currentStep >= lastStep + stepTime) {
		verSpeed -= grav;

		if (verSpeed < -0.1 && y + verSpeed <= ground) {
			verSpeed = verSpeed * -0.5;
		};

		// Vertical bounce
		if (verSpeed < 0 && y + verSpeed <= ground)  //landing
		{
		    verSpeed = 0.0;
		}
		if (verSpeed != 0.0) {
			gameObject.transform.position.y += verSpeed;
		}

		//
		if (x + horSpeed >= 10 || x + horSpeed <= -10) {
			horSpeed = horSpeed * -1;
		}
		gameObject.transform.position.x += horSpeed;

		//
		if (horSpeed < -0.03 || horSpeed > 0.03) {
			horSpeed = horSpeed * 0.995;
		}
		else if (y - 0.1 <= ground && verSpeed > -0.05 && verSpeed < 0.05) {
			horSpeed = 0.0;
		}
		lastStep = currentStep;
	}
	
}


//
/*
var opacity_handler = 1;

if lifespan < 100 {opacity_handler = 0.01 * lifespan};
if opacity_handler < 0 {opacity_handler = 0};
image_alpha = 1 * opacity_handler
if lifespan <= 0 {instance_destroy()};

lifespan -= 1
*/