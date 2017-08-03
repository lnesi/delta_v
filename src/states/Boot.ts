class Boot extends Phaser.State{
	init(){
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL
	}

	preload(){
		console.log("Boot: Preload");
		
		
		this.load.image('homescreen_bg', 'assets/img/homescreen_bg.png');
        this.load.image('preload_bar', 'assets/img/preload_bar.png');
        this.game.input.addPointer();
    	this.game.input.addPointer();
		// Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        

		// 
	}
	
	create(){
		console.log("Boot: Created");
		this.game.state.start("PlayState");
	}

	update(){

	}
}