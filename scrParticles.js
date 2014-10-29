#pragma strict

function Start () {

}

function Update () {

}

function PersonCreationBurst () {
	GetComponent(ParticleSystem).Play();
	yield WaitForSeconds(0.3);
	GetComponent(ParticleSystem).Stop();
}