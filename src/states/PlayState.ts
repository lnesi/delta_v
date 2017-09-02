class PlayState extends LoadableState{
	public hero:HeroShip
	public backgroundLayer:Phaser.Group
	public weaponsLayer:Phaser.Group
	public enemyLayer:Phaser.Group
	public heroLayer:Phaser.Group
	public foregroundLayer:Phaser.Group
	public enemy:Enemy
	private initTime:number
	public clock:number=0
	private indexCount:number;
	private allowKiller:boolean=true;
	public lifes:number=2;
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
		this.levelData=this.getGame().levels[this.getGame().currentLevel];
		console.log("CURRENT LEVEL DATA",this.levelData);

		super.preload();
		

		this.load.image('static_background',this.levelData.background.static.texture);
		this.load.atlasJSONArray('clouds',this.levelData.foreground.atlas.img,this.levelData.foreground.atlas.json);
		this.load.atlasJSONArray('back_sprite',this.levelData.background.atlas.img,this.levelData.background.atlas.json);

		//Load Enemy Textures
		for (var texture_key in this.levelData.enemy_textures) {
			this.load.atlasJSONArray(texture_key,this.levelData.enemy_textures[texture_key].img,this.levelData.enemy_textures[texture_key].json);
		}
		//Load Enemy bullets textures
		for(var texture_key in this.levelData.enemy_bullet_textures){
			this.load.image(texture_key,this.levelData.enemy_bullet_textures[texture_key]);
		}

		//Static Data
		this.load.image('uibg','assets/img/uibg.png');
		this.load.atlasJSONArray('vidas','assets/sprites/vidas.png','assets/sprites/vidas.json');
		this.game.load.bitmapFont('PT Mono', 'assets/fonts/ptmono.png', 'assets/fonts/ptmono.xml');
		this.load.atlasXML('mainsprite','assets/sprites/sheet.png','assets/sprites/sheet.xml');
		this.load.atlasJSONArray('hero','assets/sprites/hero.png','assets/sprites/hero.json');
		this.load.image('hero_fire_bullet','assets/img/hero_fire_bullet.png');
		
		
		// this.load.spritesheet('explosion','assets/img/explosion.png',100,100);
		// this.load.audio('sfx_laser1',"assets/audio/sfx_laser1.ogg");
		// this.load.audio('sfx_explosion',"assets/audio/sfx_explosion.mp3");
		// 
		
	
	}
	create(){
		super.create();

		this.autoCheck=document.getElementById("autospawn");

		
		new SpaceBackground(this);
		new SpaceForeground(this,"01.png",1.5);
		this.weaponsLayer=new Phaser.Group(this.game);
		this.enemyLayer=new Phaser.Group(this.game);
		this.heroLayer=new Phaser.Group(this.game);
		new SpaceForeground(this,"02.png",3);
		this.foregroundLayer=new Phaser.Group(this.game);


		this.enemyCollider=new Phaser.Sprite(this.game,0,Game.globalHeight+(Enemy.offsetHeight/2));
		this.physics.enable(this.enemyCollider,Phaser.Physics.ARCADE);
		this.enemyCollider.body.setSize(Game.globalWidth*2,10,0,0);
		

		this.interfase=new DisplayInterfase(this);
		this.foregroundLayer.add(this.interfase);

		this.enemyCollider.x=-Game.globalWidth/2;
		this.enemyLayer.add(this.enemyCollider);
		
		this.hero=new HeroShip(this);
	
		this.heroLayer.add(this.hero);
		this.initTime=this.game.time.now;
		this.hero.init();


		

		 
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
		if(this.levelData.timeline[this.clock]){
			switch(this.levelData.timeline[this.clock].event){
				case 0:
					this.spawnEnemy(this.levelData.timeline[this.clock].data);
					break;
			}
			
		}
		if(this.levelData.autoSpawner.enabled){
			this.autoSpawner();
		}

	}
	
	spawnEnemy(data:any){
		console.log("spawnEnemy",this.levelData.enemies[data.type]);
		let texture=this.levelData.enemies[data.type].texture;
		let type=this.levelData.enemies[data.type].type;
		let enemy=new Enemy(this,texture,type,
							this.levelData.enemies[data.type].acceleration,
							this.levelData.enemies[data.type].scoreValue);
		new EnemyWeapon(enemy,
						this.levelData.enemies[data.type].bulletTexture,
						this.levelData.enemies[data.type].fireRate,
						this.levelData.enemies[data.type].bulletsCount,
						this.levelData.enemies[data.type].fireLimit,
						this.levelData.enemies[data.type].reloadTime,
						this.levelData.enemies[data.type].weaponDamege);
		this.enemyLayer.addChild(enemy);
		enemy.init(data.initX);
		
	}

	autoSpawner(){
		if((this.clock%this.levelData.autoSpawner.frecuency)==0){
			let enemyDefinitionKey:string=this.levelData.autoSpawner.enemies[Phaser.Math.between(0,this.levelData.autoSpawner.enemies.length-1)];
			let enemyDefinition:any={"initX":null,"type":enemyDefinitionKey};
			console.log("autoSpawner",enemyDefinition);
			this.spawnEnemy(enemyDefinition);
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
