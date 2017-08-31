class HTMLScreen{
	html:HTMLElement;
	game:Game;
	
	constructor(elementId:string,game:Game){
		this.html=document.getElementById(elementId);
		this.game=game;

	}
	

	public show(){
		this.html.style.display="block";
		gsap.TweenMax.to(this.html,0.5,<gsap.TweenConfig>{"opacity":1});
		//Pause Phaser Engine
		this.game.paused=true;

	}

	public hide(){
		gsap.TweenMax.to(this.html,0.5,<gsap.TweenConfig>{"opacity":0,onComplete:function(){
			this.html.style.display="none";
		}.bind(this)});
		//Resume Phaser Engine
		this.game.paused=false;
	}
}