///<reference path="objects/SpaceShip"/>

class HeroShip extends SpaceShip{
	state: PlayState
	life:number=100
	speed:number=300
	gun:HeroGun
	movementControls:KeyInput
	fireControl:Phaser.Key
	currentMovement:string="stand"
	deltaTime:number=0;
	constructor(state:PlayState){
		super(state.game);

	 	this.state=state;
	
		this.shipBody = new Phaser.Sprite(state.game,0,0,"hero_ship_0");
		
		this.shipBody.animations.add('stand',Phaser.Animation.generateFrameNames('hero_stand_', 0, 5, '.png', 4),24,true);
		this.shipBody.animations.add('left',Phaser.Animation.generateFrameNames('hero_left_', 0, 5, '.png', 4),24,false);
		this.shipBody.animations.add('right',Phaser.Animation.generateFrameNames('hero_right_', 0, 5, '.png', 4),24,false);
		this.shipBody.animations.add('up',Phaser.Animation.generateFrameNames('hero_up_', 0, 5, '.png', 4),24,false);
		this.shipBody.animations.add('down',Phaser.Animation.generateFrameNames('hero_down_', 0, 5, '.png', 4),24,false);
		this.shipBody.animations.add('fire_stand',Phaser.Animation.generateFrameNames('hero_fire_stand_', 0, 2, '.png', 4),24,false);
		this.shipBody.animations.add('fire_up',Phaser.Animation.generateFrameNames('hero_fire_stand_', 0, 2, '.png', 4),24,false);
		this.shipBody.animations.add('fire_down',Phaser.Animation.generateFrameNames('hero_fire_stand_', 0, 2, '.png', 4),24,false);
		this.shipBody.animations.add('fire_left',Phaser.Animation.generateFrameNames('hero_fire_left_', 0, 2, '.png', 4),24,false);
		this.shipBody.animations.add('fire_right',Phaser.Animation.generateFrameNames('hero_fire_right_', 0, 2, '.png', 4),24,false);
		this.shipBody.animations.getAnimation("fire_stand").onComplete.add(this.gunFire.bind(this));
		this.shipBody.animations.getAnimation("fire_up").onComplete.add(this.gunFire.bind(this));
		this.shipBody.animations.getAnimation("fire_down").onComplete.add(this.gunFire.bind(this));
		this.shipBody.animations.getAnimation("fire_left").onComplete.add(this.gunFire.bind(this));
		this.shipBody.animations.getAnimation("fire_right").onComplete.add(this.gunFire.bind(this));
		this.shipBody.animations.play('stand');
		
		this.shipBody.anchor.setTo(0.5,0.5);
		this.add(this.shipBody);
		this.state.physics.enable(this.shipBody, Phaser.Physics.ARCADE,true);
		this.shipBody.body.collideWorldBounds = true;

		this.gun=new HeroGunLevel1(this);

		this.movementControls=this.game.input.keyboard.createCursorKeys();
		this.fireControl=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.deltaTime=this.state.game.time.now;
	}
	animate(name:string){
		if(this.shipBody.animations.currentAnim.name!=name && this.shipBody.animations.currentAnim.name.indexOf("fire")===-1)  return this.shipBody.animations.play(name);
	}

	update(){
		//this.shipBody.animations.play("stand");
		this.shipBody.body.velocity.x=0;
		this.shipBody.body.velocity.y=0;

		if (this.movementControls.left.isDown){
			this.currentMovement="left";
	        this.shipBody.body.velocity.x=-this.speed;
	    }else if(this.movementControls.right.isDown){
	    	
	    	this.currentMovement="right";
	        this.shipBody.body.velocity.x=this.speed;
	    }else if(this.movementControls.up.isDown){
	    	
	    	this.currentMovement="up";
	        this.shipBody.body.velocity.y=-this.speed;
	    }else if(this.movementControls.down.isDown){
	    	
	    	this.currentMovement="down";
	        this.shipBody.body.velocity.y=this.speed;
	    }else{
	    	this.currentMovement="stand";
	    	
	    }
	    this.animate(this.currentMovement);
	    if(this.fireControl.isDown){
             this.fire();
        }

	}
	gunFire(){
		this.gun.fire();
		var cAnimation=this.shipBody.animations.getAnimation(this.currentMovement);
		cAnimation.play();
		cAnimation.stop(null,false);
		cAnimation.frame=cAnimation.frameTotal-1;
		
	}
	fire(){
		if(this.state.game.time.now>this.deltaTime){

			this.animate('fire_'+this.currentMovement);
			this.deltaTime=this.state.game.time.now+this.gun.reloadTime;

		}
	}
	

}