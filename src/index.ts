import { Subject } from 'rxjs/Rx';
import {
    Action,
    AddTodoAction,
    ToggleTodoAction,
    RemoveTodoAction,
    RemoveCompletedTodosAction,
    SetFilterAction,
    NoopAction,
    ModifyTodoAction
} from './state/actions';
import reducer from './state/reducers';
import views from './view';

const actions = new Subject<Action>();
const states = reducer({todos: [], filter: 'SHOW_ALL'}, actions);

console.log('==== Initialization ====');

views(states).subscribe(view => console.log(view, '\n'));

console.log('==== Add 1 ====');

actions.next(new AddTodoAction(1, 'todo1'));

console.log('==== Set filter completed ====');

actions.next(new SetFilterAction('COMPLETED'));

console.log('==== Noop ====');

actions.next(new NoopAction());

console.log('==== Add 2 ====');

actions.next(new AddTodoAction(2, 'todo2'));

console.log('==== Add 3 ====');

actions.next(new AddTodoAction(3, 'todo3'));

console.log('==== Toggle 1 ====');

actions.next(new ToggleTodoAction(1));

console.log('==== Remove 2 ====');

actions.next(new RemoveTodoAction(2));

console.log('==== Modify 3 ====');

actions.next(new ModifyTodoAction(3, 'Foo'));

console.log('==== Remove completed ====');

actions.next(new RemoveCompletedTodosAction());

console.log('==== Set filter pending ====');

actions.next(new SetFilterAction('PENDING'));
