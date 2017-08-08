class BackgroundBlock extends Phaser.Group{
	on:boolean=false;
	blockWidth:number=64;
	blockHeight:number=64;
	clock:number=0;
	game:Game;
	constructor(game:Game){
		super(game);
		this.game=game;
		this.addChild(new BackgroundRow(game));

		this.clock=0;

	}

	update(){
		
		this.clock++;
		if(this.clock%64==0){
			this.addChild(new BackgroundRow(this.game));
		}
		super.update();
	}
	
}