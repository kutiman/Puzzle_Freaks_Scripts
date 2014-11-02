#pragma strict

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

var audioClip = new AudioClip[4];
var audioSource = new AudioSource[4];

var coinsAudioClip = new AudioClip[8];
var coinsAudioSource = new AudioSource[8];

var sndSuccess : AudioSource;
var sndFail : AudioSource;
var sndChimes : AudioSource;

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
	var grid = SpaceGrid(2.5,2.5,amount,anchor);
	for (var item = 0; item < peopleList.length; item++) {
		var obj : GameObject = Instantiate(Resources.Load("Prefabs/Person"));
		obj.transform.parent = gameObject.transform;
		obj.transform.position = Vector3(grid[item,0], grid[item,1], -3);
		obj.GetComponent(scrPerson).personNum = peopleList[item];
		if (peopleList[item] == winnerNum) {
			obj.GetComponent(scrPerson).winner = true;
		}
	}
	
	sndChimes.Play();
}

function Start () {
	SetSounds();
	gameObject.name = "conLevel";
	Restart();
	CreateInterface();
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
}

function answerCorrect () {
	correctAnswers++;
	ShuffleRoundDuplicates(peopleAmount,winners);
	var i = Random.Range(0,audioSource.Length);
	audioSource[i].Play();
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
		case 2: props = [120,6,5,12,3]; break;
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
	GetComponent(AudioSource).Stop();
	sndSuccess.Play();
	gameWon = true;
	DestroyPeople();
	DestroyTimer();
	var obj : GameObject = Instantiate(Resources.Load("Prefabs/MenuEnd"));
}

function TimeOut () {
	GetComponent(AudioSource).Stop();
	sndFail.Play();
	DestroyPeople();
	DestroyTimer();
	var obj : GameObject = Instantiate(Resources.Load("Prefabs/MenuEnd"));
}

function Restart() {
	LevelProperties();
	ShuffleRoundDuplicates(peopleAmount,winners);
	CreateTimer();
	GetComponent(AudioSource).Play();
	gameWon = false;
	correctAnswers = 0;
}

function NextLevel () {
	if (level < totalLevels) {
		level++;
		Restart();
	}
}

function SetSounds () {
	audioClip[0] = Resources.Load("Sounds/snd_respect");
	audioClip[1] = Resources.Load("Sounds/snd_so_easy");
	audioClip[2] = Resources.Load("Sounds/snd_yeah");
	audioClip[3] = Resources.Load("Sounds/snd_thats_right");
	
	audioSource = new AudioSource[audioClip.Length];
	for (var n = 0; n < audioSource.Length; n++) {
		audioSource[n] = gameObject.AddComponent(AudioSource);
		audioSource[n].clip = audioClip[n];
		audioSource[n].loop = false;
		audioSource[n].playOnAwake = false;
	}
	sndSuccess = gameObject.AddComponent(AudioSource);
	sndSuccess.clip = Resources.Load("Sounds/snd_clapping");
	
	sndFail = gameObject.AddComponent(AudioSource);
	sndFail.clip = Resources.Load("Sounds/snd_time_up");
	
	sndChimes = gameObject.AddComponent(AudioSource);
	sndChimes.clip = Resources.Load("Sounds/snd_chimes");
	
	coinsAudioClip[0] = Resources.Load("Sounds/snd_coin1");
	coinsAudioClip[1] = Resources.Load("Sounds/snd_coin2");
	coinsAudioClip[2] = Resources.Load("Sounds/snd_coin3");
	coinsAudioClip[3] = Resources.Load("Sounds/snd_coin4");
	coinsAudioClip[4] = Resources.Load("Sounds/snd_coin5");
	coinsAudioClip[5] = Resources.Load("Sounds/snd_coin6");
	coinsAudioClip[6] = Resources.Load("Sounds/snd_coin7");
	coinsAudioClip[7] = Resources.Load("Sounds/snd_coin8");
	
	coinsAudioSource = new AudioSource[coinsAudioClip.Length];
	for (var i = 0; i < coinsAudioSource.Length; i++) {
		coinsAudioSource[i] = gameObject.AddComponent(AudioSource);
		coinsAudioSource[i].clip = coinsAudioClip[i];
		coinsAudioSource[i].loop = false;
		coinsAudioSource[i].playOnAwake = false;
	}
}

function PlayCoinSound () {
	var i = Random.Range(0,coinsAudioSource.Length);
	coinsAudioSource[i].Play();
}

function CreateInterface () {
	var obj : GameObject = Instantiate(Resources.Load("Prefabs/conInterface"));
	var objScript : scrInterface = obj.GetComponent(scrInterface);
	objScript.controller = gameObject;
	objScript.winners = winners;
	objScript.chosens = chosens;
}
/*
function DirectionsText () {
	var textToShow = "Find " + winners.ToString() + " look-alikes";
	var obj : GameObject = Instantiate(Resources.Load("Prefabs/Texts/objTextHeader"));
	obj.GetComponent(TextMesh).text = textToShow;
	obj.transform.position = Vector3(0,6,-6);
	
	yield WaitForSeconds(3);
	
	gameObject.Destroy(obj);
}

function FindsText () {
	var textToShow = chosens.ToString() + " / " + winners.ToString();
	var obj : GameObject = Instantiate(Resources.Load("Prefabs/Texts/objTextHeader"));
	obj.controller = gameObject;
	obj.transform.position = Vector3(0,7,-6);
}
*/





