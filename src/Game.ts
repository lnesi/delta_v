
class Game extends Phaser.Game{
	static globalWidth:number=768//window.innerWidth* window.devicePixelRatio;
	static globalHeight:number=1024//window.innerHeight* window.devicePixelRatio;
	public hero:HeroShip;
	public currentScore:number=0;
	public leaderboard:any;
	public firebase:FirebaseInstance;
	public user:any=null;
	public saveScoreState:any;
	constructor(firebase:any){
		super(Game.globalWidth,Game.globalHeight, Phaser.CANVAS);
		this.firebase=new FirebaseInstance(firebase);
		this.firebase.onFirebaseOk=this.onFirebaseOk.bind(this);
		this.firebase.connect();
		

		this.setupStates();
		this.setupScreens();

	}

	onFirebaseOk(){
		this.state.start("Boot");
	}

	setupStates(){
		this.state.add('Boot',Boot,false);
		this.state.add('PlayState',PlayState,false);
		this.state.add('LandingState',LandingState,false);
		this.state.add('GameOverState',GameOverState,false);
	}

	setupScreens(){
		this.leaderboard=new Leaderboard(this);
		this.saveScoreState=new SaveScoreState(this);
	}
	
	
	globalWidth(){
		return Game.globalWidth;
	}
	globalHeight(){
		return Game.globalHeight;
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

