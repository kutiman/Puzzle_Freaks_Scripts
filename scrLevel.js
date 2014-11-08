﻿#pragma strict

var scrCharPos : scrCharacterPositions;

var level = 0;
var totalLevels = 20;
// level prperties
var levelDuration = 0;
var roundDuration = 0;
var peopleAmount = 30;
var neededAnswers = 0;
var winners = 2;

var start = false;
var gameOver = false;
var gameWon = false;
var restart = false;

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

function ShuffleRoundDuplicates (amount : int, winners : int) {
	
	DestroyPeople();
	var totalPeople = 30;
	var peopleList = new Array();
	while (peopleList.length <= amount - winners) {
		var n : int = Mathf.CeilToInt(Random.Range(0.001,totalPeople));
		if (CheckArray(peopleList, n) == false) {
			peopleList.Add(n);
		}
	}
	var winnerNum = peopleList.Pop();
	for (var i = 0; i < winners; i++) {
		peopleList.Add(winnerNum);
	}
	peopleList = ShuffleArray(peopleList);
	var anchor : Vector2 = Vector2(0,0);
	//var grid = scrCharPos.CharacterPositionsRows(2.5,2.5,amount,anchor);
	var grid = scrCharPos.CharacterPositionsScattered(amount);
	for (var item = 0; item < peopleList.length; item++) {
		var obj : GameObject = Instantiate(Resources.Load("Prefabs/Person"));
		obj.transform.parent = gameObject.transform;
		obj.transform.position = Vector3(grid[item,0], grid[item,1], -3);
		obj.GetComponent(scrPerson).personNum = peopleList[item];
		if (peopleList[item] == winnerNum) {
			obj.GetComponent(scrPerson).winner = true;
		}
	}
	
	scrSound.sndChimes.Play();
}

function Start () {
	gameObject.name = "conLevel";
	scrCharPos = GetComponent(scrCharacterPositions);
}

function Update () {
	chosens = 0;
	var objs = GameObject.FindGameObjectsWithTag ("tagPerson");
	for (var obj : GameObject in objs) {
		if (obj.GetComponent(scrPerson).chosen == true) {
			chosens++;
		}
	}

	
	if (gameWon == false && neededAnswers > 0 && neededAnswers == correctAnswers) {
		GameWon();
	}
	
	if (chosens == winners && !gameWon) {
	answerCorrect();
	}
	// making coins DEBUG
	///*
	if (Input.GetMouseButton(0)) {
	var obj : GameObject = Instantiate(Resources.Load("Prefabs/objCoin"));
	var cam : Camera = GameObject.Find("MainCamera").camera;
	var mousePos = cam.ScreenToWorldPoint(Input.mousePosition);
	obj.transform.position = mousePos;
	obj.transform.position.z = -2;
	}
	//*/
}

function answerCorrect () {
	correctAnswers++;
	ShuffleRoundDuplicates(peopleAmount,winners);
	var i = Random.Range(0,scrSound.audioSource.Length);
	scrSound.audioSource[i].Play();
}

function answerWrong () {
	
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

function LevelProperties () {
	var props : Array = new Array();
		// [levelDuration,roundDuration,neededAnswers,peopleAmount,winners] 
	switch (level) {
		case 0: break;
		case 1: props = [120,6,5,10,2]; break;
		case 2: props = [120,6,5,30,5]; break;
		case 3: props = [120,6,5,14,2]; break;
		case 4: props = [120,6,5,16,2]; break;
		case 5: props = [120,6,5,18,2]; break;
		case 6: props = [120,6,5,20,2]; break;
		case 7: props = [120,6,5,22,2]; break;
		case 8: props = [120,6,5,24,2]; break;
		case 9: props = [120,6,5,26,2]; break;
		case 10: props = [120,6,5,28,2]; break;
		case 11: props = [120,6,5,30,2]; break;
		case 12: props = [120,6,5,10,2]; break;
		case 13: props = [120,6,5,10,2]; break;
		case 14: props = [120,6,5,10,2]; break;
		case 15: props = [120,6,5,10,2]; break;
		case 16: props = [120,6,5,10,2]; break;
		case 17: props = [120,6,5,10,2]; break;
		case 18: props = [120,6,5,10,2]; break;
		case 19: props = [120,6,5,10,2]; break;
		case 20: props = [120,6,5,10,2]; break;
		default: break;
	}
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

function Restart() {
	LevelProperties();
	ShuffleRoundDuplicates(peopleAmount,winners);
	CreateTimer();
	gameWon = false;
	correctAnswers = 0;
	CreateInterface();
	scrSound.PlayMusic();
	start = true;
}

function OnGUI() {
	if (!start) {
		LevelProperties();
		interfaceSkin = Resources.Load("Skins/skinStartLevel");
		GUI.skin = interfaceSkin;
		var posRect : Rect = Rect(0, (Screen.height - Screen.height / 3) / 2, Screen.width, Screen.height / 3);
		GUI.Box (posRect, "Find " + winners.ToString() + " look-alikes");
		GUI.Label (Rect(0, (Screen.height - Screen.height / 3) / 2 + 40, Screen.width, Screen.height / 3), neededAnswers.ToString() + " rounds");
		GUI.Label (Rect(0, (Screen.height - Screen.height / 3) / 2 + 65, Screen.width, Screen.height / 3), levelDuration.ToString() + " seconds");
		if (Input.GetMouseButton(1)) {
			Restart();
		}
	}
	
}

function NextLevel () {
	if (level < totalLevels) {
		level++;
		LevelProperties();
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
