class KeyInput{
	left:Phaser.Key
	right:Phaser.Key 
}
class PlayState extends Phaser.State{
	hero:HeroShip
	movementControls:KeyInput
	fireControl:Phaser.Key
	create(){
		var background=new SpaceBackground(this);
		
		this.hero=new HeroShip(this);
		this.hero.setX(240);
		this.hero.setY(500);

		this.setupControls();

	}
	setupControls(){
		this.movementControls=this.game.input.keyboard.createCursorKeys();
		this.fireControl=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	}
	update(){
		
		this.hero.velocity.x=0;
		if (this.movementControls.left.isDown){
	        this.hero.velocity.x=-this.hero.speed;
	    }else if (this.movementControls.right.isDown){
	        this.hero.velocity.x=this.hero.speed;
	    }
	    
	    if(this.fireControl.isDown){
             this.hero.fire();
        }

		this.hero.update();
		
	}
}