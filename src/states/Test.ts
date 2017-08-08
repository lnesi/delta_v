class Test extends Phaser.State{
	rocketLauncher:Phaser.Particles.Arcade.Emitter;
	preload(){
		this.load.image('hero_fire_bullet','assets/img/enemy_fire_bullet.png');
	}
	create(){
		this.game.physics.arcade.gravity.y=0;
		var SECOND = 1000;
		var BURST_LIFESPAN = 1.9 * SECOND;
		var BURST_QUANTITY = 500;
		var RED = 'rgba(255,0,0,0.5)';
		var ROCKET_INTERVAL = 1 * SECOND;
		var ROCKET_LIFESPAN = 1 * SECOND;
		var ROCKET_QUANTITY = 1;
		let bounds=this.world.bounds;
		this.rocketLauncher=new Phaser.Particles.Arcade.Emitter(this.game,bounds.centerX,bounds.centerY,1000);
		this.rocketLauncher.name="rockets";
		this.rocketLauncher.gravity=0;
		this.rocketLauncher.minParticleScale = 1;
        this.rocketLauncher.maxParticleScale = 1;
     	this.rocketLauncher.setRotation(0,0)
       	this.rocketLauncher.setXSpeed(-500,500);
       	this.rocketLauncher.setYSpeed(-500,500);
       
		this.rocketLauncher.makeParticles('hero_fire_bullet');
		this.rocketLauncher.explode(1000,100);
      	
		

	}

	update(){
		
	}

}