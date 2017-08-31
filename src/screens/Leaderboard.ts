///<reference path="HTMLScreen.ts"/>

class Leaderboard extends HTMLScreen{
	
	leaderboardTable:HTMLElement;
	dataRef:any;
	constructor(game:Game){
		super("leaderboardScreen",game);
		this.leaderboardTable=document.getElementById("leaderboardTable");
		
		
		
	}
	public show(){
		var html:string='';
		this.game.firebase.leaderboardData.forEach(function(val:any,index:number){
			html+="<tr>";
			html+="<td>"+(index+1)+"</td>";
			html+="<td>"+val.name+"</td>";
			html+="<td class='text-right'>"+val.score+"</td>";
			html+="</tr>";
		});
		this.leaderboardTable.innerHTML=html;
		super.show();
	}
	
	
}