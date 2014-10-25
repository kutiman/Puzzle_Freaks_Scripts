#pragma strict

var level = 0;
var levelDuration = 0;
var roundDuration = 0;
var levelCoins = 0;

var start = false;
var gameOver = false;
var gameWon = false;
var restart = false;

var peopleState = "normal";
var game = "duplicate";
var peopleAmount = 30;
var neededAnswers = 0;
var correctAnswers = 0;

var winners = 2;
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
		obj.rigidbody.position = Vector3(grid[item,0], grid[item,1], -3);
		obj.GetComponent(scrPerson).personNum = peopleList[item];
		if (peopleList[item] == winnerNum) {
			obj.GetComponent(scrPerson).winner = true;
		}
	}
}

function Start () {
	ShuffleRoundDuplicates(10,2);
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
