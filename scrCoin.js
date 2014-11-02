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
var pulledByMouse = false;

var levelControllerScript : scrLevel;

var coinsAudioClip = new AudioClip[8];
var coinsAudioSource = new AudioSource[8];

function Start () {
	levelControllerScript = GameObject.Find("conLevel").GetComponent(scrLevel);
	
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
	
	if (currentStep >= lastStep + stepTime && !pulledByMouse) {
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
	FlyToMouse();
	
}

function PickUpCoin () {
	var waitTime = 0.7;
	if (Time.time - waitTime > timeBorn) {
		scrConGame.totalCoins++;
		scrSound.PlayCoinSound();
		gameObject.Destroy(gameObject);
	}

}

function FlyToMouse () {
	var pickupDistance = 1;
	var oldZ = transform.position.z;
	var waiting = true;
	var waitTime = 0.7;
	if (Time.time - waitTime > timeBorn) {
		waiting = false;
	}
	
	var magnetPower = 4;
	var cam : Camera = GameObject.Find("MainCamera").camera;
	var mousePos : Vector2 = cam.ScreenToWorldPoint(Input.mousePosition);
	var myPos : Vector2 = gameObject.transform.position;
	var distFromMouse = Vector2.Distance(mousePos, myPos);
	if (distFromMouse <= pickupDistance && !waiting) {
		PickUpCoin();
	}
	if (distFromMouse <= magnetPower && !waiting) {
		transform.position = Vector2.Lerp(myPos, mousePos, Time.deltaTime * 4 * momentum);
		transform.position.z = oldZ;
		momentum *= 1.01;
		pulledByMouse = true;
	}
	else {
		pulledByMouse = false;
		momentum = 1;
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