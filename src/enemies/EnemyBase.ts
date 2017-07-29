///<reference path="../objects/SpaceShip.ts"/>

class EnemyBase extends SpaceShip{
	public offsetWidth:number=100;
	public offsetHeight:number=100;
	public state:PlayState
	public index:number
	public life:number=1;
	public moveWeight:number;
	public moveRelease:number;
	public acceleration:number;
	public maxSpeed:number;
	public minSpeed:number;
	public fireTime:number;
	public on:boolean=false;
	public target:Phaser.Point=new Phaser.Point(0,0);
	public clock:number=0
	public timeOffset:number=0;
	public damage:number
	constructor(state:PlayState,index:number,sprite_id:string,acceleration:number=null,fireTime:number=1000,maxSpeed:number=500,minSpeed:number=100,damage:number=10){
		super(state.game);
		this.state=state;
		this.index=index;
		this.damage=damage;
		this.fireTime=fireTime;
		this.maxSpeed=maxSpeed;
		this.minSpeed=minSpeed;
		if(acceleration===null){
			this.acceleration=Phaser.Math.between(this.minSpeed,this.maxSpeed);
		}else{
			this.acceleration=acceleration;
		}
		
		
		
		this.shipBody = new Phaser.Sprite(state.game,0,0,sprite_id);
		state.physics.enable(this.shipBody,Phaser.Physics.ARCADE);
		this.shipBody.anchor.setTo(0.5,0.5);

		//this.shipBody.body.syncBounds=true;
		this.shipBody.body.setCircle(this.shipBody.height/2.5, 0, 0)
		this.addChild(this.shipBody);

		this.shipBody.body.bounce.x=0.5;
		this.shipBody.body.bounce.y=0.5;
		//this.shipBody.body.collideWorldBounds=true;
		

	}

	init(x:number=null,y:number=null){
		if(x===null){
			this.setX(Phaser.Math.between(this.offsetWidth,Game.globalWidth-this.offsetWidth));
		}else{
			this.setX(x);
		}
		if(y===null){
			this.setY(-this.offsetHeight);
		}else{
			this.setY(y);
		}
		this.deltaTime=this.state.game.time.now+this.fireTime;
		
		this.on=true;

	}

	update(){
		if(this.on && this.state.game.time.now>this.deltaTime){
			this.clock++;
			this.moveToTarget();
			this.lookAtHero();
			if(this.life>0)
			 	this.checkCollision();
			this.fire();
			
		}
		super.update();
	}
	
	
	checkCollision(){
		this.game.physics.arcade.overlap(this.state.hero.shipBody,this.weapon.bullets,this.weaponHitHandler,null,this);
		this.game.physics.arcade.overlap(this.shipBody, this.state.hero.weapon.bullets, this.hitHandler, null, this);
		this.game.physics.arcade.overlap(this.shipBody, this.state.hero.shipBody, this.collisionHandler, null, this);
	}

	moveToTarget(acceleration:number=null){
		if(acceleration===null) acceleration=this.acceleration;
		let a = this.target.x-this.getX();
		let b = this.target.y-this.getY();
		var dx=acceleration*Math.sin(Math.atan2(a,b));
		var dy=acceleration*Math.cos(Math.atan2(a,b));
		this.shipBody.body.velocity.y=dy/2;
		this.shipBody.body.velocity.x=dx/2;
	}

	setToTarget(){
		this.setX(this.target.x);
		this.setY(this.target.y);
	}

	lookAtTarget(){
		let aTarget = this.target.x-this.getX();
		let bTarget = this.target.y-this.getY();
		this.shipBody.body.rotation=Math.atan2(aTarget,bTarget)*(-180 / Math.PI); 
	}

	lookAtHero(){
		let aHero=this.state.hero.getX()-this.getX();
		let bHero=this.state.hero.getY()-this.getY();
		this.shipBody.body.rotation=Math.atan2(aHero,bHero)*(-180 / Math.PI); 
	}

	fire(){
		//this.deltaTime=this.state.game.time.now+this.fireTime;
		if(this.state.game.time.now>this.deltaTime) this.weapon.fireAtSprite(this.state.hero.shipBody);
		//this.weapon.sfx.play();
	}
	weaponHitHandler(heroBody:Phaser.Sprite,bullet:Phaser.Sprite){
		//console.log("HIT HERO")
		bullet.kill();
	}

	hitHandler(enemy:Phaser.Sprite,bullet:Phaser.Sprite){
		//this.life=0;
		bullet.kill();
		this.explode();
		//console.log("COLLISION bullet");
	}
	explode(){
		this.on=false;
		var explosion=new Phaser.Sprite(this.state.game,this.getX(),this.getY(),'explosion');
		explosion.anchor.setTo(0.5,0.5);
		explosion.animations.add('explosion');
		explosion.animations.getAnimation('explosion').play(30,false,true);
		this.state.enemyLayer.add(explosion);
		this.shipBody.kill();
		this.toDestroy=true;
	}

	collisionHandler(){
		//this.life=0;
		this.explode();
		//console.log("COLLISION hero");
	}
}