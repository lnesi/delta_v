///<reference path="EnemySwap.ts"/>

class Enemy04 extends EnemySwap{
	
	constructor(state:PlayState,index:number){
		super(state,index,"enemy_03",400);
		this.target=new Phaser.Point(Phaser.Math.between(this.offsetWidth,Game.globalWidth-this.offsetWidth),Game.globalHeight+this.offsetHeight);
		this.weapon=new Weapon(this,'enemy_fire_bullet','sfx_laser1',new Phaser.Point(0,0),state.weaponsLayer);

	}
}