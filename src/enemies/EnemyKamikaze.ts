///<reference path="EnemyBase.ts"/>
class EnemyKamikaze extends EnemyBase{
	update(){
		this.target=new Phaser.Point(this.state.hero.getX(),this.state.hero.getY());
		super.update();
	}
}