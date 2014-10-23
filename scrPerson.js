#pragma strict

var nextStep = 0.0;
var zAngle : float = 0;
var personNum = 1;
var subImage = 0;
var sprList = new Array();
var objSprite : SpriteRenderer;
objSprite = gameObject.GetComponent("SpriteRenderer");

function GetSpriteList (personNum) {
	var spriteList = new Array();
	var str = "Sprites/spr_person3";
	spriteList = Resources.LoadAll(str);
	return spriteList;
}

function Start () {
	sprList = GetSpriteList(personNum);
	Debug.Log(sprList[1].GetType());
}

function OnMouseDown () {}
	

function Dance (danceSpeed : float) {

	transform.rotation = Quaternion.Euler(0,0,zAngle);
	if(Time.time >= nextStep){
		objSprite.sprite = sprList[subImage];
		nextStep = Time.time + danceSpeed;
		subImage++;
		if (subImage >= 4) {
			subImage = 0;
		}
	}
}

function Update () {
	Dance(100.45);
}