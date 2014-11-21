#pragma strict

class scrLevelDuplicates extends scrLevel {

	function Update () {
		chosens = 0;
		var objs = GameObject.FindGameObjectsWithTag ("tagPerson");
		for (var obj : GameObject in objs) {
			if (obj.GetComponent(scrPerson).chosen == true) {
				chosens++;
			}
		}

		
		if (!gameWon && neededAnswers > 0 && neededAnswers == correctAnswers) {
			GameWon();
		}
		
		if (chosens == winners && !gameWon) {
			AnswerCorrect();
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

	function AnswerCorrect () {
		correctAnswers++;
		ShuffleRoundDuplicates(peopleAmount,winners);
		var i = Random.Range(0,scrSound.audioSource.Length);
		scrSound.audioSource[i].Play();
	}

	function AnswerWrong () {
		
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
	
	function Restart() {
		GetLevelProperties();
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
			GetLevelProperties();
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
}

