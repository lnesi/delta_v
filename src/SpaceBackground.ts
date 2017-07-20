class SpaceBackground extends Phaser.TileSprite{

	constructor(state:Phaser.State){
		super(state.game,0,0,Game.globalWidth,Game.globalHeight,'BackgroundDarkPurple')
		state.stage.addChildAt(this,0);
	}
	
	update(){
		this.tilePosition.y += 2;
	}

}