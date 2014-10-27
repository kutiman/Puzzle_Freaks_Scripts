#pragma strict

var startTime = 0;
var timeToCount = 0.0;
var timeEnded = false;
var ticks : Array = new Array(AudioSource);
var audioClip = new AudioClip[10];
var audioSource = new AudioSource[10];

var lastSecond : int = 0;
var newSecond : int = 0;
var counter : float;

function Start () {
	gameObject.name = "objTimer";
	startTime = Time.time;
	SetSounds ();
}

function Update () {
	counter = (startTime + timeToCount) - Time.time;
	if (Input.GetMouseButtonDown(0)) {
		Debug.Log(counter);
	}
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

	newSecond = Mathf.CeilToInt(counter);
	if (newSecond > 0 && newSecond <= 5 && newSecond < lastSecond){
		audioSource[newSecond * 2 - 1].Play();
	}
	
	lastSecond = Mathf.CeilToInt(counter);
}

function SetSounds () {
	var ticksAmount = 10;
	for (var i = 0; i < ticksAmount; i++) {
		audioClip[i] = Resources.Load("Sounds/snd_clock_tick" + (i + 1).ToString());
	}
	
	audioSource = new AudioSource[audioClip.Length];
	for (var n = 0; n < audioSource.Length; n++) {
		audioSource[n] = gameObject.AddComponent(AudioSource);
		audioSource[n].clip = audioClip[n];
		audioSource[n].loop = false;
		audioSource[n].playOnAwake = false;
	}
}
