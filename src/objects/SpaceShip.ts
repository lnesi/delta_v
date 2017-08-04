class SpaceShip extends Phaser.Group{
	public state:PlayState;
	public shipBody:Phaser.Sprite;
	
	public toDestroy:boolean=false;
	public deltaTime:number=0;
	
	public getX():number{
		return this.shipBody.body.center.x;
	}

	public getY():number{
		return this.shipBody.body.center.y;
	}

	public setX(x:number){
		this.shipBody.x=x;
	}

	public setY(y:number){
		this.shipBody.y=y;
	}

	update(){
		if(this.toDestroy){
			this.shipBody.destroy();
			this.destroy(true);
			
		} 
	}
}