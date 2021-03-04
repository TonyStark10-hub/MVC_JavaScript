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
          todo);
      }

       // filter a todo out of the array by id

       deleteTodo(id){

        this.todos = this.todos.filter((todo) => todo.id != id);
       }

       //Flip the complete boolean on the specified todo 

       toggleTodo(id) {

        this.todos = this.todos.map((todo) => 
        todo.id === id ? {id=todo.id,text:todo.text,complete:!todo.complete} 
        : todo);
       }

}

class View{
    constructor(){
        //The root element
        this.app = this.getElement('#root');

        // The title of the app
        this.title = this.createElement('h1');
        this.title.textContent = 'Todos';

        // The form , with a [type=='text'] input , and a submit button
        this.form = this.createElement('form');
        this.input = this.createElement('input');
        this.input.type = 'text';
        this.input.placeholder = 'Add todo';
        this.input.name = 'todo';

        this.submitButton = this.createElement('button');
        this.submitButton.textContent = 'Submit';

        // The visual reperesntation of todo list

        this.todoList = this.createElement('ul' , 'todo-list');
        
        // Append the input and submit button to the form 

        this.form.append(this.input,this.submitButton);

        //Append the title, form, and todo list to the app

        this.app.append(this.title,this.form,this.todoList)

    }

    get_todoText(){
        return this.input.value;
    }
    
    _resetInput(){
        this.input.value = ''
    }
    // Creating element with an optional CSS classname
    createElement(tag, classname) {
        const element = document.createElement(tag);
        if (classname) {
            element.classList.add(className);
        }

        return element;
    }
    // Getting element from DOM by Selector
    getElement(selector) {
        const element = document.querySelector(selector);

        return element;
    }

    displayTodos(todos) {
       
        while(this.todosList.firstChild) {

            this.todoList.removeChild(this.todoList.firstChild);
        }

        if (todos.length === 0)  {
            const p =this.createElement('p');
            p.textContent = 'Nothing to do ! Add a task ?'
            this.todoList.append(p)
        }
        else{
            todos.forEach((todo) => {

                const li =this.createElement('li');
                li.id = todo.id;

                const checkBox = this.createElement('input');
                checkBox.type = 'checkbox';
                checkBox.checked = todo.complete;

                const span = this.createElement('span');
                span.contentEditable = true ;
                span.classList.add('editable');


                if (todo.complete) {
                    const strike = this.createElement('s');
                    strike.textContent = todo.text;
                    span.append(strike);

                }else{
                    span.textContent = todo.text;
                }

                const deleteButton = this.createElement('button' , 'delete');
                deleteButton.textContent = 'Delete';


                li.append(checkBox , span , deleteButton);

                this.todoList.append(li)
                
            });
        }

    }

}

class Controller {
    constructor(model,view){
        this.model = model;
        this.view = view;
    }
}

const app = new Controller(new Model() , new View());