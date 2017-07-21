///<reference path="objects/SpaceShip"/>

class HeroShip extends SpaceShip{
	state: PlayState
	life:number=100
	speed:number=300
	gun:HeroGun
	movementControls:KeyInput
	fireControl:Phaser.Key
	constructor(state:PlayState){
		super(state.game);

	 	this.state=state;
	
		this.shipBody = new Phaser.Sprite(state.game,0,0,"hero_ship_0");
		console.log(Phaser.Animation.generateFrameNames('hero_left_', 0, 5, '.png', 4));
		this.shipBody.animations.add('stand',Phaser.Animation.generateFrameNames('hero_stand_', 0, 5, '.png', 4),24,true);
		this.shipBody.animations.add('left',Phaser.Animation.generateFrameNames('hero_left_', 0, 5, '.png', 4),24,false);
		this.shipBody.animations.add('right',Phaser.Animation.generateFrameNames('hero_right_', 0, 5, '.png', 4),24,false);
		this.shipBody.animations.add('up',Phaser.Animation.generateFrameNames('hero_up_', 0, 5, '.png', 4),24,false);
		this.shipBody.animations.add('down',Phaser.Animation.generateFrameNames('hero_down_', 0, 5, '.png', 4),24,false);
		this.shipBody.animations.play('stand');
		this.shipBody.anchor.setTo(0.5,0.5);
		this.add(this.shipBody);
		this.state.physics.enable(this.shipBody, Phaser.Physics.ARCADE,true);
		this.shipBody.body.collideWorldBounds = true;

		this.gun=new HeroGunLevel1(this);

		this.movementControls=this.game.input.keyboard.createCursorKeys();
		this.fireControl=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	}
	animate(name:string){
		if(this.shipBody.animations.currentAnim.name!=name)  this.shipBody.animations.play(name);
	}

	update(){
		//this.shipBody.animations.play("stand");
		this.shipBody.body.velocity.x=0;
		this.shipBody.body.velocity.y=0;

		if (this.movementControls.left.isDown){
			this.animate('left');
			
	        this.shipBody.body.velocity.x=-this.speed;
	    }else if(this.movementControls.right.isDown){
	    	this.animate('right');
	        this.shipBody.body.velocity.x=this.speed;
	    }else if(this.movementControls.up.isDown){
	    	this.animate('up');
	        this.shipBody.body.velocity.y=-this.speed;
	    }else if(this.movementControls.down.isDown){
	    	this.animate('down');
	        this.shipBody.body.velocity.y=this.speed;
	    }else{
	    	this.animate('stand');
	    }

	    if(this.fireControl.isDown){
             this.fire();
        }

	}

	fire(){
	 	this.gun.fire();
	}
	

}