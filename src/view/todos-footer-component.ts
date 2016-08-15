import { Component, Input, Output, EventEmitter } from 'angular2/core';
import { Todo } from 'todos';

@Component({
    selector: 'todos-footer',
    template: `<span class="col-md-8">Pending: {{pending}}, Completed: {{completed}}</span>
               <span class="col-md-4">
                   <button class="btn btn-xs btn-danger" (click)="removeCompletedTodos.emit()">
                       Remove completed todos
                   </button>
                   <button class="btn btn-xs btn-danger" (click)="saveTodos.emit()">
                       Save todos
                   </button>
               </span>`
})
export class TodosFooterComponent {
    pending: number;
    completed: number;

    @Input()
    set todos(todos: Array<Todo>) {
        const {completed, pending} = groupTodosByState(todos);

        this.completed = completed;
        this.pending = pending;
    }

    @Output() removeCompletedTodos = new EventEmitter();
    @Output() saveTodos = new EventEmitter();

    ngOnChanges(changes: any) {
        console.log('FOOTER CHANGES:', JSON.stringify(changes));
    }
}

function groupTodosByState(todos: Array<Todo>): {completed: number, pending: number} {
    return todos.reduce(accumulate, {completed: 0, pending: 0});

    function accumulate({completed, pending}, todo: Todo) {
        return {
            completed: todo.completed ? completed + 1 : completed,
            pending: !todo.completed ? pending + 1 : pending
        };
    }
}
