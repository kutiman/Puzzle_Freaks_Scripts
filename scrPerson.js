#pragma strict

var nextStep = 0.18;
var personNum = 1;
var subImage = 0;
var sprList = new Array();
var winner = false;
var chosen = false;
var hover = false;

var pos : float;

var par : GameObject;
var parChosen : GameObject;

gameObject.tag = "tagPerson";

var sound1 : AudioSource;

function GetSpriteList (personNum) {
	var spriteList = new Array();
	var str = "Sprites/spr_person" + personNum.ToString();
	spriteList = Resources.LoadAll(str);
	var sprList : Array = [spriteList[1],spriteList[2], spriteList[3], spriteList[4]];
	return sprList;
}

function Start () {
	sprList = GetSpriteList(personNum);
	CreateParticleSystems();
	par.GetComponent(scrParticles).PersonCreationBurst();
	SetSounds();
	
	pos = gameObject.transform.position.y;
}

function OnMouseDown () {

	if (winner) {
		chosen = true;
		parChosen.GetComponent(ParticleSystem).Play();
	}
	else {
		var obj : GameObject = GameObject.Find("objTimer");
		obj.GetComponent(scrTimer).timeToCount -= 3;
		RisingText ();
		sound1.Play();
	}
}


function Dance (danceSpeed : float) {


	if(Time.time >= nextStep){
		nextStep = Time.time + danceSpeed;
		subImage++;
		if (subImage >= sprList.length) {
			subImage = 0;
		}
		GetComponent(SpriteRenderer).sprite = sprList[subImage];
	}
}

function Update () {
	Dance(0.514);
	
	if (hover) {
		transform.position.y = Mathf.Lerp(transform.position.y, pos + 0.2, Time.deltaTime * 8);
	}
	else if (chosen == false) {
		transform.position.y = Mathf.Lerp(transform.position.y, pos, Time.deltaTime * 8);
	}
	
	if (parChosen.GetComponent(ParticleSystem).isPlaying && chosen == false) {
		parChosen.GetComponent(ParticleSystem).Stop();
	}
}

function Die () {
	Destroy(gameObject);
}

function SetSounds () {
	sound1 = gameObject.AddComponent (AudioSource);
	sound1.clip = Resources.Load("Sounds/snd_scratch");
	sound1.playOnAwake = false;
}

function CreateParticleSystems () {
	par = Instantiate(Resources.Load("Prefabs/Particles/PersonParticles"));
	par.transform.parent = gameObject.transform;
	par.transform.localPosition = Vector3(0,0,-1);
	
	parChosen = Instantiate(Resources.Load("Prefabs/Particles/ParticlesChosen"));
	parChosen.transform.parent = gameObject.transform;
	parChosen.transform.localPosition = Vector3(0,0,-1);
}
function OnMouseEnter () {
	hover = true;
}

function OnMouseExit () {
	hover = false;
}

function RisingText () {
	var obj : GameObject = Instantiate(Resources.Load("Prefabs/Texts/objRisingText"));
	obj.transform.position = gameObject.transform.position;
	obj.transform.position.z -= 1;	
	return obj;
}



