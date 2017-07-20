class Enemy extends Phaser.Group{
	state:PlayState
	body:Phaser.Sprite

	constructor(state:PlayState){
		super(state.game);
		this.state=state;
		this.body = new Phaser.Sprite(state.game,0,0,  'mainsprite', 'enemyBlack2.png');
		state.physics.enable(this.body,Phaser.Physics.ARCADE);
		this.body.anchor.setTo(0.5,0.5);
		this.addChild(this.body);

		
		

	}

	create(){

	}
	update(){
		 this.game.physics.arcade.overlap(this.body, this.state.hero.gun.bullets, this.collisionHandler, null, this);
	}
	collisionHandler(){
		
		
		var explosion=new Phaser.Sprite(this.state.game,this.x,this.y,'explosion');
		explosion.anchor.setTo(0.5,0.5);
		explosion.animations.add('explosion');
		explosion.animations.getAnimation('explosion').play(30,false,true);
		this.state.enemyLayer.add(explosion);
		
		this.destroy(true);
		console.log("COLLISION bullet");
	}
}