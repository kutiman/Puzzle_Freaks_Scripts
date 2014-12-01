#pragma strict

static var steps : int = 0;
static var totalCoins : int = 0;
static var minCoins : int = 1;
static var maxCoins : int = 1;
static var level : int = 0;
static var magnetPower = 50;
static var beatSpeed = 0.5;
static var lastBeat : float = 0.0;

function CreateText (textString : String) {
	var go : GameObject = new GameObject("objText");
	var tm : TextMesh = go.AddComponent(TextMesh);
	tm.text = textString;
	return go;
}

function Start () {
	Menu();
}

function Menu () {
	var go : GameObject = Instantiate(Resources.Load("Prefabs/MenuLevel"));
	go.transform.parent = gameObject.transform;
}

function Update () {
	DropTheBeat();
}

function DropTheBeat () {
	if (Time.time >= lastBeat + beatSpeed) {
		lastBeat = Time.time;
	}
}
