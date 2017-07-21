class Boot extends Phaser.State{
	preload(){
		console.log("Boot: Preload");
		this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.load.image('BackgroundDarkPurple','assets/img/darkPurple.png');
		this.load.spritesheet('explosion','assets/img/explosion.png',64,64);
		this.load.atlasXML('mainsprite','assets/sprites/sheet.png','assets/sprites/sheet.xml');

		this.load.atlasJSONArray('hero_ship_0','assets/sprites/hero_ship_0.png','assets/sprites/hero_ship_0.json');
		this.load.atlasJSONArray('enemy_01','assets/sprites/enemy_01.png','assets/sprites/enemy_01.json');
		this.load.image('hero_fire_bullet','assets/img/hero_fire_bullet.png');
		this.load.audio('sfx_laser1',"assets/audio/sfx_laser1.ogg");
	}
	
	create(){
		console.log("Boot: Created");
		this.game.state.start("PlayState");
	}

	update(){

	}
}