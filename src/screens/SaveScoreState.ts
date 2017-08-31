///<reference path="HTMLScreen.ts"/>

class SaveScoreState extends HTMLScreen{
	
	score:number=0;
	scoreDisplay:HTMLElement;
	nameInput:HTMLInputElement;
	btnSaveScore:HTMLElement;

	dataRef:any;
	
	constructor(game:Game){
		super("saveScoreScreen",game);
		this.scoreDisplay=document.getElementById('scoreDisplay');
		this.btnSaveScore=document.getElementById('btnSaveScore');
		this.nameInput=<HTMLInputElement>document.getElementById('nameInput');
		this.btnSaveScore.onclick=this.onClickSave.bind(this);
	}
	public onClickSave(){
		this.game.firebase.userRef.set({score:this.score,name:this.nameInput.value});
		super.hide();
		this.game.leaderboard.show();
	}

	public save(){
		this.score=this.game.currentScore;
		this.scoreDisplay.innerHTML=this.score.toString();
		super.show();
	}
	
	
}