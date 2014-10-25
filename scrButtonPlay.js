#pragma strict

public class scrButtonPlay extends scrButtonParent {
	
	public var menu : GameObject;
	
	function Start () {
		super();
		menu = GameObject.Find("MenuLevel");
		var obj : GameObject = Instantiate(Resources.Load("Prefabs/objText"));
		obj.transform.parent = gameObject.transform;
		var tm : TextMesh = obj.GetComponent(TextMesh);
		tm.text = "Play";
	}

	function Update () {

	}
	
	function OnMouseDown () {
		menu.GetComponent(scrMenu).Play();
	}
}