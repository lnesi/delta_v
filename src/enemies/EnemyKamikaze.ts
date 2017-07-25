class EnemyKamikaze extends Enemy{
	update(){
		this.target=new Phaser.Point(this.state.hero.getX(),this.state.hero.getY());
		super.update();
	}
}