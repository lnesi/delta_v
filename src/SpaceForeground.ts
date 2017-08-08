class SpaceForeground extends Phaser.Group{
	ts:Phaser.TileSprite;
	constructor(state:PlayState){
		super(state.game);
	
		this.ts=new Phaser.TileSprite(state.game,0,0,Game.globalWidth,Game.globalHeight,'clouds','01.png');
		this.addChild(this.ts);
	}
	update(){
		this.ts.tilePosition.y += 2;
	}

}