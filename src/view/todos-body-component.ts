import { Component, Input, Output, EventEmitter } from 'angular2/core';
import { Todo, Filter } from 'todos';

@Component({
    selector: 'todos-body',
    styles: ['.completed { text-decoration: line-through; }'],
    template: `<ul class="list-group">
                   <li class="list-group-item" *ngFor="let filteredTodo of filteredTodos">
                       <label>
                           <input type="checkbox"
                                  [checked]="filteredTodo.completed"
                                  (click)="todoToggled.emit(filteredTodo)">&nbsp;
                           <span [class.completed]="filteredTodo.completed">{{filteredTodo.title}}</span>                           
                       </label>
                       <button class="close" (click)="todoRemoved.emit(filteredTodo);">
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

    @Output() todoToggled = new EventEmitter();
    @Output() todoRemoved = new EventEmitter();

    ngOnChanges(changes: any) {
        console.log('BODY CHANGES:', JSON.stringify(changes));
    }

    maybeFilter() {
        if (this.lastFilter && this.lastTodos) {
            this.filteredTodos = filterTodos(this.lastTodos, this.lastFilter);
        }
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
