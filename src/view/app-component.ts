import { Component } from 'angular2/core';
import { Subscription } from 'rxjs/Rx';
import { State, states, bootstrap, dispatch, AddTodoAction } from 'todos';
import { TodosHeaderComponent } from './todos-header-component';
import { TodosBodyComponent } from './todos-body-component';
import { TodosFooterComponent } from './todos-footer-component';

@Component({
    selector: 'app',
    directives: [TodosHeaderComponent, TodosBodyComponent, TodosFooterComponent],
    template: `<div class="row">
                   <span>Renderings: {{renderings}}</span>
               </div>
               <div class="row">
                   <input type="text" class="form-control" (keypress)="maybeAddTodo($event)" autofocus>
               </div>
               <div class="row">
                   <todos-header [filter]="state.ui.filter" [message]="state.ui.message" [spinner]="state.ui.spinner"></todos-header>
               </div>
               <div class="row">
                   <todos-body [todos]="state.business.todos" [filter]="state.ui.filter"></todos-body>
               </div>
               <div class="row">
                   <todos-footer [todos]="state.business.todos"></todos-footer>
               </div>`
})
export class AppComponent {
    renderings: number = 0;
    subscription: Subscription;
    state: State;

    ngOnInit() {
        this.subscription = states.subscribe((state: State) => {
            this.state = state;
            this.renderings++;
        });

        bootstrap();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    maybeAddTodo(event: KeyboardEvent) {
        const target: {value: string} = <any>event.target;
        const inputValue = target.value.trim();

        if (event.keyCode === 13 && inputValue.length > 0) {
            dispatch(new AddTodoAction(inputValue));
            target.value = '';
        }
    }
}
