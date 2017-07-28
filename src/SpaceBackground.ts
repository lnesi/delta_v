class SpaceBackground extends Phaser.TileSprite{

	constructor(state:PlayState){
		super(state.game,0,0,Game.globalWidth,Game.globalHeight,'Background_01')
		state.backgroundLayer.addChild(this);
	}
	
	update(){
		this.tilePosition.y += 1;
	}

}