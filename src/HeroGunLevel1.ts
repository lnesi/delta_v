class HeroGunLevel1 extends HeroGun{
	constructor(ship:HeroShip){
		super(ship);

		this.bulletSpeed=2000;
		this.reloadTime=100;

		// this.gunBody = new Phaser.Sprite(this.state.game,0,0,'mainsprite',"gun06.png");
		// this.gunBody.y=-this.gunBody.height;
		// this.add(this.gunBody,false,0);
		// this.gunBody.anchor.setTo(0.5,0.5);
		// this.gunBody.angle=180;

		this.bullets.createMultiple(10, 'mainsprite',"laserBlue01.png");
	    this.bullets.setAll('anchor.x', 0.5);
	    this.bullets.setAll('anchor.y', 1);
	    this.bullets.setAll('outOfBoundsKill', true);
	    this.bullets.setAll('checkWorldBounds', true);
	   	
	   	this.sfx=new Phaser.Sound(this.state.game,'sfx_laser1',0.5);
		
	}
	
}