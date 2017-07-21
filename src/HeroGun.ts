class HeroGun extends Phaser.Group{
	state:Phaser.State
	gunBody:Phaser.Sprite
	reloadTime:number=500
	bulletSpeed:number=500
	deltaTime:number=0
	offset:number=0;
	bulletDamage:number=1
	bullets:Phaser.Group
	ship:HeroShip
	sfx:Phaser.Sound;
	

	constructor(ship:HeroShip){
		super(ship.state.game);
		this.state=ship.state;
		this.ship=ship;
		this.deltaTime=this.state.game.time.now;
		this.bullets = new Phaser.Group(this.state.game,ship.state.weaponsLayer,'bulletGroup',false,true,Phaser.Physics.ARCADE);

	}
	
	fire(){
		if(this.state.game.time.now>this.deltaTime){
			var bullet = this.bullets.getFirstExists(false);
			bullet.reset(this.ship.getX(), this.ship.getY()-bullet.height+this.offset);
			bullet.body.velocity.y = -this.bulletSpeed;
			this.deltaTime=this.state.game.time.now+this.reloadTime;
			this.sfx.play();
		}
	}
}