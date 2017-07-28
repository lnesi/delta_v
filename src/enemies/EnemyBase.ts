///<reference path="../objects/SpaceShip.ts"/>

class EnemyBase extends SpaceShip{
	public offsetWidth:number=100;
	public offsetHeight:number=100;
	public state:PlayState
	public index:number
	public life:number=1;
	public moveWeight:number;
	public moveRelease:number;
	public accelaration:number;
	public maxSpeed:number;
	public minSpeed:number;
	public fireTime:number;
	public on:boolean=false;
	public target:Phaser.Point=new Phaser.Point(0,0);
	public clock:number=0
	public timeOffset:number=0;
	constructor(state:PlayState,index:number,sprite_id:string,accelaration:number=50,fireTime:number=1000,maxSpeed:number=100,minSpeed:number=100){
		super(state.game);
		this.state=state;
		this.index=index;

		this.fireTime=fireTime;
		this.maxSpeed=maxSpeed;
		this.minSpeed=minSpeed;
		this.accelaration=accelaration;
		
		
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

	init(){
		this.setX(Phaser.Math.between(this.offsetWidth,Game.globalWidth-this.offsetWidth));
		this.setY(-this.offsetHeight);
		this.deltaTime=this.state.game.time.now+this.fireTime;
		this.on=true;

	}
	getSpeed():number{
		return Math.sqrt(Math.pow(this.shipBody.body.velocity.x,2)+Math.pow(this.shipBody.body.velocity.x,2));
	}
	update(){
		if(this.on){
			this.clock++;
			var aHero=this.state.hero.getX()-this.getX();
			var bHero=this.state.hero.getY()-this.getY();
			var a = this.target.x-this.getX();
			var b = this.target.y-this.getY();
			var dx=this.accelaration*Math.sin(Math.atan2(a,b));
			var dy=this.accelaration*Math.cos(Math.atan2(a,b));
			this.shipBody.body.velocity.y=dy/2;
			this.shipBody.body.velocity.x=dx/2;
			this.shipBody.body.rotation=Math.atan2(aHero,bHero)*(-180 / Math.PI); 
			
			if(this.life>0)
			 	this.game.physics.arcade.overlap(this.shipBody, this.state.hero.weapon.bullets, this.hitHandler, null, this);

			 this.game.physics.arcade.overlap(this.state.hero.shipBody,this.weapon.bullets,this.weaponHitHandler,null,this);
			if(this.state.game.time.now>this.deltaTime) this.fire();
			
		}
		super.update();
	}
	fire(){
		this.deltaTime=this.state.game.time.now+this.fireTime;
		this.weapon.fireAtSprite(this.state.hero.shipBody);
		//this.weapon.sfx.play();
	}
	weaponHitHandler(heroBody:Phaser.Sprite,bullet:Phaser.Sprite){
		console.log("HIT HERO")
		bullet.kill();
	}

	hitHandler(enemy:Phaser.Sprite,bullet:Phaser.Sprite){
		//this.life=0;
		bullet.kill();
		var explosion=new Phaser.Sprite(this.state.game,this.getX(),this.getY(),'explosion');
		explosion.anchor.setTo(0.5,0.5);
		explosion.animations.add('explosion');
		explosion.animations.getAnimation('explosion').play(30,false,true);
		this.state.enemyLayer.add(explosion);
		this.shipBody.kill();
		this.toDestroy=true;
		console.log("COLLISION bullet");
	}
}