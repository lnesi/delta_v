class HeroShip{
	state: Phaser.State
	displayGroup:Phaser.Group
	physics_body:Phaser.Sprite
	speed:number=200
	velocity:Phaser.Point=new Phaser.Point(0,0);
	gun:HeroGun
	bulletsContainer:Phaser.Group;
	constructor(state:Phaser.State){
		
		this.state=state;
		this.bulletsContainer=new Phaser.Group(state.game);
		this.displayGroup=new Phaser.Group(state.game);
		
		
		
		var shipBody = this.state.game.add.sprite(0, 0,  'mainsprite', 'playerShip1_blue.png');
		shipBody.anchor.setTo(0.5,0.5);
		shipBody.alpha=1;

		this.physics_body = this.state.add.sprite(0, 0,  'mainsprite', 'playerShip1_blue.png'); //Change to a graphic
		this.state.physics.enable(this.physics_body, Phaser.Physics.ARCADE,true);
		this.physics_body.body.collideWorldBounds = true;
		this.physics_body.anchor.setTo(0.5,0.5);
		this.physics_body.alpha=0;

		var shipEngine = this.state.add.sprite(0, 0,  'mainsprite', 'engine3.png');
		shipEngine.anchor.setTo(0.5,0.5);
		shipEngine.y=shipBody.height/2+5;

		var shipFire = this.state.add.sprite(0, 0, 'mainsprite');
		var frames_fire=Phaser.Animation.generateFrameNames('fire', 8, 10, '.png', 2);
		shipFire.animations.add('on', frames_fire, 30, true);
		shipFire.animations.play('on');
		shipFire.anchor.setTo(0.5,0.5);
		shipFire.y=shipEngine.y+(shipEngine.height);
		
		this.displayGroup.add(shipFire);
		this.displayGroup.add(shipEngine);
		this.displayGroup.add(shipBody);
		
		this.gun=new HeroGunLevel1(this)

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
		this.displayGroup.x=this.physics_body.x;

	}

	fire(){
		this.gun.fire();
	}

}