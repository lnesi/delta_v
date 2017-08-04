
// ///<reference path="EnemyBase.ts"/>

// class EnemyCircle extends EnemyBase{
// 	public angleCicle=0;
// 	public radius=400;
// 	private enterOrbit:boolean=false;
// 	private orbitAngle=0;
// 	public deltaAcceleration:number=0;
// 	// constructor(state:PlayState,index:number){
// 	// 	super(state,index,"enemy_03",300);
// 	// 	this.orbitAngle=0;
// 	// }

// 	update(){
	
// 		let difX=this.state.hero.getX()-this.getX();
// 		let difY=this.state.hero.getY()-this.getY();
// 		let dif=Math.sqrt(Math.pow(difX,2)+Math.pow(difY,2));	
// 		if(this.on && this.state.game.time.now>this.deltaTime && (dif<=this.radius+50)){
// 			if(!this.enterOrbit){
// 				Math.cos(difX)
// 				this.angleCicle=Phaser.Math.radToDeg(Math.acos(difX/dif))+Phaser.Math.radToDeg(Math.asin(difY/dif));
// 			}
// 			this.enterOrbit=true;
			
// 			this.angleCicle=this.angleCicle+1;
// 			let iX=this.state.hero.getX()+(Math.sin(Phaser.Math.degToRad(this.angleCicle))*this.radius);
// 			let iY=this.state.hero.getY()+(Math.cos(Phaser.Math.degToRad(this.angleCicle))*this.radius);
// 			this.target=new Phaser.Point(iX,iY);
// 			this.moveToTarget();
// 			this.lookAtHero();
// 			this.fire();
// 			this.checkCollision();
// 			if(this.state.game.time.now>this.deltaAcceleration){
			
// 				this.acceleration=Phaser.Math.between(500,1000);
// 				this.deltaAcceleration=this.state.game.time.now+2000;
// 			}
			
// 		}else{
// 			this.enterOrbit=false;
// 			this.target=new Phaser.Point(this.state.hero.getX(),this.state.hero.getY());
// 			super.update();
// 		}
		


// 	}
// 	explode(){
// 		this.state.spawnKiller();
// 		super.explode();

// 	}
// }
