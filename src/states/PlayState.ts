class PlayState extends LoadableState{
	hero:HeroShip
	backgroundLayer:Phaser.Group
	weaponsLayer:Phaser.Group
	enemyLayer:Phaser.Group
	heroLayer:Phaser.Group
	foregroundLayer:Phaser.Group
	enemy1:Enemy
	enemy2:Enemy
	background:Phaser.TileSprite;
	bodys:any
	preload(){
		super.preload();
		this.load.image('BackgroundDarkPurple','assets/img/darkPurple.png');
		this.load.atlasXML('mainsprite','assets/sprites/sheet.png','assets/sprites/sheet.xml');
		this.load.spritesheet('explosion','assets/img/explosion.png',64,64);
		this.load.atlasJSONArray('hero_ship_0','assets/sprites/hero_ship_0.png','assets/sprites/hero_ship_0.json');
		this.load.atlasJSONArray('enemy_01','assets/sprites/enemy_01.png','assets/sprites/enemy_01.json');
		this.load.atlasJSONArray('enemy_02','assets/sprites/enemy_02.png','assets/sprites/enemy_02.json');
		this.load.image('enemy_fire_bullet','assets/img/enemy_fire_bullet.png');
		this.load.image('hero_fire_bullet','assets/img/hero_fire_bullet.png');
		this.load.audio('sfx_laser1',"assets/audio/sfx_laser1.ogg");
	}
	create(){
		this.backgroundLayer=new Phaser.Group(this.game);
		this.weaponsLayer=new Phaser.Group(this.game);
		this.enemyLayer=new Phaser.Group(this.game);
		this.heroLayer=new Phaser.Group(this.game);
		this.foregroundLayer=new Phaser.Group(this.game);

		var background=new SpaceBackground(this);
		this.bodys=this.game.add.physicsGroup(Phaser.Physics.ARCADE);
		this.bodys.x=0;
		this.bodys.y=0;
		this.bodys.width=Game.globalWidth;
		this.bodys.height=Game.globalHeight;
		console.log(this.bodys);
		this.hero=new HeroShip(this);
		this.hero.x=Game.globalWidth/2;
		this.hero.y=Game.globalHeight/2;
		this.heroLayer.add(this.hero);

		this.enemy1=new Enemy02(this,0,5000,5000);
		this.enemyLayer.addChild(this.enemy1);
		this.enemy1.init(100,100);
		
		//this.bodys.add(this.enemy1.shipBody);
		
		this.enemy2=new Enemy01(this,1);
		this.enemyLayer.addChild(this.enemy2);
	
		this.enemy2.init(500,0);
		//this.bodys.add(this.enemy2.shipBody);
		// for(var i:number=0;i<10;i++){
		// 	var e=new Enemy01(this);
		// 	this.enemyLayer.addChild(e);
		// 	e.x=(Math.random()*Game.globalWidth*2)-Game.globalWidth;
		// 	e.y=-50-(Math.random()*500);
		// 	e.init();
		// }
		

	}
	setupControls(){
		
		
	}
	update(){
		
		//this.game.physics.arcade.collide(this.bodys);
	
		
		
	}

	collisionHandler(){
		console.log("COLLISION");
	}

	render(){
		//this.game.debug.body(this.hero.shipBody);
		//this.game.debug.body(this.enemy1.shipBody);
		//this.game.debug.body(this.enemy2.shipBody);
		
		//this.game.debug.bodyInfo(this.hero.shipBody,10,10);
	}
}