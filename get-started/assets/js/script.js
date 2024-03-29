// Components
Vue.component('todo-item', {
	props: ["todo"],
	created() {
		// console.log("Todo: ", this.todo);
	},
	methods: {
		remove: function() {
			// console.log("Vao day r");
			this.$emit("remove-event", this.todo.id);
		}
	},
	template: `
		<li class="todo-item">
			<span>{{todo.text}}</span>
			<span class="btn-remove" v-on:click="remove">X</span>
		</li>
	`
});

var app = new Vue({
	el: "#app",
	data: {
		todoMessage: "",
		notifyErr: "",

		todos: [
			{id: 1, text: "Learn Vuejs"},
			{id: 2, text: "Build some examples"},
			{id: 3, text: "Mix Vuejs + Nodejs = a real website"}
		]
	},
	methods: {
		// Find a todo in list within an id
		findTodo: function(id) {
			let i = 0;
			for(let item of this.todos) {
				if(item.id === id) return i;
				i++; 
			}
			return -1;
		},

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
		},
		removeTodo: function(id) {
			let todoIndex = this.findTodo(id);

			// console.log("id: ", id);
			// console.log("index: ", todoIndex);

			if(todoIndex > -1) {
				this.todos.splice(todoIndex, 1);
			}
		}
	}
});