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
	CreateParticleSystem();
	par.GetComponent(scrParticles).PersonCreationBurst();
	SetSounds();
	
	pos = gameObject.transform.position.y;
}

function OnMouseDown () {
	Debug.Log("Person been clicked" + personNum.ToString());
	if (winner) {
		chosen = true;
	}
	else {
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
	else {
		transform.position.y = Mathf.Lerp(transform.position.y, pos, Time.deltaTime * 8);
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

function CreateParticleSystem () {
	par = Instantiate(Resources.Load("Prefabs/Particles/PersonParticles"));
	par.transform.parent = gameObject.transform;
	par.transform.localPosition = Vector3(0,0,-1);
}
function OnMouseEnter () {
	hover = true;
}

function OnMouseExit () {
	hover = false;
}




