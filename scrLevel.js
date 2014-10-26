#pragma strict

var level = 0;

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

var majDifference = 1;
var majGroups = 2;

function SpaceGrid (horSpace : float, verSpace : float, amount : int, anchor : Array) {

	var ancX : float = anchor[0];
	var ancY : float = anchor[1];
	var grid : float[,] = new float[amount,2]; 
		
	for (var i = 0; i < amount; i++){
	
		var pos : Array = [null,null];
	    if (i % 2 == 0)
	    {
	        pos[0] = ancX + horSpace/2 + (Mathf.FloorToInt(i/6) * horSpace);        
	        switch (i % 3) {
	            case 0: pos[1] = ancY; break;
	            case 1: pos[1] = ancY - verSpace; break;
	            case 2: pos[1] = ancY + verSpace; break;
	        }
	    }
	    else {
	        pos[0] = ancX - horSpace/2 - (Mathf.FloorToInt(i/6) * horSpace);
	        switch (i % 3) {
	            case 0: pos[1] = ancY + verSpace; break;
	            case 1: pos[1] = ancY; break;
	            case 2: pos[1] = ancY - verSpace; break;
	        }
	    }
	    grid[i,0] = pos[0];
	    grid[i,1] = pos[1];
	}
	return grid;
	Debug.Log("created grid");
};

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
	var anchor : Array = [0,0];
	var grid = SpaceGrid(2,2,amount,anchor);
	for (var item = 0; item < peopleList.length; item++) {
		var obj : GameObject = Instantiate(Resources.Load("Prefabs/Person"));
		obj.transform.parent = gameObject.transform;
		obj.transform.position = Vector3(grid[item,0], grid[item,1], -3);
		obj.GetComponent(scrPerson).personNum = peopleList[item];
		if (peopleList[item] == winnerNum) {
			obj.GetComponent(scrPerson).winner = true;
		}
	}
}

function Start () {
	LevelProperties();
	ShuffleRoundDuplicates(peopleAmount,winners);
}

function Update () {
	if (Input.GetKeyDown ("space")) {
		ShuffleRoundDuplicates(10,2);
	}
	var chosens = 0;
	var objs = GameObject.FindGameObjectsWithTag ("tagPerson");
	for (var obj : GameObject in objs) {
		if (obj.GetComponent(scrPerson).chosen == true) {
			chosens++;
		}
	}
	if (chosens == winners) {
		ShuffleRoundDuplicates(10,2);
	}
}

function answerCorrect () {

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
		case 1: props = [20,6,5,10,2]; break;
		case 2: props = [20,6,5,12,2]; break;
		case 3: props = [20,6,5,14,2]; break;
		case 4: props = [20,6,5,16,2]; break;
		case 5: props = [20,6,5,18,2]; break;
		case 6: props = [20,6,5,20,2]; break;
		case 7: props = [20,6,5,22,2]; break;
		case 8: props = [20,6,5,24,2]; break;
		case 9: props = [20,6,5,26,2]; break;
		case 10: props = [20,6,5,28,2]; break;
		case 11: props = [20,6,5,30,2]; break;
		case 12: props = [20,6,5,10,2]; break;
		case 13: props = [20,6,5,10,2]; break;
		case 14: props = [20,6,5,10,2]; break;
		case 15: props = [20,6,5,10,2]; break;
		case 16: props = [20,6,5,10,2]; break;
		case 17: props = [20,6,5,10,2]; break;
		case 18: props = [20,6,5,10,2]; break;
		case 19: props = [20,6,5,10,2]; break;
		case 20: props = [20,6,5,10,2]; break;
		default: break;
	}
	levelDuration = props[0];
	roundDuration = props[1];
	neededAnswers = props[2];
	peopleAmount = props[3];
	winners = props[4];
}
