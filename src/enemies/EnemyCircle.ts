///<reference path="EnemyBase.ts"/>

class EnemyCircle extends EnemyBase{
	public angleCicle=0;
	public radius=300;
	
	
	update(){
		let difX=this.getX()-this.state.hero.getX();
		let difY=this.getY()-this.state.hero.getY();
		let dif=Math.sqrt(Math.pow(difX,2)+Math.pow(difY,2));		
		if(dif<=this.radius+50){
			this.angleCicle=this.angleCicle+1;
			console.log(Math.sin(Phaser.Math.degToRad(this.angleCicle))*this.radius);
			let iX=this.state.hero.getX()+(Math.sin(Phaser.Math.degToRad(this.angleCicle))*this.radius);
			let iY=this.state.hero.getY()+(Math.cos(Phaser.Math.degToRad(this.angleCicle))*this.radius);
			this.setX(iX);
			this.setY(iY);
			this.target=new Phaser.Point(iX,iY);
			let aHero=this.state.hero.getX()-this.getX();
			let bHero=this.state.hero.getY()-this.getY();
			this.shipBody.body.rotation=Math.atan2(aHero,bHero)*(-180 / Math.PI); 
		}else{
			this.target=new Phaser.Point(this.state.hero.getX(),this.state.hero.getY());
			super.update();
		}
		
		//super.update();
		// console.log(this.state.hero.getX());
	}
}