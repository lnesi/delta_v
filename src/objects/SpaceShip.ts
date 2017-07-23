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

	update(){
		if(this.toDestroy) this.destroy(true);
	}
}