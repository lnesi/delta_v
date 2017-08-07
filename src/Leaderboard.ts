class Leaderboard{
	html:HTMLElement;
	preloader:HTMLElement;
	table:HTMLElement;
	game:Game
	constructor(elementId:string,game:Game){
		this.html=document.getElementById(elementId);
		this.game=game;
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
		this.html.style.display="block";
		gsap.TweenMax.to(this.html,1,<gsap.TweenConfig>{"opacity":1});


	}

	public hide(){
		gsap.TweenMax.to(this.html,1,<gsap.TweenConfig>{"opacity":0,onComplete:function(){
			this.html.style.display="none";
		}.bind(this)});
	}
}