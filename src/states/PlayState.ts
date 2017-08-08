class PlayState extends LoadableState{
	public hero:HeroShip
	public backgroundLayer:Phaser.Group
	public weaponsLayer:Phaser.Group
	public enemyLayer:Phaser.Group
	public heroLayer:Phaser.Group
	public foregroundLayer:Phaser.Group
	public enemy:Enemy
	//public bodys:any
	private initTime:number
	public clock:number=0
	private indexCount:number;
	private allowKiller:boolean=true;
	public lifes:number=3;
	public interfase:DisplayInterfase;
	public levelData:any;
	public enemyCollider:Phaser.Sprite
	public autoCheck:any
	init(){
		super.init();
		this.lifes=3;
		this.getGame().currentScore=0;
		
		this.allowKiller=true;
		this.indexCount=0;
		this.clock=0;
	
	}
	
	preload(){
		super.preload();
		this.load.json('levelData',"data/level.json");
		this.load.image('Background_01','assets/img/background_01_0.png');
		this.load.atlasJSONArray('back_sprite_01','assets/sprites/background_01.png','assets/sprites/background_01.json');
		this.load.image('uibg','assets/img/uibg.png');
		this.load.atlasXML('mainsprite','assets/sprites/sheet.png','assets/sprites/sheet.xml');
		this.load.spritesheet('explosion','assets/img/explosion.png',100,100);
		this.load.atlasJSONArray('hero','assets/sprites/hero.png','assets/sprites/hero.json');
		this.load.atlasJSONArray('enemy_01','assets/sprites/enemy_01.png','assets/sprites/enemy_01.json');
		this.load.atlasJSONArray('enemy_02','assets/sprites/enemy_02.png','assets/sprites/enemy_02.json');
		this.load.atlasJSONArray('enemy_03','assets/sprites/enemy_03.png','assets/sprites/enemy_03.json');
		this.load.atlasJSONArray('vidas','assets/sprites/vidas.png','assets/sprites/vidas.json');
		this.load.image('enemy_fire_bullet','assets/img/enemy_fire_bullet.png');
		this.load.image('hero_fire_bullet','assets/img/hero_fire_bullet.png');
		this.load.audio('sfx_laser1',"assets/audio/sfx_laser1.ogg");
		this.load.audio('sfx_explosion',"assets/audio/sfx_explosion.mp3");
		this.game.load.bitmapFont('PT Mono', 'assets/fonts/ptmono.png', 'assets/fonts/ptmono.xml');
		
	
	}
	create(){
		super.create();

		this.autoCheck=document.getElementById("autospawn");

		this.levelData=this.game.cache.getJSON('levelData');
		this.backgroundLayer=new SpaceBackground(this);
		this.weaponsLayer=new Phaser.Group(this.game);
		this.enemyLayer=new Phaser.Group(this.game);
		this.heroLayer=new Phaser.Group(this.game);
		this.foregroundLayer=new Phaser.Group(this.game);

		

		this.enemyCollider=new Phaser.Sprite(this.game,0,Game.globalHeight+(Enemy.offsetHeight/2));
		this.physics.enable(this.enemyCollider,Phaser.Physics.ARCADE);
		this.enemyCollider.body.setSize(Game.globalWidth*2,10,0,0);
	
		this.enemyCollider.x=-Game.globalWidth/2;

		this.enemyLayer.add(this.enemyCollider);
		
		console.log("DATA OK:",this.levelData);
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
		let acceleration:any=<any>document.getElementById("acceleration");
		let score:any=<any>document.getElementById("score");
		console.log("AI",parseInt(aitype.value));
		let e=new Enemy(this,textureSelect.value,parseInt(aitype.value),parseInt(acceleration.value),parseInt(score.value));
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
		// if(this.levelData.timeline[this.clock]){
		// 	switch(this.levelData.timeline[this.clock].event){
		// 		case 0:
		// 			this.spawnScriptedEnemey(this.levelData.timeline[this.clock]);
		// 			break;
		// 	}
			
		// }
		
		//this.game.physics.arcade.collide(this.bodys);

		//if(this.autoCheck.checked) this.spawner();
	}
	
	spawnScriptedEnemey(data:any){

		let e=new Enemy(this,data.texture,data.type,data.acceleration,data.scoreValue);
		new EnemyWeapon(e,"enemy_fire_bullet",data.fireRate,data.bulletsCount,data.fireLimit,data.reloadTime,data.weaponDamege);
		this.enemyLayer.addChild(e);
		e.init();
	}

	spawner(){
		if((this.clock%100)==0){
			let texture=Enemy.TEXTURES[Phaser.Math.between(0,Enemy.TEXTURES.length-1)];
			let type=Enemy.AIs[Phaser.Math.between(0,Enemy.AIs.length-1)];
			let enemy=new Enemy(this,texture,type);
			new EnemyWeapon(enemy,"enemy_fire_bullet");
			this.enemyLayer.addChild(enemy);
			enemy.init();
		}
	}
	

	collisionHandler(){
		console.log("COLLISION at play state");
	}
	onHeroKilled(){
		this.lifes--
		if(this.lifes>=0){
			this.interfase.updateLifes();
			this.hero.reSpawn();
		}else{
			this.game.state.start("GameOverState");
		}
		
	}
	render(){
		this.game.debug.text("FPS:"+this.game.time.fps.toString(), 2, 14, "#00ff00");
		this.game.debug.text("CLOCK:"+this.clock, 2, 30, "#00ff00");
		// this.game.debug.pointer(this.game.input.mousePointer);
		// this.game.debug.pointer(this.game.input.pointer1);
  //   	this.game.debug.pointer(this.game.input.pointer2);
		//this.game.debug.body(this.enemyCollider);
		//this.game.debug.body(this.enemy1.shipBody);
		//this.game.debug.body(this.enemy2.shipBody);
		
		//this.game.debug.bodyInfo(this.hero.shipBody,10,10);
	}
	goFullScreen() {
	    if (this.game.scale.isFullScreen){
	        this.game.scale.stopFullScreen();
	    }else{
	        this.game.scale.startFullScreen(false);
	    }
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
