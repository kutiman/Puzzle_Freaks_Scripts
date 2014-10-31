#pragma strict

var timeBorn : float;
var lifetime : float;

function Start () {
	timeBorn = Time.time;
	lifetime = 1.5;
}

function Update () {
	transform.position.y += 0.01;
	if (timeBorn + (lifetime / 2) < Time.time) {
		gameObject.GetComponent(TextMesh).color =  Color.Lerp(GetComponent(TextMesh).color, Color.clear, Time.deltaTime * lifetime);
	}
	
	if (timeBorn + lifetime < Time.time) {
		gameObject.Destroy(gameObject);
	}
}