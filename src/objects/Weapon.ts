class Weapon extends Phaser.Weapon{
	public ship:SpaceShip
	public sfx:Phaser.Sound
	public emiterOffset:Phaser.Point
	public damage:number
	constructor(ship:SpaceShip,textureID:string,soundID:string,fireRate:number=null,damage:number=1,offset:Phaser.Point=null,group:Phaser.Group=null){
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
   		if(fireRate===null){
   			this.fireRate=Phaser.Math.between(10,100);
   		}else{
   			this.fireRate=fireRate;
   		}
   		
    	//  The speed at which the bullet is fired
    	this.bulletSpeed = 750;
		//this.bullets = new Phaser.Group(this.state.game,ship.state.weaponsLayer,'bulletGroup',false,true,Phaser.Physics.ARCADE);
		this.sfx=new Phaser.Sound(ship.state.game,soundID,0.5);

		this.trackSprite(ship.shipBody,this.emiterOffset.x,this.emiterOffset.y);
	}
	fireWeapon():Phaser.Bullet{
		//this.sfx.play();
		return this.fire( );
	}

	update(){
		console.log("update weapon");
	}
}