#pragma strict

var controller : GameObject;

var txtChosens : GameObject;
var txtTotalCoins : GameObject;
var txtDirections : GameObject;

var winners : int;
var chosens : int;

function Start () {
	LevelInterface();
}

function Update () {

	if (controller) {
		chosens = controller.GetComponent(scrLevel).chosens;
		winners = controller.GetComponent(scrLevel).winners;
	}
	
	if (txtChosens) {
		txtChosens.GetComponent(TextMesh).text = chosens.ToString() + " / " + winners.ToString();
	}
	if (txtTotalCoins) {
		txtTotalCoins.GetComponent(TextMesh).text = scrConGame.totalCoins;
	}
}


function CreateTextObject (objName : string) {
	var obj : GameObject = Instantiate(Resources.Load("Prefabs/Texts/" + objName));
	gameObject.transform.parent = gameObject.transform;
	obj.transform.position = Vector3(0,0,-6);
	return obj;
}

function LevelInterface () {
	txtChosens = CreateTextObject("objTextHeader");
	txtChosens.transform.localPosition = (0,7,-6);
	
	txtTotalCoins = CreateTextObject("objTextHeader");
	txtTotalCoins.transform.localPosition = (5,7,-6);
	
	txtDirections = CreateTextObject("objTextHeader");
	txtDirections.transform.localPosition = (0,6,-6);
	txtDirections.GetComponent(TextMesh).text = "Find " + winners.ToString() + " look-alikes";
	yield WaitForSeconds(3);
	gameObject.Destroy(txtDirections);
}