class Enemy02 extends Enemy{
	
	
	constructor(state:PlayState,index:number,xTarget:number=0,yTarget:number=0){
		super(state,index,"enemy_02",100,200);
		this.target=new Phaser.Point(xTarget,yTarget);
		this.weapon=new Weapon(this,'enemy_fire_bullet','sfx_laser1',new Phaser.Point(0,0),state.weaponsLayer);

	}
}