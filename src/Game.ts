
class Game extends Phaser.Game{
	static globalWidth:number=480;
	static globalHeight:number=640;
	constructor(){
		super(480,640, Phaser.CANVAS);
		this.state.add('Boot',Boot,false);
		this.state.add('PlayState',PlayState,false);
		
		this.state.start("Boot");
		

	}

}