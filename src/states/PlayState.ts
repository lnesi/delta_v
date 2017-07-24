class PlayState extends LoadableState{
	hero:HeroShip
	backgroundLayer:Phaser.Group
	weaponsLayer:Phaser.Group
	enemyLayer:Phaser.Group
	heroLayer:Phaser.Group
	foregroundLayer:Phaser.Group
	enemy:Enemy
	background:Phaser.TileSprite;
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
		
		this.hero=new HeroShip(this);
		this.hero.x=Game.globalWidth/2;
		this.hero.y=Game.globalHeight/2;
		this.heroLayer.add(this.hero);

		this.enemy=new Enemy02(this);
		this.enemyLayer.addChild(this.enemy);
		this.enemy.x=0;
		this.enemy.y=0;
		this.enemy.init();

		for(var i:number=0;i<10;i++){
			var e=new Enemy01(this);
			this.enemyLayer.addChild(e);
			e.x=(Math.random()*Game.globalWidth*2)-Game.globalWidth;
			e.y=-50-(Math.random()*500);
			e.init();
		}
		

	}
	setupControls(){
		
		
	}
	update(){
		
	
		
		
	}

	collisionHandler(){
		console.log("COLLISION");
	}

	render(){
		//this.game.debug.body(this.hero.shipBody);
		this.game.debug.body(this.enemy.shipBody);
		//this.game.debug.bodyInfo(this.hero.shipBody,10,10);
	}
}