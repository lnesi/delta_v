class LoadableState extends Phaser.State{
	public preloaderLayer:Phaser.Group
	private preloadBackground:Phaser.Image
	private preloadBar:Phaser.Sprite;
	public ready:boolean=false
	public contentLayer:Phaser.Group

	public init(){
		this.preloaderLayer=new Phaser.Group(this.game);
		this.preloadBackground = new Phaser.Image(this.game,0,0,'homescreen_bg');
		this.preloadBar = new Phaser.Sprite(this.game,(Game.globalWidth/2)-150, (Game.globalHeight/2)-12,'preload_bar');
	}

	public preload(){
		this.preloaderLayer.add(this.preloadBackground);
		this.preloaderLayer.add(this.preloadBar);
		this.load.setPreloadSprite(this.preloadBar);
	}

	public create(){
		this.contentLayer=new Phaser.Group(this.game);
		this.preloadBar.destroy();
	}
	public getGame():Game{
		return <Game>this.game;
	}

}

