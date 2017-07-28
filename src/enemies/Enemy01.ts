///<reference path="EnemyKamikaze"/>

class Enemy01 extends EnemyKamikaze{
	

	constructor(state:PlayState,index:number){
		super(state,index,"enemy_01");
		
		this.weapon=new Weapon(this,'enemy_fire_bullet','sfx_laser1',null,1,new Phaser.Point(0,0),state.weaponsLayer);

	}
}