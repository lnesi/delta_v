class Enemy extends SpaceShip{
	public static NORMAL:number=0;
	public static KAMIKAZE:number=1;
	public static SWAP:number=2;
	public static SWEEP:number=3;
	public static offsetWidth:number=250;
	public static offsetHeight:number=250;
	public static TEXTURES:Array<string>=['enemy_01','enemy_02','enemy_03'];
	public static AIs:Array<number>=[0,1,2,3];

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
	private moveTracker:number=0;
	private enterOrbit:boolean=false;
	private angleCicle:number=0;
	constructor(state:PlayState,sprite_id:string,type:number=null,acceleration:number=null,scoreValue:number=10,maxSpeed:number=500,minSpeed:number=100){
		super(state.game);
		this.state=state;
		
	
		this.maxSpeed=maxSpeed;
		this.minSpeed=minSpeed;
		this.scoreValue=scoreValue;
		
		this.target=new Phaser.Point(Phaser.Math.between(Enemy.offsetWidth,Game.globalWidth-Enemy.offsetWidth),Game.globalHeight+Enemy.offsetHeight);
		
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
		
		this.shipBody.animations.add('stand', ['stand.png'], 24, true);
		this.shipBody.animations.add('explosion', Phaser.Animation.generateFrameNames('explosion_', 0, 15, '.png', 4), 24, false);
		this.shipBody.animations.getAnimation('explosion').onComplete.add(this.onExplosion.bind(this));
		this.shipBody.animations.play('stand');
	}

	addWeapon(weapon:EnemyWeapon){
		this.weapon=weapon;	
	}

	init(x:number=null,y:number=null){
		if(!this.weapon) this.weapon=new EnemyWeapon(this,'enemy_fire_bullet',null);
		if(x===null){
			this.setX(Phaser.Math.between(Enemy.offsetWidth,Game.globalWidth-Enemy.offsetWidth));
		}else{
			this.setX(x);
		}

		if(y===null){
			this.setY(-Enemy.offsetHeight);
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
					this.kamikaze_ai();
					break;
				case 2:
					this.circle_ai();
					break;
				case 3:
					this.sweep_ai();	
					break;
				default:
					this.moveToTarget();
					break;

			}
			this.lookAtHero();
			if(this.life>0) this.checkCollision();
			this.weapon.fireAtSprite(this.state.hero.shipBody);
			
		}
		this.game.physics.arcade.overlap(this.shipBody,this.state.enemyCollider,this.killHandler, null, this);

		super.update();
	}
	
	kamikaze_ai(){
		this.target=new Phaser.Point(this.state.hero.getX(),this.state.hero.getY());
		this.moveToTarget();
	}
	
	sweep_ai(){
		this.moveTracker+=0.01;
		this.target.x=Math.sin(this.moveTracker)*Game.globalWidth;	
		this.moveToTarget();
	}

	
	circle_ai(){
		let difX=this.state.hero.getX()-this.getX();
		let difY=this.state.hero.getY()-this.getY();
		let dif=Math.sqrt(Math.pow(difX,2)+Math.pow(difY,2));	
		let radius=300;
		if(dif<=radius+50){
			if(!this.enterOrbit){
				Math.cos(difX)
				this.angleCicle=Phaser.Math.radToDeg(Math.acos(difX/dif))+Phaser.Math.radToDeg(Math.asin(difY/dif));
			}
			this.enterOrbit=true;
			this.angleCicle=this.angleCicle+1;
			let iX=this.state.hero.getX()+(Math.sin(Phaser.Math.degToRad(this.angleCicle))*radius);
			let iY=this.state.hero.getY()+(Math.cos(Phaser.Math.degToRad(this.angleCicle))*radius);
			this.target=new Phaser.Point(iX,iY);
			this.moveToTarget();
		}else{
			this.kamikaze_ai();
		}
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
		
		this.state.hero.hitTracker(this.weapon.damage);
		
		bullet.kill();

		
	}

	hitHandler(enemy:Phaser.Sprite,bullet:Phaser.Sprite){
		//this.life=0;
		bullet.kill();
		this.state.getGame().currentScore+=this.scoreValue;
		this.explode();
		//console.log("COLLISION bullet");
	}
	explode(){
		this.on=false;
		this.shipBody.animations.play('explosion');
		
	}
	onExplosion(){
		this.shipBody.kill();
		this.toDestroy=true;
	}

	collisionHandler(){
		//this.life=0;
		this.explode();
		//console.log("COLLISION hero");
	}
	killHandler(){
		this.shipBody.kill();
		this.toDestroy=true;
	}
}