///<reference path="EnemyBase.ts"/>
class EnemySwap extends EnemyBase{
	public spawnChange:number=100;
	public xTarget=0;
	update(){
		if(this.clock%this.spawnChange==0){
			console.log("swap1",this.xTarget);
			if(this.xTarget==0){
				this.xTarget=Game.globalWidth
			}else{
				this.xTarget=0
			}
			console.log("swap2",this.xTarget);
		}
	
		this.target=new Phaser.Point(this.xTarget,this.target.y);
		super.update();
	}
}