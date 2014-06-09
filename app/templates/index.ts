export interface StringDisplay { 
	display(msg : string) : void; 
}

export module App {

	/**
	 * Instance is an App controller. Automatically creates 
	 * model. Creates view if none given.
	 */
	export class Controller {
		private model : Model;
		private view  : View ;

		constructor (greeting: string, view?: View) {
			this.model = new Model(greeting);
			this.view  = (view  || new View());
		}

		public greet () : void {
			this.view.display (this.model.getGreeting());
		}
	}

	/**
	 * Private class. Instance is a greeter model.
	 */
	class Model {
		private greeting : string;

		constructor (greeting : string) {
			this.greeting = greeting;
		}

		public getGreeting() : string {
			return this.greeting + ", world!";
		}
	}

	/**
	 * Instance is a view capable of displaying a message.
	 */
	export class View implements StringDisplay {
		public display (msg : string) : void {
			console.log(msg);
		}
	}

	/*
	 * Factory function. Returns a default first app.
	 */
	export function defaultGreeter(view? : StringDisplay) {
		return new App.Controller("Hello", view);
	}
}
