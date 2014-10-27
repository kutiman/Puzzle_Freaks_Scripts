#pragma strict

var nextStep = 0.18;
var personNum = 1;
var subImage = 0;
var sprList = new Array();
var winner = false;
var chosen = false;
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
	//Debug.Log(sprList[3].ToString());
	SetSounds();
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
	Dance(0.67);
}

function Die () {
	Destroy(gameObject);
}

function SetSounds () {
	sound1 = gameObject.AddComponent (AudioSource);
	sound1.clip = Resources.Load("Sounds/snd_scratch");
	sound1.playOnAwake = false;
}