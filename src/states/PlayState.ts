class PlayState extends Phaser.State{
	hero:HeroShip
	
	
	backgroundLayer:Phaser.Group
	weaponsLayer:Phaser.Group
	enemyLayer:Phaser.Group
	heroLayer:Phaser.Group
	foregroundLayer:Phaser.Group
	enemy:Enemy
	create(){
		this.backgroundLayer=new Phaser.Group(this.game);
		this.weaponsLayer=new Phaser.Group(this.game);
		this.enemyLayer=new Phaser.Group(this.game);
		this.heroLayer=new Phaser.Group(this.game);
		this.foregroundLayer=new Phaser.Group(this.game);

		var background=new SpaceBackground(this);
		
		this.hero=new HeroShip(this);
		this.hero.x=240;
		this.hero.y=500;
		this.heroLayer.add(this.hero);

		// this.enemy=new Enemy01(this);
		// this.enemyLayer.addChild(this.enemy);
		// this.enemy.x=0;
		// this.enemy.y=0;
		// this.enemy.init();
		

	}
	setupControls(){
		
		
	}
	update(){
		
		// this.hero.velocity.x=0;
		// this.hero.velocity.y=0;
		// this.hero.body.animations.play('standby');
		
	    
	   
        //this.game.physics.arcade.overlap(this.hero.body, this.enemy.body, this.collisionHandler, null, this);
		
		
	}
	collisionHandler(){
		console.log("COLLISION");
	}

	render(){
		//this.game.debug.body(this.hero.body);
		//this.game.debug.body(this.hero.shipBody);
		//this.game.debug.bodyInfo(this.hero.shipBody,10,10);
	}
}