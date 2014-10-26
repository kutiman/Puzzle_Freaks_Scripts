#pragma strict

function Start () {
	gameObject.name = "MenuLevel";
	//PlayButton();
	LevelButtons();
}

function Update () {

}

function PlayButton () {
	//var obj : GameObject = Instantiate(Resources.Load("Prefabs/Buttons/btnPlay"));
	//obj.transform.parent = gameObject.transform;
}

function Play () {
	var cl : GameObject = Instantiate(Resources.Load("Prefabs/conLevel"));
	gameObject.Destroy(gameObject);
}

function LevelButtons () {
	var levelAmount = 20;
	var columns = 5;
	var anchorX = -3;
	var anchorY = -3;
	for (var i = 0; i < levelAmount; i++) {
		var btn : GameObject = Instantiate(Resources.Load("Prefabs/Buttons/btnLevel"));
		btn.transform.parent = gameObject.transform;
		
		var x = anchorX + (i % columns) * 2;
		var y = anchorY + Mathf.Floor(i / columns) * 2;
		btn.transform.localPosition = Vector3(x,y,-3);
		btn.GetComponent(scrButtonLevel).level = i + 1;
	}
}

function DestroySelf() {
	gameObject.Destroy(gameObject);
}