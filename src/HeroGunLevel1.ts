///<reference path="objects/Weapon"/>

class HeroGunLevel1 extends Weapon{
	constructor(ship:HeroShip){
		super(ship,'hero_fire_bullet','sfx_laser1',new Phaser.Point(0,-ship.shipBody.height/2));
		
	}
	
}