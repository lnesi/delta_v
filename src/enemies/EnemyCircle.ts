///<reference path="EnemyBase.ts"/>

class EnemyCircle extends EnemyBase{
	public angleCicle=0;
	public radius=300;
	
	
	update(){
		
		let difX=this.getX()-this.state.hero.getX();
		let difY=this.getY()-this.state.hero.getY();
		let dif=Math.sqrt(Math.pow(difX,2)+Math.pow(difY,2));		
		if(dif<=this.radius+50){
			if(this.on && this.state.game.time.now>this.deltaTime){
				this.angleCicle=this.angleCicle+1;
				let iX=this.state.hero.getX()+(Math.sin(Phaser.Math.degToRad(this.angleCicle))*this.radius);
				let iY=this.state.hero.getY()+(Math.cos(Phaser.Math.degToRad(this.angleCicle))*this.radius);
				this.target=new Phaser.Point(iX,iY);
				this.setToTarget();
				this.lookAtHero();
				this.fire();
				this.checkCollision();
				console.log("HERE");
			}	
		}else{
			this.target=new Phaser.Point(this.state.hero.getX(),this.state.hero.getY());
			super.update();
		}
		


	}
}