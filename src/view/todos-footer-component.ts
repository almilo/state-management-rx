import { Component, Input } from 'angular2/core';
import { Todo, dispatch, RemoveCompletedTodosAction, SaveTodosAction } from 'todos';

@Component({
    selector: 'todos-footer',
    template: `<span class="col-md-8">Pending: {{pending}}, Completed: {{completed}}</span>
               <span class="col-md-4">
                   <button class="btn btn-xs btn-danger" (click)="removeCompletedTodos()">
                       Remove completed todos
                   </button>
                   <button class="btn btn-xs btn-danger" (click)="saveTodos()">
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

    ngOnChanges(changes: any) {
        console.log('FOOTER CHANGES:', JSON.stringify(changes));
    }

    saveTodos() {
        dispatch(new SaveTodosAction());
    }

    removeCompletedTodos() {
        dispatch(new RemoveCompletedTodosAction());
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
