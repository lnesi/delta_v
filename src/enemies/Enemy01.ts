///<reference path="EnemyKamikaze"/>

class Enemy01 extends EnemyKamikaze{
	fireTime:number=1000;

	constructor(state:PlayState,index:number,xTarget:number=0,yTarget:number=0){
		super(state,index,"enemy_01",200);
		
		this.weapon=new Weapon(this,'enemy_fire_bullet','sfx_laser1',new Phaser.Point(0,0),state.weaponsLayer);

	}
}