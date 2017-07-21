class PadControls{
	private keys:KeyInput
	private currentDesctiption:string
	private direction:Phaser.Point
	
	constructor(game:Phaser.Game){
		this.direction=new Phaser.Point(0,0);
		this.keys=game.input.keyboard.createCursorKeys();
	}
	
	getDescription():string{
		return this.currentDesctiption;
	}

	get():Phaser.Point{
	    return this.direction;
	}

	update(){
		if (this.keys.left.isDown){
			this.currentDesctiption="left";
			this.direction.x=-1;
	        //this.shipBody.body.acceleration.x=-this.acceleration;
	    }else if(this.keys.right.isDown){
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
	}
}