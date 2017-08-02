///<reference path="EnemyBase.ts"/>
class EnemySwap extends EnemyBase{
	public spawnChange:number=100;
	public xTarget=0;
	update(){
		if(this.clock%this.spawnChange==0){
			
			if(this.xTarget==0){
				this.xTarget=Game.globalWidth
			}else{
				this.xTarget=0
			}
			
		}
	
		this.target=new Phaser.Point(this.xTarget,this.target.y);
		super.update();
	}
}