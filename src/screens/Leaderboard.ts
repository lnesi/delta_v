///<reference path="HTMLScreen.ts"/>

class Leaderboard extends HTMLScreen{
	
	preloader:HTMLElement;
	table:HTMLElement;
	
	constructor(elementId:string,game:Game){
		super(elementId,game);
		
		for (var i = 0; i < this.html.childNodes.length; i++) {
			let e:any=this.html.childNodes[i];
			if(e.className=="preloader"){
				this.preloader=e;
			};
			if(e.className=="tableHolder"){
				this.table=e;
			}
		}
		
		this.table.style.display="none";
		this.preloader.style.display="none";
	}

	public show(){
		this.table.style.display="none";
		this.preloader.style.display="block";
		super.show();


	}

	
}