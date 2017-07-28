///<reference path="EnemySweep"/>

class Enemy03 extends EnemySweep{
	
	constructor(state:PlayState,index:number){
		super(state,index,"enemy_03",100,200);
		this.target=new Phaser.Point(0,Game.globalHeight+this.offsetHeight);
		this.weapon=new Weapon(this,'enemy_fire_bullet','sfx_laser1',new Phaser.Point(0,0),state.weaponsLayer);

	}
}