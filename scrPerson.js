#pragma strict

var nextStep = 0.0;

var personNum = 1;
var subImage = 0;
var sprList = new Array();
var winner = false;
var chosen = false;

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
}

function OnMouseDown () {
	Debug.Log("Person been clicked" + personNum.ToString());
	if (winner) {
		chosen = true;
	}
}


function Dance (danceSpeed : float) {


	if(Time.time >= nextStep){
		nextStep = Time.time + danceSpeed;
		subImage++;
		if (subImage >= 4) {
			subImage = 0;
		}
		GetComponent(SpriteRenderer).sprite = sprList[subImage];
	}
}

function Update () {
	Dance(0.45);
}