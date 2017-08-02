///<reference path="objects/Weapon"/>

class HeroGunLevel1 extends Weapon{
	constructor(ship:HeroShip){
		super(ship,'hero_fire_bullet','sfx_laser1',20,1,new Phaser.Point(0,-ship.shipBody.height/2),ship.state.heroLayer);
		console.log(this.fireRate)
		
	}
	
}