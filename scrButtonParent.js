#pragma strict

public var sr : SpriteRenderer;
public var spr : Array;

function Start () {
	
	transform.position = (Vector3(0,0,-6));
	spr = Resources.LoadAll("Sprites/UI/button_med");
	sr = gameObject.AddComponent(SpriteRenderer);
	sr.sprite = spr[1];
}

function Update () {
	
}

function OnMouseOver () {
	sr.sprite = spr[2];
}

function OnMouseExit() {
	sr.sprite = spr[1];
}