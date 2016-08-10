import { Component, Input } from 'angular2/core';
import { Todo, Filter, dispatch, ToggleTodoAction, RemoveTodoAction } from 'todos';

@Component({
    selector: 'todos-body',
    styles: ['.completed { text-decoration: line-through; }'],
    template: `<ul class="list-group">
                   <li class="list-group-item" *ngFor="let filteredTodo of filteredTodos">
                       <label>
                           <input type="checkbox"
                                  [checked]="filteredTodo.completed"
                                  (click)="toggleTodo(filteredTodo)"
                                  [class.completed]="filteredTodo.completed">&nbsp;
                           {{filteredTodo.title}}
                       </label>
                       <button class="close" (click)="removeTodo(filteredTodo)">
                           <span>&times;</span>
                       </button>
                   </li>
               </ul>`
})
export class TodosBodyComponent {
    lastTodos: Array<Todo>;
    lastFilter: Filter;
    filteredTodos: Array<Todo> = [];

    @Input()
    set todos(todos: Array<Todo>) {
        this.lastTodos = todos;

        this.maybeFilter();
    }

    @Input()
    set filter(filter: Filter) {
        this.lastFilter = filter;

        this.maybeFilter();
    }

    ngOnChanges(changes: any) {
        console.log('BODY CHANGES:', JSON.stringify(changes));
    }

    maybeFilter() {
        if (this.lastFilter && this.lastTodos) {
            this.filteredTodos = filterTodos(this.lastTodos, this.lastFilter);
        }
    }

    toggleTodo(todo: Todo) {
        dispatch(new ToggleTodoAction(todo.id));
    }

    removeTodo(todo: Todo) {
        dispatch(new RemoveTodoAction(todo.id));
    }
}

function filterTodos(todos: Array<Todo>, filter: Filter): Array<Todo> {
    return todos.filter(todo => matches(todo, filter));

    function matches(todo: Todo, filter: string) {
        switch (filter) {
            case 'ALL':
                return true;
            case 'COMPLETED':
                return todo.completed;
            case 'PENDING':
                return !todo.completed;
            default:
                throw new Error(`Filter not supported: "${filter}".`);
        }
    }
}
