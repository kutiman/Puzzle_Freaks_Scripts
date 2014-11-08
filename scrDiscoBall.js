#pragma strict


function Start () {
	CreateLightSources ();
}

function Update () {

}

function CreateLightSources () {
	for (var i = 0; i < 20; i++) {
		var posY : float = 18 * i;
		var objLight : GameObject;
		objLight = Instantiate(Resources.Load("Prefabs/ballLight"));
		objLight.transform.parent = gameObject.transform;
		objLight.transform.localPosition = Vector3(0,0,0);
		objLight.transform.localRotation = Quaternion.identity;
		objLight.transform.rotation.y = posY;
	}

	
}