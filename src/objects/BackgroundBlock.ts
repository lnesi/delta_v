class BackgroundBlock extends Phaser.Group{
	on:boolean=false;
	blockWidth:number=64;
	blockHeight:number=64;
	constructor(game:Game){
		super(game);

		let columns=Math.ceil(game.globalWidth()/this.blockWidth);
		let filas=Math.ceil(game.globalHeight()/this.blockHeight);
		for(var i:number=0;i<columns;i++){
			for(var j:number=0;j<filas;j++){
				let s=new Phaser.Sprite(game,this.blockWidth*i,this.blockHeight*j,'back_sprite_01',"0"+Phaser.Math.between(1,6)+".png");
				this.addChild(s);
			}
		}

	}
	update(){
		if(this.on){

		}
	}
}