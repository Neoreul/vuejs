// Components
Vue.component('todo-item', {
	props: ["todo"],
	created() {
		// console.log("Todo: ", this.todo);
	},
	methods: {
		remove: function() {
			// console.log("Vao day r");
			this.$emit("remove-event", this.todo._id);
		}
	},
	template: `
		<li class="todo-item">
			<span>{{todo.title}}</span>
			<span class="btn-remove" v-on:click="remove">X</span>
		</li>
	`
});

var app = new Vue({
	el: "#app",
	data: {
		todoMessage: "",
		notifyErr: "",

		todos: []
	},
	created() {
		this.getTodos();
	},
	methods: {

		getTodos: function() {
			axios.get("http://localhost:3000/api/todos").then(res => {
				console.log("getTodos.res: ", res);
				if(res.data) {
					this.todos = this.todos.concat(res.data);
				}
			});
		},

		// Find a todo in list within an id
		findTodo: function(id) {
			let i = 0;
			for(let item of this.todos) {
				if(item._id === id) return i;
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

				// this.todos.push(newTodo);

				axios.post("htpp://localhost:3000/api/todos/add", newTodo).then(res => {
					console.log("addTodo.res: ", res.data);
					if(res.data.ok && res.data.ok === 1) {
						// this.todos.push();
					}
				}).catch(err => {
					console.log(err);
				});

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