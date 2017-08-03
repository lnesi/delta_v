class GameOverState extends LoadableState{
	listening:boolean=true;
	create(){
		super.create();
		
		let gameOverText=new Phaser.BitmapText(this.game,0,Game.globalHeight/2,'PT Mono',"GAME OVER",40);
		gameOverText.x=(Game.globalWidth/2)-gameOverText.width/2;
		this.contentLayer.add(gameOverText);

		let startMessage = new Phaser.BitmapText(this.game,0,Game.globalHeight-200,'PT Mono',"PLAY AGAIN",20);
		startMessage.x=(Game.globalWidth/2)-startMessage.width/2;
		let tween:Phaser.Tween=this.game.add.tween(startMessage);
		tween.to({alpha: 0.2},500,"Linear",true,0,-1,true);
		this.contentLayer.add(startMessage);
	}

	update(){
		if(this.listening){
			this.capturePointer(this.game.input.mousePointer);
			this.capturePointer(this.game.input.pointer1)
		}
	}

	capturePointer(pointer:Phaser.Pointer){
		if(pointer.isDown){
			this.listening=false;
			this.game.state.start("PlayState");
		}
	}
}