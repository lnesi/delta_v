class SpaceShip extends Phaser.Group{
	public state:Phaser.State;
	public shipBody:Phaser.Sprite;
	public weapon:Weapon
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
		if(this.toDestroy) this.destroy(true);
	}
}