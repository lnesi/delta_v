///<reference path="EnemyCircle.ts"/>

class Enemy05 extends EnemyCircle{
	
	constructor(state:PlayState,index:number){
		super(state,index,"enemy_03",100);
		this.target=new Phaser.Point(0,Game.globalHeight*1.2);
		this.weapon=new Weapon(this,'enemy_fire_bullet','sfx_laser1',new Phaser.Point(0,0),state.weaponsLayer);

	}
}