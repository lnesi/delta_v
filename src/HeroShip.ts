class HeroShip{
	state: Phaser.State
	displayGroup:Phaser.Group
	physics_body:Phaser.Sprite
	speed:number=300
	velocity:Phaser.Point=new Phaser.Point(0,0);
	gun:HeroGun
	bulletsContainer:Phaser.Group;
	shipBody:Phaser.Sprite;
	constructor(state:PlayState){
		
		this.state=state;
		this.bulletsContainer=new Phaser.Group(state.game,state.heroLayer);
		this.displayGroup=new Phaser.Group(state.game,state.heroLayer);
		
		
		
		this.shipBody = new Phaser.Sprite(state.game,0,0,"hero_ship");
		this.shipBody.animations.add('standby',['standby_01.png','standby_02.png'],20,true);
		this.shipBody.animations.add('left',['left_01.png','left_02.png'],20,false);
		this.shipBody.animations.add('right',['right_01.png','right_02.png'],20,false);
		this.shipBody.animations.play('standby');
		this.shipBody.anchor.setTo(0.5,0.5);
		this.shipBody.alpha=1;

		this.physics_body = new Phaser.Sprite(state.game,0,0,"hero_ship","standby_01.png");
		this.state.physics.enable(this.physics_body, Phaser.Physics.ARCADE,true);
		this.physics_body.body.collideWorldBounds = true;
		this.physics_body.anchor.setTo(0.5,0.5);
		this.physics_body.alpha=0;
		this.physics_body.height=400;
		state.heroLayer.addChild(this.physics_body);

		// var shipEngine = new Phaser.Sprite(state.game,0,0,'mainsprite', 'engine3.png');
		// shipEngine.anchor.setTo(0.5,0.5);
		// shipEngine.y=this.shipBody.height/2+5;
		

		// var shipFire = new Phaser.Sprite(this.state.game,0,0,'mainsprite');
		// var frames_fire=Phaser.Animation.generateFrameNames('fire', 8, 10, '.png', 2);
		// shipFire.animations.add('on', frames_fire, 30, true);
		// shipFire.animations.play('on');
		// shipFire.anchor.setTo(0.5,0.5);
		// shipFire.y=shipEngine.y+(shipEngine.height);
		
		// this.displayGroup.add(shipFire);
		// this.displayGroup.add(shipEngine);
		this.displayGroup.add(this.shipBody);

		this.gun=new HeroGunLevel1(this);
		this.displayGroup.addChildAt(this.gun,0);

		this.physics_body.height=this.displayGroup.height-30;
		this.physics_body.width=this.displayGroup.width;

	}

	setX(x:number):number{
		this.displayGroup.x=x;
		this.physics_body.x=x;
		return x;
	}

	setY(y:number):number{
		this.displayGroup.y=y;
		this.physics_body.y=y;
		return y;
	}

	getX():number{
		return this.displayGroup.x;
	}

	getY():number{
		return this.displayGroup.y;
	}

	update(){
		this.physics_body.body.velocity.x=this.velocity.x;
		this.physics_body.body.velocity.y=this.velocity.y;
		this.displayGroup.x=this.physics_body.x;
		this.displayGroup.y=this.physics_body.y;

	}

	fire(){
		this.gun.fire();
	}

}