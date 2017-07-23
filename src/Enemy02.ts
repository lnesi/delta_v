class Enemy02 extends Enemy{
	
	
	constructor(state:PlayState){
		super(state,"enemy_02",10,200);
		this.weapon=new Weapon(this,'enemy_fire_bullet','sfx_laser1');

	}
}