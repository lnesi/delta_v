class Enemy02 extends Enemy{
	
	
	constructor(state:PlayState){
		super(state,"enemy_02",100,20);
		this.weapon=new Weapon(this,'enemy_fire_bullet','sfx_laser1',new Phaser.Point(0,0),state.weaponsLayer);

	}
}