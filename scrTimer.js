#pragma strict

var startTime = 0;
var timeToCount = 0.0;
var timeEnded = false;

function Start () {
	gameObject.name = "objTimer";
	startTime = Time.time;
}

function Update () {
	var counter = (startTime + timeToCount) - Time.time;
	if (counter < 0) {counter = 0;}
	var seconds : int = Mathf.CeilToInt(counter % 60);
	var minutes : int = Mathf.FloorToInt(counter/60);
	var bracks = ":";
	if (seconds < 10) {bracks = ":0";}
	var timerText = minutes.ToString() + bracks + seconds.ToString();
	GetComponent(TextMesh).text = timerText;
	
	if (counter == 0 && !timeEnded) {
		var con : GameObject = GameObject.Find("conLevel");
		con.GetComponent(scrLevel).TimeOut();
		timeEnded = true;
	}
}