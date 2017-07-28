class Enemy02 extends Enemy{
	
	
	constructor(state:PlayState,index:number){
		super(state,index,"enemy_02",100,200);
		this.target=new Phaser.Point(Phaser.Math.between(this.offsetWidth,Game.globalWidth-this.offsetWidth),Game.globalHeight+this.offsetHeight);
		this.weapon=new Weapon(this,'enemy_fire_bullet','sfx_laser1',new Phaser.Point(0,0),state.weaponsLayer);

	}
}