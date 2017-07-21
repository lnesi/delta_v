///<reference path="objects/SpaceShip"/>
class Enemy extends SpaceShip{
	state:PlayState
	
	moveWeight:number=0;
	moveRelease:number=0;

	constructor(state:PlayState){
		super(state.game);
		this.state=state;
		this.shipBody = new Phaser.Sprite(state.game,0,0,  'mainsprite', 'enemyBlack2.png');
		state.physics.enable(this.shipBody,Phaser.Physics.ARCADE);
		this.shipBody.anchor.setTo(0.5,0.5);

		this.addChild(this.shipBody);

		
		

	}

	init(){

	}
	
	update(){
		 //console.log(this.state.hero.physics_body.position.x,this.body.body.position.x);
		 //this.body.body.position.x=this.state.hero.physics_body.position.x-(this.body.width/2);
		// this.body.body.position.y=this.state.hero.physics_body.position.y-(this.body.height/2);
		 //this.body.body.velocity.x=this.state.hero.physics_body.position.x-(this.getX()+this.moveWeight);
		 //this.body.body.velocity.y=this.state.hero.physics_body.position.y-(this.getY()+this.moveWeight);
		 //var vY=this.state.hero.physics_body.position.y-this.body.body.position.y-this.moveWeight;
		 //this.body.body.velocity.y=vY//>this.moveRelease?vY:this.moveRelease;
		 this.shipBody.body.velocity.y=this.state.hero.getY()-this.getY()
		 this.shipBody.body.velocity.x=this.state.hero.getX()-this.getX()
		 //Physics
		 this.game.physics.arcade.overlap(this.shipBody, this.state.hero.gun.bullets, this.collisionHandler, null, this);
	}

	collisionHandler(enemy:Phaser.Sprite,bullet:Phaser.Sprite){
		bullet.kill();
		var explosion=new Phaser.Sprite(this.state.game,this.getX(),this.getY(),'explosion');
		explosion.anchor.setTo(0.5,0.5);
		explosion.animations.add('explosion');
		explosion.animations.getAnimation('explosion').play(30,false,true);
		this.state.enemyLayer.add(explosion);
		
		this.destroy(true);
		console.log("COLLISION bullet");
	}
}