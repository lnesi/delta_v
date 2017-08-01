class DisplayInterfase extends Phaser.Group{
	public state:PlayState
	public lifeBar:Phaser.Graphics;
	private lifeBarWidth:number=200;
	private lifeBarHeight:number=30;
	private scoreDisplay:Phaser.BitmapText;
	constructor(state:PlayState){
		super(state.game);
		this.state=state;

	   	this.lifeBar = new Phaser.Graphics(state.game);
	    this.add(this.lifeBar);
  		this.scoreDisplay = new Phaser.BitmapText(this.game,20,50,'Roboto',"0",40);
  		this.add(this.scoreDisplay);
	}
	update(){
		
		if(this.state.hero.life>=0){
			this.lifeBar.clear();
			this.lifeBar.beginFill(0xffffff);
			this.lifeBar.drawRect(20, 20, (this.state.hero.life*this.lifeBarWidth)/100, this.lifeBarHeight);	
			this.lifeBar.endFill();
		 	
		}else{

		 
		}
		this.scoreDisplay.text=<string><any>this.state.score;
	}
}