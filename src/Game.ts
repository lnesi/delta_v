
class Game extends Phaser.Game{
	static globalWidth:number=window.innerWidth;
	static globalHeight:number=window.innerHeight;
	constructor(){
		super(Game.globalWidth,Game.globalHeight, Phaser.CANVAS);
		this.state.add('Boot',Boot,false);
		this.state.add('PlayState',PlayState,false);
		
		this.state.start("Boot");
	

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