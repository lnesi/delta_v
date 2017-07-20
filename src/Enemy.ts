class Enemy extends Phaser.Group{
	state:PlayState
	body:Phaser.Sprite
	
	moveWeight:number=0;
	moveRelease:number=0;

	constructor(state:PlayState){
		super(state.game);
		this.state=state;
		this.body = new Phaser.Sprite(state.game,0,0,  'mainsprite', 'enemyBlack2.png');
		state.physics.enable(this.body,Phaser.Physics.ARCADE);
		this.body.anchor.setTo(0.5,0.5);

		this.addChild(this.body);

		
		

	}

	init(){
		console.log("hero",this.state.hero.physics_body.position);
		console.log("enemy",this.body.body.position);

	}
	
	setX(x:number){
		this.body.body.position.x=x
	}
	setY(y:number){
		this.body.body.position.y=y
	}
	getX():number{
		return this.body.body.position.x+(this.body.width/2)
	}
	getY():number{
		return this.body.body.position.y+(this.body.height/2)
	}
	update(){
		 //console.log(this.state.hero.physics_body.position.x,this.body.body.position.x);
		 //this.body.body.position.x=this.state.hero.physics_body.position.x-(this.body.width/2);
		// this.body.body.position.y=this.state.hero.physics_body.position.y-(this.body.height/2);
		 this.body.body.velocity.x=this.state.hero.physics_body.position.x-(this.getX()+this.moveWeight);
		 this.body.body.velocity.y=this.state.hero.physics_body.position.y-(this.getY()+this.moveWeight);
		 //var vY=this.state.hero.physics_body.position.y-this.body.body.position.y-this.moveWeight;
		 //this.body.body.velocity.y=vY//>this.moveRelease?vY:this.moveRelease;
		 
		 //Physics
		 this.game.physics.arcade.overlap(this.body, this.state.hero.gun.bullets, this.collisionHandler, null, this);
	}

	collisionHandler(enemy:Phaser.Sprite,bullet:Phaser.Sprite){
		bullet.destroy();
		var explosion=new Phaser.Sprite(this.state.game,this.getX(),this.getY(),'explosion');
		explosion.anchor.setTo(0.5,0.5);
		explosion.animations.add('explosion');
		explosion.animations.getAnimation('explosion').play(30,false,true);
		this.state.enemyLayer.add(explosion);
		
		this.destroy(true);
		console.log("COLLISION bullet");
	}
}