class SpaceForeground extends Phaser.Group{
	ts:Phaser.TileSprite;
	speed:number;
	constructor(state:PlayState,key:string,speed:number){
		super(state.game);
		this.speed=speed;
		this.ts=new Phaser.TileSprite(state.game,0,0,Game.globalWidth,Game.globalHeight,'clouds',key);
		this.addChild(this.ts);
	}
	update(){
		this.ts.tilePosition.y += this.speed;
	}

}