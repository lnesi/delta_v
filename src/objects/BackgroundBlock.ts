class BackgroundBlock extends Phaser.Group{
	on:boolean=false;
	blockWidth:number=128;
	blockHeight:number=128;
	clock:number=0;
	game:Game;
	state:PlayState;
	constructor(state:PlayState){
		super(state.getGame());
		this.state=state;
		this.game=state.getGame();
		let filas=Math.ceil(this.game.globalHeight()/this.blockHeight);
		for(var i:number=0;i<filas;i++){
			let b=new BackgroundRow(this);
			this.addChild(b);
			b.y=this.blockHeight*i;
		}
		this.addChild(new BackgroundRow(this));
		this.clock=0;

	}

	update(){
		
		this.clock++;
		if(this.clock%(this.blockHeight/this.state.levelData.background.speed)==0){
			this.addChild(new BackgroundRow(this));
		}
		super.update();
	}
	
}