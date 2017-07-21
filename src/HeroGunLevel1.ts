class HeroGunLevel1 extends HeroGun{
	constructor(ship:HeroShip){
		super(ship);

		this.bulletSpeed=1000;
		this.reloadTime=300;
		this.offset=0;
		this.bulletDamage=1;

		this.bullets.createMultiple(20, 'hero_fire_bullet');
	    this.bullets.setAll('anchor.x', 0.5);
	    this.bullets.setAll('anchor.y', 1);
	    this.bullets.setAll('outOfBoundsKill', true);
	    this.bullets.setAll('checkWorldBounds', true);
	   	
	   	this.sfx=new Phaser.Sound(this.state.game,'sfx_laser1',0.5);
		
	}
	
}