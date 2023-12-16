angular.module('todoApp').controller('TodoController', function($http) {
    var todoCtrl = this;

    todoCtrl.todos = [];
    todoCtrl.newTodo = '';

    // Retrieve all todos
    $http.get('https://jsonplaceholder.typicode.com/todos')
        .then(function(response) {
            todoCtrl.todos = response.data;
        })
        .catch(function(error) {
            console.log('Error fetching todos:', error);
        });

    todoCtrl.addTodo = function() {
        $http.post('https://jsonplaceholder.typicode.com/todos', {
                title: todoCtrl.newTodo,
                completed: false
            })
            .then(function(response) {
                todoCtrl.todos.unshift(response.data);
                todoCtrl.newTodo = '';
            })
            .catch(function(error) {
                console.log('Error adding todo:', error);
            });
    };

    todoCtrl.removeTodo = function(id) {
        $http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(function() {
                todoCtrl.todos = todoCtrl.todos.filter(function(todo) {
                    return todo.id !== id;
                });
            })
            .catch(function(error) {
                console.log(`Error deleting todo with ID ${id}:`, error);
            });
    };
});
