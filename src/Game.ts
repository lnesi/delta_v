
class Game extends Phaser.Game{
	static globalWidth:number=768//window.innerWidth* window.devicePixelRatio;
	static globalHeight:number=1024//window.innerHeight* window.devicePixelRatio;
	public hero:HeroShip;
	public currentScore:number=0;
	public leaderboard:any;
	public firebase:Firebase;
	public user:any=null;
	constructor(firebase:any){
		super(Game.globalWidth,Game.globalHeight, Phaser.CANVAS);
		this.firebase=firebase;
		this.state.add('Boot',Boot,false);
		this.state.add('PlayState',PlayState,false);
		this.state.add('LandingState',LandingState,false);
		this.state.add('GameOverState',GameOverState,false);
		this.state.start("Boot");
		this.leaderboard=new Leaderboard("leaderboard",this);
		firebase.auth().signInAnonymously().catch(function(error:any) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		});

		firebase.auth().onAuthStateChanged(function(user:any) {
		  if (user) {
		  	this.user=user;
		    console.log(this.user)
		  } else {
		   	
		  }
		  // ...
		}.bind(this));

	


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