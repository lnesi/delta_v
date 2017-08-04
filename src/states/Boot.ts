class Boot extends Phaser.State{
	init(){
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
		this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.onSizeChange.add(this.sizeChange);
	}
	sizeChange(){
		document.getElementById("leaderboard").style.width=document.getElementsByTagName("canvas")[0].clientWidth+"px";
		document.getElementById("leaderboard").style.height=document.getElementsByTagName("canvas")[0].clientHeight+"px";
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
		this.game.state.start("LandingState");
		this.game.time.advancedTiming=true;
		
	}

	update(){

	}
}