class PhaserGame extends Phaser.Game{
    customUpdates:Array<any>
    registerUpdate(callback:any){
		return this.customUpdates.push(callback);
    }

    unregisterUpdate(position:number){
		this.customUpdates.splice(position,1);
    }

}


class Game extends Phaser.Game{
	static globalWidth:number=480;
	static globalHeight:number=640;
	constructor(){
		super(480,640, Phaser.CANVAS, 'wrapper');
		this.state.add('Boot',Boot,false);
		this.state.add('PlayState',PlayState,false);
		
		this.state.start("Boot");
		

	}

}