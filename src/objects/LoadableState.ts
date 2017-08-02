class LoadableState extends Phaser.State{
	preloaderLayer:Phaser.Group
	preloadBackground:Phaser.Image
	preloadBar:Phaser.Sprite;
	ready:boolean=false
	init(){
		console.log("UBUT Main");
		this.preloaderLayer=new Phaser.Group(this.game);

		this.preloadBackground = new Phaser.Image(this.game,0,0,'homescreen_bg');
		new Phaser.TileSprite(this.game,0,0,Game.globalWidth,Game.globalHeight,'preload_back');
		this.preloadBar = new Phaser.Sprite(this.game,(Game.globalWidth/2)-150, (Game.globalHeight/2)-12,'preload_bar');

	

		
	}
	preload(){
		this.preloaderLayer.add(this.preloadBackground);
		this.preloaderLayer.add(this.preloadBar);
		this.load.setPreloadSprite(this.preloadBar);
	}

	create(){
		console.log("STEATE LOADED");
		this.preloadBar.destroy();
	}
	
	
	
}