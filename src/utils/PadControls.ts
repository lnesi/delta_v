class PadControls{
	private keys:KeyInput
	private currentDesctiption:string
	private direction:Phaser.Point
	private game:Phaser.Game
	constructor(game:Phaser.Game){
		this.game=game;
		this.direction=new Phaser.Point(0,0);
		this.keys=game.input.keyboard.createCursorKeys();
	}
	
	getDescription():string{
		return this.currentDesctiption;
	}

	get():Phaser.Point{
	    return this.direction;
	}

	update(hero:HeroShip){
	
		if (this.keys.left.isDown && !this.keys.right.isDown){
			this.currentDesctiption="left";
			this.direction.x=-1;
	        //this.shipBody.body.acceleration.x=-this.acceleration;
	    }else if(this.keys.right.isDown && !this.keys.left.isDown){
	    	this.currentDesctiption="right";
	    	this.direction.x=1;
	        //this.shipBody.body.acceleration.x=this.acceleration;
	    }else{
	    	this.direction.x=0;
	    }

	    if(this.keys.up.isDown){
	    	
	    	this.currentDesctiption="up";
	    	this.direction.y=-1;
	        //this.shipBody.body.acceleration.y=-this.acceleration;
	    }else if(this.keys.down.isDown){
	    	
	    	this.currentDesctiption="down";
	        this.direction.y=1;
	        //this.shipBody.body.acceleration.y=this.acceleration;
	    }else{
			this.direction.y=0;
	    }
	    if(this.direction.x==0 && this.direction.y==0){
	    	this.currentDesctiption="stand";
	    }

	    this.processPointer(this.game.input.mousePointer,hero);
		if(this.game.input.pointer1.isDown && !this.game.input.pointer2.isDown){
			this.processPointer(this.game.input.pointer1,hero);
		}
		if(this.game.input.pointer2.isDown && !this.game.input.pointer1.isDown){
			this.processPointer(this.game.input.pointer2,hero);
		}
		

	   
	}

	processPointer(pointer:Phaser.Pointer,hero:HeroShip){
		if(pointer.isDown){
	    	if(pointer.worldY>hero.getY()){
				this.currentDesctiption="up";
				this.direction.y=1;
				
	    	}else if(pointer.worldY<hero.getY()){
				this.currentDesctiption="down";
				this.direction.y=-1;
	    	}
	    }
		if(pointer.isDown){
	    	if(pointer.worldX>hero.getX()){
				this.currentDesctiption="right";
				this.direction.x=1;
				
	    	}else if(pointer.worldX<hero.getX()){
				this.currentDesctiption="left";
				this.direction.x=-1;
	    	}
	    }
	    

	}
}