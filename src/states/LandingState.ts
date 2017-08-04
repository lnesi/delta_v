class LandingState extends LoadableState{
	
	listening:boolean=true;
	preload(){
		super.preload();
		this.load.image('homescreen_logo','assets/img/homescreen_logo.png');
		this.game.load.bitmapFont('PT Mono', 'assets/fonts/ptmono.png', 'assets/fonts/ptmono.xml');	
	}
	
	create(){
		super.create();
		let logo=new Phaser.Image(this.game,Game.globalWidth/2,Game.globalHeight/2,"homescreen_logo");
		logo.anchor.x=0.5
		logo.anchor.y=0.5
		this.contentLayer.add(logo);

		let bmpText = new Phaser.BitmapText(this.game,0,Game.globalHeight-200,'PT Mono',"TOUCH TO START",20);
		bmpText.x=(Game.globalWidth/2)-bmpText.width/2;
		let tween:Phaser.Tween=this.game.add.tween(bmpText);
		tween.to({alpha: 0.2},500,"Linear",true,0,-1,true);
		this.contentLayer.add(bmpText);
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