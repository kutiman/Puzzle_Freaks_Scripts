#pragma strict

static var steps : int = 0;
static var totalCoins : int = 0;
static var minCoins : int = 1;
static var maxCoins : int = 1;
static var level : int = 0;
static var magnetPower = 50;

function CreateText (textString : String) {
	var go : GameObject = new GameObject("objText");
	var tm : TextMesh = go.AddComponent(TextMesh);
	tm.text = textString;
	return go;
}

function Start () {
	var go : GameObject = Instantiate(Resources.Load("Prefabs/conLevel"));
}

 

