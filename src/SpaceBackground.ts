class SpaceBackground extends Phaser.Group{
	ts:Phaser.TileSprite
	state:PlayState

	constructor(state:PlayState){
		super(state.game);
	
		
		


		this.state=state;
		this.ts=new Phaser.TileSprite(state.game,0,0,Game.globalWidth,Game.globalHeight,'static_background');
		this.addChild(this.ts);
		
		new BackgroundBlock(this.state);
		


	}

	
	
	update(){
		this.ts.tilePosition.y += this.state.levelData.background.speed;

	}

}