
class EnemySweep extends Enemy{
	public xTracker:number=0;
	update(){
		this.xTracker=this.xTracker+0.01;				
		this.target=new Phaser.Point(Math.sin(this.xTracker)*Game.globalWidth,this.target.y);
		super.update();
	}
}