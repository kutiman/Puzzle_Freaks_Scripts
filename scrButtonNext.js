#pragma strict
public class scrButtonNext extends scrButtonParent {
	var menu : GameObject;
	function Start () {
		super();
		menu = GameObject.Find("MenuEnd");
		var obj : GameObject = Instantiate(Resources.Load("Prefabs/objText"));
		obj.transform.parent = gameObject.transform;
		obj.transform.localPosition = Vector3(0,0,-1);
		var tm : TextMesh = obj.GetComponent(TextMesh);
		tm.text = "Next";
	}

	function Update () {
		
	}
	
	function OnMouseDown () {
		var obj : GameObject = GameObject.Find("conLevel");
		obj.GetComponent(scrLevel).NextLevel();
		menu.GetComponent(scrMenuEnd).DestroySelf();
	}
}