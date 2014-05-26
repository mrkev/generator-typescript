class Controller {
	private model : Model;
	private view  : View ;

	constructor () {
		this.model = new Model("Hello");
		this.view  = new View();
	}

	public sayHello () : void {
		this.view.display (this.model.getGreeting());
	}
}

class Model {
	private greeting : string;

	constructor (greeting : string) {
		this.greeting = greeting;
	}

	public getGreeting() : string {
		return this.greeting + " World!";
	}
}

class View {
	public display (msg : string) : void {
		console.log(msg);
	}
}

var app = new Controller();
app.sayHello();