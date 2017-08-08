class BackgroundRow extends Phaser.Group{
	blockWidth:number=64;
	constructor(game:Game){
		super(game);
		let columns=Math.ceil(game.globalWidth()/this.blockWidth);
		for(var i:number=0;i<columns;i++){
			let s=new Phaser.Sprite(game,this.blockWidth*i,0,'back_sprite_01',"0"+Phaser.Math.between(1,6)+".png");
			this.addChild(s);
		}
		this.y=-64;
	}

	update(){
		this.y+=1;
	}
}