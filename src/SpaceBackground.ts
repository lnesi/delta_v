class SpaceBackground extends Phaser.Group{
	ts:Phaser.TileSprite
	state:PlayState

	constructor(state:PlayState){
		super(state.game);
	
		
		


		this.state=state;
		this.ts=new Phaser.TileSprite(state.game,0,0,Game.globalWidth,Game.globalHeight,'Background_01');
		this.addChild(this.ts);
		
		
		this.addChild(new BackgroundBlock(this.state.getGame()));


	}

	
	
	update(){
		this.ts.tilePosition.y += 1;
	}

}