class FirebaseInstance {
	sdk:any
	user:any
	leaderboardRef:any;
	userRef:any;
	leaderboardData:Array<any>;
	constructor(firebase:any){
		this.sdk=firebase;
		this.sdk.auth().signInAnonymously().catch(function(error:any) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		});

	

	}
	
	onFirebaseOk(){
		console.log("FIREBASE OK Override at inclution level");
	}

	connect(){
		this.sdk.auth().onAuthStateChanged(function(user:any) {
		  if (user) {
		  	this.user=user;
		    //this.onFirebaseOk();
		    this.setupDB();
		  } else {
		   	 this.dispatchEvent("FIREBASE_OK");
		  }
		  // ...
		}.bind(this));
	}
	setupDB(){
		this.leaderboardRef=this.sdk.database().ref().child('leaderboard').orderByChild('score').limitToLast(10);;
		
		this.leaderboardRef.on('value',function(snapshot:any) {
			this.leaderboardData=[];
			snapshot.forEach(function(child:any) {
	            this.leaderboardData.push(child.val());
	        }.bind(this));
	        this.leaderboardData.reverse();
		}.bind(this));


		this.userRef=this.sdk.database().ref().child('leaderboard').child(this.user.uid);
		this.onFirebaseOk();
	}

		
}