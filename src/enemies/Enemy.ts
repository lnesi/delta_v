class Enemy extends SpaceShip{
	public static NORMAL:number=0;
	public static KAMIKAZE:number=1;
	public static SWAP:number=2;
	public static SWEEP:number=3;

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
	public on:boolean=false;
	public target:Phaser.Point;
	public clock:number=0
	public timeOffset:number=0;
	public scoreValue:number;
	public weapon:EnemyWeapon
	public type:number
	public spawnChange:number=100;
	public moveTracker:number=0;
	
	constructor(state:PlayState,index:number,sprite_id:string,type:number=null,acceleration:number=null,maxSpeed:number=500,minSpeed:number=100,scoreValue:number=10){
		super(state.game);
		this.state=state;
		this.index=index;
		
	
		this.maxSpeed=maxSpeed;
		this.minSpeed=minSpeed;
		this.scoreValue=scoreValue;
		
		this.target=new Phaser.Point(Phaser.Math.between(this.offsetWidth,Game.globalWidth-this.offsetWidth),Game.globalHeight+this.offsetHeight);
		
		if(type){
			this.type=type
		}else{
			this.type=Enemy.NORMAL;
		}
		
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

	addWeapon(weapon:EnemyWeapon){
		this.weapon=weapon;	
	}

	init(x:number=null,y:number=null){
		if(!this.weapon) this.weapon=new EnemyWeapon(this,'enemy_fire_bullet',null);
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

		this.deltaTime=this.state.game.time.now+1000;
		this.on=true;

	}

	update(){
		if(this.on && this.state.game.time.now>this.deltaTime){
			
			this.clock++;
			switch(this.type){
				case 1:
					this.target=new Phaser.Point(this.state.hero.getX(),this.state.hero.getY());
					this.moveToTarget();
					this.lookAtHero();
					break;
				case 2:
					if(this.clock%this.spawnChange==0){
						if(this.target.x==0){
							this.target.x=Game.globalWidth
						}else{
							this.target.x=0
						}
					}
					this.moveToTarget();
				case 3:
					this.moveTracker+=0.01;
					this.target.x=Math.sin(this.moveTracker)*Game.globalWidth;		
				default:
					this.moveToTarget();
					break;

			}
			this.lookAtHero();
			if(this.life>0) this.checkCollision();
			this.weapon.fireAtSprite(this.state.hero.shipBody);
			
		}
		super.update();
	}
	
	
	checkCollision(){
		if(this.state.hero.active){
			this.game.physics.arcade.overlap(this.state.hero.shipBody,this.weapon.bullets,this.weaponHitHandler,null,this);
			this.game.physics.arcade.overlap(this.shipBody, this.state.hero.weapon.bullets, this.hitHandler, null, this);
			this.game.physics.arcade.overlap(this.shipBody, this.state.hero.shipBody, this.collisionHandler, null, this);
		}
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

	
	weaponHitHandler(heroBody:Phaser.Sprite,bullet:Phaser.Sprite){
		
		
		if(this.state.hero.life>=0){
			this.state.hero.life=this.state.hero.life-this.weapon.damage;
		}else{
			this.state.hero.kill();
		}
		bullet.kill();

		
	}

	hitHandler(enemy:Phaser.Sprite,bullet:Phaser.Sprite){
		//this.life=0;
		bullet.kill();
		this.state.score+=this.scoreValue;
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