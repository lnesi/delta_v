class DisplayInterfase extends Phaser.Group{
	public state:PlayState
	public lifeBar:Phaser.Graphics;
	private lifeBarWidth:number=250;
	private lifeBarHeight:number=20;
	private lifeBarColor:number=0xffffff
	private scoreDisplay:Phaser.BitmapText;
	private lifes:Array<any>=[];
	constructor(state:PlayState){
		super(state.game);
		this.state=state;
		

		var background:Phaser.TileSprite=new Phaser.TileSprite(state.game,0,0,Game.globalWidth,50,"uibg");
		this.add(background);
	   	this.lifeBar = new Phaser.Graphics(state.game);
	    this.add(this.lifeBar);
  		
  		this.scoreDisplay = new Phaser.BitmapText(this.game,0,10,'PT Mono',"0",25);
  		this.add(this.scoreDisplay);
  		
  		let scoreLabel=new Phaser.BitmapText(this.game,0,35,'PT Mono',"POINTS",12)
  		this.add(scoreLabel);
  		
  		scoreLabel.x=Game.globalWidth-scoreLabel.width-20;
  		
		let offsetX=280;
		let separationLife=50;
		for(var i:number=0;i<3;i++){
			this.lifes[i]=new Phaser.Sprite(state.game,offsetX+(separationLife*i),15,'mainsprite','playerLife1_blue.png');
			this.add(this.lifes[i]);
		}
  		

  		this.alpha=0.75;
	}

	setScore(score:any){
		this.scoreDisplay.text=<string>score;
		this.scoreDisplay.x=Game.globalWidth-this.scoreDisplay.width-20;
	}
	updateLifes(){
		let total=this.state.lifes;
		for(var i:number=this.lifes.length-1;i>total-1;i--){
			console.log(i);
			this.lifes[i].visible=false;
		}
	}
	update(){
		
		if(this.state.hero.life>=0){
			this.lifeBar.clear();
			this.lifeBar.beginFill(this.lifeBarColor);
			this.lifeBar.drawRect(20, 15, (this.state.hero.life*this.lifeBarWidth)/100, this.lifeBarHeight);	
			this.lifeBar.endFill();
		 	
		}else{

		 
		}
		this.setScore(this.state.score);
		
	}
}