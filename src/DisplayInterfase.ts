class DisplayInterfase extends Phaser.Group{
	public state:PlayState
	public lifeBar:Phaser.Graphics;
	private lifeBarWidth:number=250;
	private lifeBarHeight:number=20;
	private lifeBarColor:number=0xffffff
	private scoreDisplay:Phaser.BitmapText;
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
  		
  		this.alpha=0.75;
	}

	setScore(score:any){
		this.scoreDisplay.text=<string>score;
		this.scoreDisplay.x=Game.globalWidth-this.scoreDisplay.width-20;
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