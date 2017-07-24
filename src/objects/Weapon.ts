class Weapon extends Phaser.Weapon{
	ship:SpaceShip
	sfx:Phaser.Sound
	emiterOffset:Phaser.Point
	constructor(ship:SpaceShip,textureID:string,soundID:string,offset:Phaser.Point=null,group:Phaser.Group=null){
		super(ship.state.game,ship.state.game.plugins);
		if(offset){
			this.emiterOffset=offset;
		}else{
			this.emiterOffset=new Phaser.Point(0,0);
		}
		this.ship=ship;
		if(group){
			
			this.createBullets(20,textureID,0,group);
		}else{
			this.createBullets(20,textureID);
		}
		
 		//  The bullet will be automatically killed when it leaves the world bounds
  	  	this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		//  Because our bullet is drawn facing up, we need to offset its rotation:
   		this.bulletAngleOffset = 90;
   		
    	//  The speed at which the bullet is fired
    	this.bulletSpeed = 500;
		//this.bullets = new Phaser.Group(this.state.game,ship.state.weaponsLayer,'bulletGroup',false,true,Phaser.Physics.ARCADE);
		this.sfx=new Phaser.Sound(ship.state.game,soundID,0.5);

		this.trackSprite(ship.shipBody,this.emiterOffset.x,this.emiterOffset.y);
	}
	fireWeapon():Phaser.Bullet{
		this.sfx.play();
		return this.fire( );
	}

	update(){
		console.log("update weapon");
	}
}