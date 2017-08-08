class BackgroundBlock extends Phaser.Group{
	on:boolean=false;
	blockWidth:number=64;
	blockHeight:number=64;
	clock:number=0;
	game:Game;
	constructor(game:Game){
		super(game);
		this.game=game;
		let filas=Math.ceil(game.globalHeight()/this.blockHeight);
		for(var i:number=0;i<filas;i++){
			let b=new BackgroundRow(this);
			this.addChild(b);
			b.y=this.blockHeight*i;
		}

		this.clock=0;

	}

	update(){
		
		this.clock++;
		if(this.clock%this.blockHeight==0){
			this.addChild(new BackgroundRow(this));
		}
		super.update();
	}
	
}