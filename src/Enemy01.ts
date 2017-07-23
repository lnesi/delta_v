class Enemy01 extends Enemy{
	fireTime:number=1000;

	constructor(state:PlayState){
		super(state,"enemy_01",1,200);
		this.weapon=new Weapon(this,'enemy_fire_bullet','sfx_laser1',new Phaser.Point(0,0),state.weaponsLayer);

	}
}