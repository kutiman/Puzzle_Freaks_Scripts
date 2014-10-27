#pragma strict

var controller : GameObject;
var level : int;
var gameWon = false;
var controllerScript : scrLevel;

function Start () {
	gameObject.name = "MenuEnd";
	controller = GameObject.Find("conLevel");
	controllerScript = controller.GetComponent(scrLevel);
	level = controllerScript.level;
	gameWon = controllerScript.gameWon;
	HeaderText();
	RestartButton ();
	NextButton();
}

function Update () {

}

function RestartButton () {
	var btn : GameObject = Instantiate(Resources.Load("Prefabs/Buttons/btnRestart"));
	btn.transform.parent = gameObject.transform;
	btn.transform.localPosition = Vector3(0,-2.5,-1);
}

function NextButton () {
	if (gameWon && level < controllerScript.totalLevels) {
		var btn : GameObject = Instantiate(Resources.Load("Prefabs/Buttons/btnNext"));
		btn.transform.parent = gameObject.transform;
		btn.transform.localPosition = Vector3(0,-1,-1);
	}
}

function HeaderText () {
	if (gameWon) {
		var textArray : Array = ["Sweet", "Amazing", "Congratz", "Yeah!", "Boom!", "Super", "Yo!"];
		var i = Random.Range(0, textArray.length);
		var obj : GameObject = Instantiate(Resources.Load("Prefabs/Texts/objTextHeader"));
		obj.transform.parent = gameObject.transform;
		obj.transform.localPosition = Vector3(0,2,-1);
		var tm : TextMesh = obj.GetComponent(TextMesh);
		tm.text = textArray[i];
	}
}
function DestroySelf() {
	gameObject.Destroy(gameObject);
}