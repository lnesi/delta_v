
class EnemySweep extends Enemy{
	public xTracker:number=0;
	update(){
		this.xTracker=this.xTracker+0.01;
		
				
		this.target=new Phaser.Point(Math.sin(this.xTracker)*10000,this.target.y);
		super.update();
	}
}