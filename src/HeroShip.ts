///<reference path="objects/SpaceShip"/>

class HeroShip extends SpaceShip{
	state: PlayState
	life:number=100
	friction:number=500;
	maxAcceleration:number=500;
	maxSpeed=200;

	moveControls:PadControls
	fireControl:Phaser.Key
	currentMovement:string="stand"
	
	weightEnergy:number=10;
	direction:Phaser.Point=new Phaser.Point(0,0);
	acceleration:Phaser.Point= new Phaser.Point(0,0);
	
	constructor(state:PlayState){
		super(state.game);

	 	this.state=state;
	
		this.shipBody = new Phaser.Sprite(state.game,0,0,"hero_ship_0");
		
		this.shipBody.animations.add('stand',Phaser.Animation.generateFrameNames('hero_stand_', 0, 5, '.png', 4),24,true);
		this.shipBody.animations.add('left',Phaser.Animation.generateFrameNames('hero_left_', 0, 5, '.png', 4),24,false);
		this.shipBody.animations.add('right',Phaser.Animation.generateFrameNames('hero_right_', 0, 5, '.png', 4),24,false);
		this.shipBody.animations.add('up',Phaser.Animation.generateFrameNames('hero_up_', 0, 5, '.png', 4),24,false);
		this.shipBody.animations.add('down',Phaser.Animation.generateFrameNames('hero_down_', 0, 5, '.png', 4),24,false);
		this.shipBody.animations.add('fire_stand',Phaser.Animation.generateFrameNames('hero_fire_stand_', 0, 2, '.png', 4),24,false);
		this.shipBody.animations.add('fire_up',Phaser.Animation.generateFrameNames('hero_fire_stand_', 0, 2, '.png', 4),24,false);
		this.shipBody.animations.add('fire_down',Phaser.Animation.generateFrameNames('hero_fire_stand_', 0, 2, '.png', 4),24,false);
		this.shipBody.animations.add('fire_left',Phaser.Animation.generateFrameNames('hero_fire_left_', 0, 2, '.png', 4),24,false);
		this.shipBody.animations.add('fire_right',Phaser.Animation.generateFrameNames('hero_fire_right_', 0, 2, '.png', 4),24,false);
		this.shipBody.animations.getAnimation("fire_stand").onComplete.add(this.gunFire.bind(this));
		this.shipBody.animations.getAnimation("fire_up").onComplete.add(this.gunFire.bind(this));
		this.shipBody.animations.getAnimation("fire_down").onComplete.add(this.gunFire.bind(this));
		this.shipBody.animations.getAnimation("fire_left").onComplete.add(this.gunFire.bind(this));
		this.shipBody.animations.getAnimation("fire_right").onComplete.add(this.gunFire.bind(this));
		this.shipBody.animations.play('stand');
		
		this.shipBody.anchor.setTo(0.5,0.5);
		this.add(this.shipBody);
		
		this.state.physics.enable(this.shipBody, Phaser.Physics.ARCADE,true);
		this.shipBody.body.collideWorldBounds = true;
		this.shipBody.body.syncBounds=true;
		this.shipBody.body.setCircle(this.shipBody.height/2.8, 0, 0)
		
		this.weapon=new HeroGunLevel1(this);

		this.moveControls=new PadControls(state.game);
		this.fireControl=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.deltaTime=this.state.game.time.now;

		
		
	


	}
	animate(name:string){
		if(this.shipBody.animations.currentAnim.name!=name && this.shipBody.animations.currentAnim.name.indexOf("fire")===-1)  return this.shipBody.animations.play(name);
	}
	getSpeed():number{
		return Math.sqrt(Math.pow(this.shipBody.body.velocity.x,2)+Math.pow(this.shipBody.body.velocity.x,2));
	}
	getCurrentDirection():Phaser.Point{
		var x=0;
		var y=0;
		if(Math.abs(this.shipBody.body.velocity.x)>0)x=(this.shipBody.body.velocity.x/Math.abs(this.shipBody.body.velocity.x));
		if(Math.abs(this.shipBody.body.velocity.y)>0)y=(this.shipBody.body.velocity.y/Math.abs(this.shipBody.body.velocity.y));
		return new Phaser.Point(x,y)
	}
	update(){

		this.shipBody.body.acceleration.y=0;
		
		
		this.moveControls.update();
	
     	
     	if(this.moveControls.get().x!=0){
     		this.acceleration.x=this.maxAcceleration*this.moveControls.get().x;
     	}else{
     		this.acceleration.x=this.getCurrentDirection().x*-1*this.friction;
     	}


     	if(Math.abs(this.shipBody.body.velocity.x)>this.maxSpeed && (this.getCurrentDirection().x==this.moveControls.get().x)){
     		this.acceleration.x=0;
     	}

     	if(Math.abs(this.shipBody.body.velocity.x)<=this.weightEnergy && this.moveControls.get().x==0){
     		this.acceleration.x=0;
     		this.shipBody.body.velocity.x=0;
     	}

     	if(this.moveControls.get().y!=0){
     		this.acceleration.y=this.maxAcceleration*this.moveControls.get().y;
     	}else{
     		this.acceleration.y=this.getCurrentDirection().y*-1*this.friction;
     	}


     	if(Math.abs(this.shipBody.body.velocity.y)>this.maxSpeed && (this.getCurrentDirection().y==this.moveControls.get().y)){
     		this.acceleration.y=0;
     	}

     	if(Math.abs(this.shipBody.body.velocity.y)<=this.weightEnergy && this.moveControls.get().y==0){
     		this.acceleration.y=0;
     		this.shipBody.body.velocity.y=0;
     	}
     	if(this.fireControl.isDown){
             this.fire();
        
        }
	    
	    this.animate(this.moveControls.getDescription());
	      
       
        this.shipBody.body.acceleration.x=this.acceleration.x;
        this.shipBody.body.acceleration.y=this.acceleration.y;
        
        
	}
	hitHandler(shipBody:Phaser.Sprite,bullet:Phaser.Sprite){
		console.log("Collidion hero");
		bullet.kill();
	}
	gunFire(){
		
		this.weapon.fireWeapon();
		var cAnimation=this.shipBody.animations.getAnimation(this.moveControls.getDescription());
		cAnimation.play();
		cAnimation.stop(null,false);
		cAnimation.frame=cAnimation.frameTotal-1;
		
	}
	fire(){
		if(this.state.game.time.now>this.deltaTime){

			this.animate('fire_'+this.moveControls.getDescription());
			this.deltaTime=this.state.game.time.now+this.weapon.fireRate;

		}
	}
	

}