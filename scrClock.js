#pragma strict

function Start () {

}

function Update () {
	GetComponent(TextMesh).text = "Time: " + (Mathf.FloorToInt(Time.time)).ToString();
}