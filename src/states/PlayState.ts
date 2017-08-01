class PlayState extends LoadableState{
	public hero:HeroShip
	public backgroundLayer:Phaser.Group
	public weaponsLayer:Phaser.Group
	public enemyLayer:Phaser.Group
	public heroLayer:Phaser.Group
	public foregroundLayer:Phaser.Group
	public enemy:EnemyBase
	private background:Phaser.TileSprite;
	public bodys:any
	private initTime:number
	public clock:number=0
	private indexCount:number;
	private allowKiller:boolean=true;
	public score:number=0;
	preload(){
		super.preload();
		this.load.image('Background_01','assets/img/background_01.png');
		this.load.atlasXML('mainsprite','assets/sprites/sheet.png','assets/sprites/sheet.xml');
		this.load.spritesheet('explosion','assets/img/explosion.png',64,64);
		this.load.atlasJSONArray('hero_ship_0','assets/sprites/hero_ship_0.png','assets/sprites/hero_ship_0.json');
		this.load.atlasJSONArray('enemy_01','assets/sprites/enemy_01.png','assets/sprites/enemy_01.json');
		this.load.atlasJSONArray('enemy_02','assets/sprites/enemy_02.png','assets/sprites/enemy_02.json');
		this.load.atlasJSONArray('enemy_03','assets/sprites/enemy_03.png','assets/sprites/enemy_03.json');
		this.load.image('enemy_fire_bullet','assets/img/enemy_fire_bullet.png');
		this.load.image('hero_fire_bullet','assets/img/hero_fire_bullet.png');
		this.load.audio('sfx_laser1',"assets/audio/sfx_laser1.ogg");
		this.load.audio('sfx_explosion',"assets/audio/sfx_explosion.mp3");
		this.game.load.bitmapFont('Roboto', 'assets/fonts/roboto_bold.png', 'assets/fonts/roboto_bold.xml');
	
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
		
		
		this.hero=new HeroShip(this);
		this.hero.x=Game.globalWidth/2;
		this.hero.y=Game.globalHeight/2;
		this.heroLayer.add(this.hero);
		this.initTime=this.game.time.now;
		this.hero.init();

		this.enemy=new Enemy05(this,0);
		this.enemyLayer.addChild(this.enemy);
		this.enemy.init();

		let bmpText = new Phaser.BitmapText(this.game,10,Game.globalHeight-50,'Roboto',"delta V",40);
		this.foregroundLayer.add(bmpText);

		let interfase=new DisplayInterfase(this);
		this.foregroundLayer.add(interfase);
	}
	getTime(){
		this.clock++
		return this.game.time.now-this.initTime;
	}
	setupControls(){
		
		
	}
	update(){
		this.clock++;
		
		
		//this.game.physics.arcade.collide(this.bodys);
	
		this.spawner();
		
	}

	spawner(){
		if((this.clock%200)==0){
			this.indexCount++;
			console.log("SPAWN Enemy02");
			let enemy=new Enemy02(this,this.indexCount);
			this.enemyLayer.addChild(enemy);
			enemy.init();
		}

		if((this.clock%300)==0){
			this.indexCount++;
			console.log("SPAWN Enemy03");
			let enemy=new Enemy03(this,this.indexCount);
			this.enemyLayer.addChild(enemy);
			enemy.init();
		}

		if((this.clock%=400)==0){
			this.indexCount++;
			console.log("SPAWN Enemy04");
			let enemy=new Enemy04(this,this.indexCount);
			this.enemyLayer.addChild(enemy);
			enemy.init();
		}

		if((this.clock%500)==0){
			this.indexCount++
			console.log("SPAWN Enemy01");
			let enemy=new Enemy01(this,this.indexCount);
			this.enemyLayer.addChild(enemy);
			enemy.init();
		}
	}
	spawnKiller(){
		if(this.allowKiller){
			let enemy=new Enemy05(this,0);
			this.enemyLayer.addChild(enemy);
			enemy.init();
		}
	
	}

	collisionHandler(){
		console.log("COLLISION");
	}

	render(){
		// this.game.debug.pointer(this.game.input.mousePointer);
		// this.game.debug.pointer(this.game.input.pointer1);
  //   	this.game.debug.pointer(this.game.input.pointer2);
		//this.game.debug.body(this.hero.shipBody);
		//this.game.debug.body(this.enemy1.shipBody);
		//this.game.debug.body(this.enemy2.shipBody);
		
		//this.game.debug.bodyInfo(this.hero.shipBody,10,10);
	}
}

