class Boot extends Phaser.State{
	preload(){
		console.log("Boot: Preload");
		this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.load.image('BackgroundDarkPurple','assets/img/darkPurple.png');
		this.load.atlasXML('mainsprite','assets/sprites/sheet.png','assets/sprites/sheet.xml');
		this.load.audio('sfx_laser1',"assets/audio/sfx_laser1.ogg");
	}
	
	create(){
		console.log("Boot: Created");
		this.game.state.start("PlayState");
	}

	update(){

	}
}