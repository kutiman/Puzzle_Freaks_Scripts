#pragma strict

public var level = 0;

function Start () {
	var obj : GameObject = Instantiate(Resources.Load("Prefabs/objText"));
		obj.transform.parent = gameObject.transform;
		var tm : TextMesh = obj.GetComponent(TextMesh);
		tm.text = level.ToString();
		obj.transform.localPosition = Vector3(0,0,-1);
}

function Update () {
	
}

function PlayLevel () {
	var cl : GameObject = Instantiate(Resources.Load("Prefabs/conLevel"));
	cl.GetComponent(scrLevel).level = level;
	var menu = GameObject.Find("MenuLevel");
	menu.GetComponent(scrMenu).DestroySelf();
}

function OnMouseDown () {
	PlayLevel();
}