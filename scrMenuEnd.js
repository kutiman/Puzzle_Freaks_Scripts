#pragma strict

var level : int;
var gameWon = false;

function Start () {
	
	if (gameWon) {
		
	}
}

function Update () {

}

function RestartButton () {
	var btn : GameObject = Instantiate(Resources.Load("Prefabs/Buttons/btnRestart"));
	btn.transform.parent = gameObject.transform;
	btn.transform.localPosition = Vector3(0,-2,-1);
}