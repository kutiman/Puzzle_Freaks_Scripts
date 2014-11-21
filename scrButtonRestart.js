#pragma strict
public class scrButtonRestart extends scrButtonParent {
	var menu : GameObject;
	function Start () {
		super();
		menu = GameObject.Find("MenuEnd");
		var obj : GameObject = Instantiate(Resources.Load("Prefabs/objText"));
		obj.transform.parent = gameObject.transform;
		obj.transform.localPosition = Vector3(0,0,-1);
		var tm : TextMesh = obj.GetComponent(TextMesh);
		tm.text = "Restart";
	}

	function Update () {
		
	}
	
	function OnMouseDown () {
		var obj : GameObject = GameObject.Find("conLevel");
		obj.GetComponent(scrLevelDuplicates).Restart();
		menu.GetComponent(scrMenuEnd).DestroySelf();
	}
}