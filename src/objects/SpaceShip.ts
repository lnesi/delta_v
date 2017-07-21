class SpaceShip extends Phaser.Group{
	public shipBody:Phaser.Sprite;
	
	public getX():number{
		return this.shipBody.body.center.x;
	}

	public getY():number{
		return this.shipBody.body.center.y;
	}
}