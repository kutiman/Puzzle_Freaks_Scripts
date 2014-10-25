#pragma strict

function Start () {
	gameObject.name = "MenuLevel";
	PlayButton();
}

function Update () {

}

function PlayButton () {
	var obj : GameObject = Instantiate(Resources.Load("Prefabs/Buttons/btnPlay"));
	obj.transform.parent = gameObject.transform;
}

function Play () {
	var cl : GameObject = Instantiate(Resources.Load("Prefabs/conLevel"));
	gameObject.Destroy(gameObject);
}