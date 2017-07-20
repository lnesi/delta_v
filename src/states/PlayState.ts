class KeyInput{
	left:Phaser.Key
	right:Phaser.Key 
	up:Phaser.Key
	down:Phaser.Key
}
class PlayState extends Phaser.State{
	hero:HeroShip
	movementControls:KeyInput
	fireControl:Phaser.Key
	backgroundLayer:Phaser.Group
	enemyLayer:Phaser.Group
	heroLayer:Phaser.Group
	foregroundLayer:Phaser.Group
	enemy:Enemy
	create(){
		this.backgroundLayer=new Phaser.Group(this.game);
		this.enemyLayer=new Phaser.Group(this.game);
		this.heroLayer=new Phaser.Group(this.game);
		this.foregroundLayer=new Phaser.Group(this.game);

		var background=new SpaceBackground(this);
		
		this.hero=new HeroShip(this);
		this.hero.setX(240);
		this.hero.setY(500);

		this.enemy=new Enemy(this);
		this.enemyLayer.addChild(this.enemy);
		this.enemy.x=100;
		this.enemy.y=100;
		this.setupControls();

	}
	setupControls(){
		this.movementControls=this.game.input.keyboard.createCursorKeys();
		this.fireControl=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	}
	update(){
		
		this.hero.velocity.x=0;
		this.hero.velocity.y=0;
		this.hero.shipBody.animations.play('standby');
		if (this.movementControls.left.isDown){
			this.hero.shipBody.animations.play('left');
	        this.hero.velocity.x=-this.hero.speed;
	    }

	    if (this.movementControls.right.isDown){
	    	this.hero.shipBody.animations.play('right');
	        this.hero.velocity.x=this.hero.speed;
	    }

	    if (this.movementControls.up.isDown){
	        this.hero.velocity.y=-this.hero.speed;
	    }

	    if (this.movementControls.down.isDown){
	        this.hero.velocity.y=this.hero.speed;
	    }
	    
	    if(this.fireControl.isDown){
             this.hero.fire();
        }
        this.game.physics.arcade.overlap(this.hero.physics_body, this.enemy.body, this.collisionHandler, null, this);
		this.hero.update();
		
	}
	collisionHandler(){
		console.log("COLLISION");
	}

	render(){
		//this.game.debug.body(this.hero.physics_body);
		//this.game.debug.body(this.enemy.body);
	
	}
}