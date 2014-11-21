#pragma strict

var scrCharPos : scrCharacterPositions;

static var level = 0;
static var totalLevels = 20;
// level prperties
static var levelDuration = 0;
static var roundDuration = 0;
static var peopleAmount = 30;
static var neededAnswers = 0;
static var winners = 2;

static var start = false;
static var gameOver = false;
static var gameWon = false;
static var restart = false;

var peopleState = "normal";
var game = "duplicate";
var levelCoins = 0;
var correctAnswers = 0;
var chosens = 0;
var majDifference = 1;
var majGroups = 2;

var interfaceSkin : GUISkin;

function CheckArray (arr : Array, n) {
	var exists = false;
	for(var item : int in arr)
    {
        if (item == n) {
        	exists = true;
        }
    }
    return exists;
}

function Start () {
	gameObject.name = "conLevel";
	scrCharPos = GetComponent(scrCharacterPositions);
}



function DestroyPeople () {
	var objs = GameObject.FindGameObjectsWithTag ("tagPerson");
	for (var obj : GameObject in objs) {
		obj.GetComponent(scrPerson).Die();
	}
}

function ShuffleArray (myArray : Array) {
   var m = myArray.length;
   while (m) {
		var i = Mathf.Floor((Random.Range(0, myArray.length)));
		m--;
		var t = myArray[m];
		myArray[m] = myArray[i];
		myArray[i] = t;
   }
   return myArray;
}

function GetLevelProperties () {
	var props : Array = new Array();
	props = GetComponent(scrLevelProperties).LevelProperties(level);
	levelDuration = props[0];
	roundDuration = props[1];
	neededAnswers = props[2];
	peopleAmount = props[3];
	winners = props[4];
}

function CreateTimer () {
	var obj : GameObject = Instantiate(Resources.Load("Prefabs/objTimer"));
	obj.transform.parent = gameObject.transform;
	obj.GetComponent(scrTimer).timeToCount = levelDuration;
}

function DestroyTimer () {
	var obj : GameObject = GameObject.Find("objTimer");
	if (obj) {
		GameObject.Destroy(obj);
	}
}

function GameWon() {
	scrSound.StopMusic();
	scrSound.sndSuccess.Play();
	gameWon = true;
	DestroyPeople();
	DestroyTimer();
	var obj : GameObject = Instantiate(Resources.Load("Prefabs/MenuEnd"));
}

function TimeOut () {
	scrSound.StopMusic();
	scrSound.sndFail.Play();
	DestroyPeople();
	DestroyTimer();
	var obj : GameObject = Instantiate(Resources.Load("Prefabs/MenuEnd"));
}

function NextLevel () {
	if (level < totalLevels) {
		level++;
		GetLevelProperties();
		start = false;
	}
}

function CreateInterface () {
	var objInterface : GameObject = GameObject.Find("conInterface");
	if (objInterface) {
		objInterface.Destroy(objInterface.gameObject);
	}
	var obj : GameObject = Instantiate(Resources.Load("Prefabs/conInterface"));
	var objScript : scrInterface = obj.GetComponent(scrInterface);
	objScript.controller = gameObject;
	objScript.winners = winners;
	objScript.chosens = chosens;
}
