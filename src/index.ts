import { Subject } from 'rxjs/Rx';
import { Action, AddTodoAction, ToggleTodoAction } from './state/actions';
import reducer from './state/reducers';
import views from './view';

const actions = new Subject<Action>();
const states = reducer({todos: [], filter: 'SHOW_ALL'}, actions);

let renderings = 0;

console.log('==== Initialization ====');

views(states).subscribe(view => {
    renderings++;
    console.log(view, '\n');
});

console.log('==== Add 1 ====');

actions.next(new AddTodoAction(1, 'todo1'));

console.log('==== Add 2 ====');

actions.next(new AddTodoAction(2, 'todo2'));

console.log('==== Toggle ====');

actions.next(new ToggleTodoAction(1));

console.log('Renderings:', renderings);
