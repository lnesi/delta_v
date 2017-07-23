class Weapon extends Phaser.Weapon{
	ship:SpaceShip
	sfx:Phaser.Sound
	constructor(ship:SpaceShip,textureID:string,soundID:string){
		super(ship.state.game,ship.state.game.plugins);
		this.ship=ship;
		this.createBullets(20,textureID);
 		//  The bullet will be automatically killed when it leaves the world bounds
  	  	this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		//  Because our bullet is drawn facing up, we need to offset its rotation:
   		this.bulletAngleOffset = 90;
   		
    	//  The speed at which the bullet is fired
    	this.bulletSpeed = 500;
		//this.bullets = new Phaser.Group(this.state.game,ship.state.weaponsLayer,'bulletGroup',false,true,Phaser.Physics.ARCADE);
		this.sfx=new Phaser.Sound(ship.state.game,soundID,0.5);

		this.trackSprite(ship.shipBody,0,-(this.ship.shipBody.height/2));
	}
	fireWeapon():Phaser.Bullet{
		this.sfx.play();
		return this.fire( );
	}
}