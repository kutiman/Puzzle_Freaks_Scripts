#pragma strict

var startTime = 0;
var timeToCount = 0.0;


function Start () {
	startTime = Time.time;
	timeToCount = 10.0;
}

function Update () {
	var counter = (startTime + timeToCount) - Time.time;
	if (counter > 0) {
		GetComponent(TextMesh).text = "Time Left: " + Mathf.CeilToInt(counter).ToString();
	}
	else {
		GetComponent(TextMesh).text = "out of time";
	}
}