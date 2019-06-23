// Demo Todo App
var app = new Vue({
	el: "#app",
	data: {
		todoMessage: "",
		notifyErr: "",

		todos: [
			{text: "Learn Vuejs"},
			{text: "Build some examples"},
			{text: "Mix Vuejs + Nodejs = a real website"}
		]
	},
	methods: {
		// event listener that action add a todo
		addTodo: function() {
			// check todoMessage valid?
			if(!this.todoMessage) {
				this.notifyErr = "Please enter title of this todo";
			} else {
				this.notifyErr = "";

				let newTodo = {
					text: this.todoMessage
				};

				this.todos.push(newTodo);
				// ok. done
				this.todoMessage = "";

			}
		}
	}
});