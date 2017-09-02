class LandingState extends LoadableState{
	
	listening:boolean=true;
	preload(){
		super.preload();
		this.load.image('homescreen_logo','assets/img/homescreen_logo.png');
		this.game.load.bitmapFont('PT Mono', 'assets/fonts/ptmono.png', 'assets/fonts/ptmono.xml');	
		this.load.json('level_01',"data/level_01.json");
		this.load.json('level_02',"data/level_02.json");
		this.load.json('level_03',"data/level_03.json");
		this.load.json('level_04',"data/level_04.json");
		this.load.json('level_05',"data/level_05.json");
		this.load.json('level_06',"data/level_06.json");
		this.load.json('level_07',"data/level_07.json");
	}
	
	create(){
		super.create();
		this.getGame().levels[0]=this.game.cache.getJSON('level_01');
		this.getGame().levels[1]=this.game.cache.getJSON('level_02');
		this.getGame().levels[2]=this.game.cache.getJSON('level_03');
		this.getGame().levels[3]=this.game.cache.getJSON('level_04');
		this.getGame().levels[4]=this.game.cache.getJSON('level_05');
		this.getGame().levels[5]=this.game.cache.getJSON('level_06');
		this.getGame().levels[6]=this.game.cache.getJSON('level_07');
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