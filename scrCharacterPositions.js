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

public function CharacterPositionsScattered (amount : int) {

	var grid : float[,] = new float[amount,2]; 
	var i = 0;
	while (i < amount){
	
		var pos : Vector2 = Vector2(Random.Range(-6,6),Random.Range(-6,6));
		var tooClose = false;
		for (var n = 0; n < amount; n++) {
			var vec : Vector2 = Vector2(grid[n,0],grid[n,1]);
			
			if (Vector2.Distance(pos,vec) < 1.7) {
				tooClose = true;
			}
		}
		if (!tooClose) {
			grid[i,0] = pos.x;
			grid[i,1] = pos.y;
			i++;		
		}

	}
	return grid;
};