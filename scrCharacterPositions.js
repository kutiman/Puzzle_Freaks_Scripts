#pragma strict

public function CharacterPositionsRows (horSpace : float, verSpace : float, amount : int, anchor : Vector2) {

	var grid : float[,] = new float[amount,2]; 
		
	for (var i = 0; i < amount; i++){
	
		var pos : Array = [null,null];
	    if (i % 2 == 0)
	    {
	        pos[0] = anchor.x + horSpace/2 + (Mathf.FloorToInt(i/6) * horSpace);        
	        switch (i % 3) {
	            case 0: pos[1] = anchor.y; break;
	            case 1: pos[1] = anchor.y - verSpace; break;
	            case 2: pos[1] = anchor.y + verSpace; break;
	        }
	    }
	    else {
	        pos[0] = anchor.x - horSpace/2 - (Mathf.FloorToInt(i/6) * horSpace);
	        switch (i % 3) {
	            case 0: pos[1] = anchor.y + verSpace; break;
	            case 1: pos[1] = anchor.y; break;
	            case 2: pos[1] = anchor.y - verSpace; break;
	        }
	    }
	    grid[i,0] = pos[0];
	    grid[i,1] = pos[1];
	}
	return grid;
};

public function CharacterPositionsScattered (amount : int, anchor : Vector2) {

	var positionsList : Vector2[];
	
	for (var i = 0; i < amount; i++){
	
		var pos : Vector2;
	    if (i % 2 == 0)
	    {
	        pos.x = anchor.x + 2.5/2 + (Mathf.FloorToInt(i/6) * 2.5);        
	        switch (i % 3) {
	            case 0: pos.y = anchor.y; break;
	            case 1: pos.y = anchor.y - 2.5; break;
	            case 2: pos.y = anchor.y + 2.5; break;
	        }
	    }
	    else {
	        pos.x = anchor.x - 2.5/2 - (Mathf.FloorToInt(i/6) * 2.5);
	        switch (i % 3) {
	            case 0: pos.y = anchor.y + 2.5; break;
	            case 1: pos.y = anchor.y; break;
	            case 2: pos.y = anchor.y - 2.5; break;
	        }
	    }
	    positionsList[i] = pos;
	}
	return positionsList;
}