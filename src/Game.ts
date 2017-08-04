
class Game extends Phaser.Game{
	static globalWidth:number=768//window.innerWidth* window.devicePixelRatio;
	static globalHeight:number=1024//window.innerHeight* window.devicePixelRatio;
	public hero:HeroShip;
	public currentScore:number=0;
	public leaderboard:any;
	public firebase:any;
	constructor(firebase:any){
		super(Game.globalWidth,Game.globalHeight, Phaser.CANVAS);
		this.firebase=firebase;
		this.state.add('Boot',Boot,false);
		this.state.add('PlayState',PlayState,false);
		this.state.add('LandingState',LandingState,false);
		this.state.add('GameOverState',GameOverState,false);
		this.state.start("Boot");
		this.leaderboard=new Leaderboard("leaderboard",this);
	
	

	}

	

	applyMixins(derivedCtor: any, baseCtors: any[]) {
	    baseCtors.forEach(baseCtor => {
	        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
	             if (name !== 'constructor') {
	                derivedCtor.prototype[name] = baseCtor.prototype[name];
	            }
	        });
	    });
	}

	

}