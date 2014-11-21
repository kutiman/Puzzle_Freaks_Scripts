#pragma strict

function Start () {

}

function Update () {

}

public function LevelProperties (level : int) {
	var props : Array = new Array();
		// [levelDuration,roundDuration,neededAnswers,peopleAmount,winners] 
	switch (level) {
		case 0: break;
		case 1: props = [120,6,5,10,2]; break;
		case 2: props = [120,6,5,30,5]; break;
		case 3: props = [120,6,5,14,2]; break;
		case 4: props = [120,6,5,16,2]; break;
		case 5: props = [120,6,5,18,2]; break;
		case 6: props = [120,6,5,20,2]; break;
		case 7: props = [120,6,5,22,2]; break;
		case 8: props = [120,6,5,24,2]; break;
		case 9: props = [120,6,5,26,2]; break;
		case 10: props = [120,6,5,28,2]; break;
		case 11: props = [120,6,5,30,2]; break;
		case 12: props = [120,6,5,10,2]; break;
		case 13: props = [120,6,5,10,2]; break;
		case 14: props = [120,6,5,10,2]; break;
		case 15: props = [120,6,5,10,2]; break;
		case 16: props = [120,6,5,10,2]; break;
		case 17: props = [120,6,5,10,2]; break;
		case 18: props = [120,6,5,10,2]; break;
		case 19: props = [120,6,5,10,2]; break;
		case 20: props = [120,6,5,10,2]; break;
		default: break;
	}
	return props;
}