class BackgroundRow extends Phaser.Group{
	game:Game;
	constructor(bk:BackgroundBlock){
		super(bk.game);
		this.game=bk.game;
		let columns=Math.ceil(this.game.globalWidth()/bk.blockWidth);
		for(var i:number=0;i<columns;i++){
			let s=new Phaser.Sprite(this.game,bk.blockWidth*i,0,'back_sprite_01',"bge_0"+Phaser.Math.between(1,6)+".png");
			this.addChild(s);
		}
		this.y=-64;
	}

	update(){
		
		if(this.y>this.game.globalHeight()){
			this.destroy(true);
		}else{
			this.y+=1;
		}
	}
}