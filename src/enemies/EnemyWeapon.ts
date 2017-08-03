class EnemyWeapon extends Phaser.Weapon{
	public ship:SpaceShip
	public sfx:Phaser.Sound
	public emiterOffset:Phaser.Point
	public damage:number
	public reloadTime:number;
	public fireTime:number;
	constructor(ship:SpaceShip,textureID:string,fireRate:number=null,bulletsCount:number=10,fireLimit:number=10,reloadTime:number=2000,damage:number=1,offset:Phaser.Point=null){
		super(ship.state.game,ship.state.game.plugins);
		console.log(fireRate,bulletsCount,fireLimit,reloadTime,damage);
		this.damage=damage;
		this.reloadTime=reloadTime
		if(offset){
			this.emiterOffset=offset;
		}else{
			this.emiterOffset=new Phaser.Point(0,0);
		}
		this.ship=ship;
		this.createBullets(bulletsCount,textureID,0,ship.state.weaponsLayer);
		
 		//  The bullet will be automatically killed when it leaves the world bounds
  	  	this.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		//  Because our bullet is drawn facing up, we need to offset its rotation:
   		this.bulletAngleOffset = 90;
   		if(fireRate===null){
   			this.fireRate=Phaser.Math.between(10,100);
   		}else{
   			this.fireRate=fireRate;
   		}

   		this.fireLimit=fireLimit;

    	//  The speed at which the bullet is fired
    	this.bulletSpeed = 750;

    	this.onFireLimit.add(this.reload.bind(this));

		//this.bullets = new Phaser.Group(this.state.game,ship.state.weaponsLayer,'bulletGroup',false,true,Phaser.Physics.ARCADE);
	

		this.trackSprite(ship.shipBody,this.emiterOffset.x,this.emiterOffset.y);
	}
	reload(){
		setTimeout(function(){
			console.log("RELOAD",this.fireLimit)
			this.resetShots();
		}.bind(this),this.reloadTime);
	}

	update(){
		console.log("update weapon");
	}
}