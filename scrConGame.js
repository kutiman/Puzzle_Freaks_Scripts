#pragma strict

static var steps : int = 0;
static var totalCoins : int = 0;
static var minCoins : int = 1;
static var maxCoins : int = 1;
static var level : int = 0;
static var magnetPower = 50;

//Placement list

function SpaceGrid (horSpace : float, verSpace : float, amount : int, anchor : Array) {

	var ancX : float = anchor[0];
	var ancY : float = anchor[1];
	var grid : float[,] = new float[amount,2]; 
		
	for (var i = 0; i < amount; i++){
	
		var pos : Array = [null,null];
	    if (i % 2 == 0)
	    {
	        pos[0] = ancX + horSpace/2 + (Mathf.FloorToInt(i/6) * horSpace);        
	        switch (i % 3) {
	            case 0: pos[1] = ancY; break;
	            case 1: pos[1] = ancY - verSpace; break;
	            case 2: pos[1] = ancY + verSpace; break;
	        }
	    }
	    else {
	        pos[0] = ancX - horSpace/2 - (Mathf.FloorToInt(i/6) * horSpace);
	        switch (i % 3) {
	            case 0: pos[1] = ancY + verSpace; break;
	            case 1: pos[1] = ancY; break;
	            case 2: pos[1] = ancY - verSpace; break;
	        }
	    }
	    grid[i,0] = pos[0];
	    grid[i,1] = pos[1];
	}
	return grid;
	Debug.Log("created grid");
};

// Sounds

// games level status list
/*
// gym level state
globalvar gym_levels_state;
levels_amount = 25;
gym_levels_state[0,0] = true;
for (i = 1; i <= levels_amount; i++;)
{
    gym_levels_state[i, 0] = false;
}
*/

function CreatePeople (amount : int) {
	var anchor : Array = [0,0];
	var grid = SpaceGrid(2,2,amount,anchor);
	for (var i = 0; i < amount; i++) {
		var obj : GameObject = Instantiate(Resources.Load("Prefabs/Person"));
		obj.rigidbody.position = Vector3(grid[i,0], 3, grid[i,1]);
		obj.GetComponent(scrPerson).personNum = i + 1;
	}
}

function Start () {
	CreatePeople (30);
}

