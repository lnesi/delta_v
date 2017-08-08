class HTMLScreen{
	html:HTMLElement;
	game:Game;
	constructor(elementId:string,game:Game){
		this.html=document.getElementById(elementId);
		this.game=game;
	}

	public show(){
		this.html.style.display="block";
		gsap.TweenMax.to(this.html,1,<gsap.TweenConfig>{"opacity":1});
	}

	public hide(){
		gsap.TweenMax.to(this.html,1,<gsap.TweenConfig>{"opacity":0,onComplete:function(){
			this.html.style.display="none";
		}.bind(this)});
	}
}