#pragma strict

var nextStep = 0.0;
var zAngle : float = 0;

function Start () {

}

function OnMouseDown () {}
	

function Dance (danceSpeed : float) {

	transform.rotation = Quaternion.Euler(0,0,zAngle);
	if(Time.time >= nextStep){
			Debug.Log("Pressed left click.");
			zAngle += 90;
			nextStep = Time.time + danceSpeed;
	}
}

function Update () {
	Dance(0.45);
}