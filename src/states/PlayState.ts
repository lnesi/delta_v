class PlayState extends LoadableState{
	public hero:HeroShip
	public backgroundLayer:Phaser.Group
	public weaponsLayer:Phaser.Group
	public enemyLayer:Phaser.Group
	public heroLayer:Phaser.Group
	public foregroundLayer:Phaser.Group
	public enemy:Enemy
	private background:Phaser.TileSprite;
	//public bodys:any
	private initTime:number
	public clock:number=0
	private indexCount:number;
	private allowKiller:boolean=true;
	public score:number=0;
	public lifes:number=3;
	public interfase:DisplayInterfase;
	
	init(){
		super.init();
		this.lifes=3;
		this.score=0;
		this.allowKiller=true;
		this.indexCount=0;
		this.clock=0;
	
	}
	
	preload(){
		super.preload();
		this.load.image('Background_01','assets/img/background_01.png');
		this.load.image('uibg','assets/img/uibg.png');
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
		this.game.load.bitmapFont('PT Mono', 'assets/fonts/ptmono.png', 'assets/fonts/ptmono.xml');
	
	}
	create(){
		super.create();
		this.backgroundLayer=new Phaser.Group(this.game);
		this.weaponsLayer=new Phaser.Group(this.game);
		this.enemyLayer=new Phaser.Group(this.game);
		this.heroLayer=new Phaser.Group(this.game);
		this.foregroundLayer=new Phaser.Group(this.game);

		var background=new SpaceBackground(this);

		
		
		
		this.hero=new HeroShip(this);
	
		this.heroLayer.add(this.hero);
		this.initTime=this.game.time.now;
		this.hero.init();

		

		// this.enemy=new Enemy(this,0,"enemy_01"),
		// this.enemyLayer.addChild(this.enemy);
		// this.enemy.init();

		// let e=new Enemy01(this,1);
		// this.enemyLayer.addChild(e);
		// e.init();

		this.interfase=new DisplayInterfase(this);
		this.foregroundLayer.add(this.interfase);
	}

	spawn(){
		let textureSelect:any=<any>document.getElementById("texture")
		console.log(textureSelect.value);

		let bullets:any=<any>document.getElementById("bulletcount");
		let charger:any=<any>document.getElementById("chargersize");
		let reload:any=<any>document.getElementById("reload");
		let damage:any=<any>document.getElementById("damage");
		let firerate:any=<any>document.getElementById("firerate");
		let aitype:any=<any>document.getElementById("aitype");
		console.log("AI",parseInt(aitype.value));
		let e=new Enemy(this,1,textureSelect.value,parseInt(aitype.value));
		e.addWeapon(new EnemyWeapon(e,"enemy_fire_bullet",parseInt(firerate.value),parseInt(bullets.value),parseInt(charger.value),parseInt(reload.value),parseInt(damage.value)));
		this.enemyLayer.addChild(e);
		e.init();
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
	
		//this.spawner();
		
	}

	spawner(){
		// if((this.clock%200)==0){
		// 	this.indexCount++;
		// 	console.log("SPAWN Enemy02");
		// 	let enemy=new Enemy02(this,this.indexCount);
		// 	this.enemyLayer.addChild(enemy);
		// 	enemy.init();
		// }

		// if((this.clock%300)==0){
		// 	this.indexCount++;
		// 	console.log("SPAWN Enemy03");
		// 	let enemy=new Enemy03(this,this.indexCount);
		// 	this.enemyLayer.addChild(enemy);
		// 	enemy.init();
		// }

		// if((this.clock%=400)==0){
		// 	this.indexCount++;
		// 	console.log("SPAWN Enemy04");
		// 	let enemy=new Enemy04(this,this.indexCount);
		// 	this.enemyLayer.addChild(enemy);
		// 	enemy.init();
		// }

		// if((this.clock%500)==0){
		// 	this.indexCount++
		// 	console.log("SPAWN Enemy01");
		// 	let enemy=new Enemy01(this,this.indexCount);
		// 	this.enemyLayer.addChild(enemy);
		// 	enemy.init();
		// }
	}
	// spawnKiller(){
	// 	if(this.allowKiller){
	// 		let enemy=new Enemy05(this,0);
	// 		this.enemyLayer.addChild(enemy);
	// 		enemy.init();
	// 	}
	
	// }

	collisionHandler(){
		console.log("COLLISION at play state");
	}
	onEnemyKilled(){
		this.lifes--
		if(this.lifes>=0){
			this.interfase.updateLifes();
			this.hero.reSpawn();
		}else{
			this.game.state.start("GameOverState");
		}
		
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

function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}
