class Model{
      constructor(){
          // the state of the model should be an array prepopulated with some data
        this.todos = [
            { id: 1 , text: 'Code 2 hours' , complete: false },
            { id: 2 , text: 'Sleep 2 hours' , complete: false }
        ]
      }
    
      addTodo(todoText){
          const todo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length-1].id + 1 :
            1,
            text: todoText,
            complete: false
          }

          this.todos.push(todo);
      }
        /* Map through all todos ,and replace the text of the todo with 
        the specified id*/
      editTodo(id, updateText) {
          this.todos = this.todos.map((todo) =>
          todo.id === id ? {id:todo.id,text:updateText,complete: todo.complete}:
          todo)
      }

       // filter a todo out of the array by id

       deleteTodo(id){

        this.todos = this.todos.filter((todo) => todo.id != id)
       }

       //Flip the complete boolean on the specified todo 

       toggleTodo(id) {

        this.todos = this.todos.map((todo) => 
        todo.id === id ? {id=todo.id,text:todo.text,complete:!todo.complete} 
        : todo)
       }


   
}

class View{
    constructor(){

    }

}

class Controller {
    constructor(model,view){
        this.model = model;
        this.view = view;
    }
}

const app = new Controller(new Model() , new View());