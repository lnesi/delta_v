///<reference path="objects/SpaceShip"/>
class Enemy extends SpaceShip{
	state:PlayState
	
	moveWeight:number=0;
	moveRelease:number=0;
	accelaration:number=0;
	maxSpeed:number=0;
	constructor(state:PlayState,sprite_id:string,maxSpeed:number=50,accelaration:number=10){
		super(state.game);
		this.maxSpeed=maxSpeed;
		this.accelaration=accelaration;
		this.state=state;
		
		this.shipBody = new Phaser.Sprite(state.game,0,0,sprite_id);
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

		 var a = this.state.hero.getX()-this.getX();
		 var b = this.state.hero.getY()-this.getY();

		 var vx=this.maxSpeed*Math.sin(Math.atan2(a,b));
		 var vy=this.maxSpeed*Math.cos(Math.atan2(a,b));


		// console.log(vx,vy)
		 this.shipBody.body.acceleration.y=vy;
		 this.shipBody.body.rotation=Math.atan2(a,b)*(-180 / Math.PI);
		 this.shipBody.body.acceleration.x=vx;
		
		
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