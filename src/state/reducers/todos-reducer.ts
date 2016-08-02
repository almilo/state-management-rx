import { Observable } from 'rxjs/Rx';
import { Todo } from '../state';
import {
    AddTodoAction,
    Action,
    ToggleTodoAction,
    RemoveTodoAction,
    RemoveCompletedTodosAction,
    ModifyTodoAction
} from '../actions';

export default function (initialState: Todo[], actions: Observable<Action>): Observable<Todo[]> {
    return actions.scan((state, action) => { // apply the action to the last state
        if (action instanceof AddTodoAction) {
            return [...state, createTodo(undefined, action.title)];
        } else if (action instanceof ModifyTodoAction) {
            return state.map(todo => todo.id !== action.id ? todo : createTodo(todo.id, action.title, todo.completed));
        } else if (action instanceof RemoveTodoAction) {
            return [...state].filter(todo => todo.id !== action.id);
        } else if (action instanceof RemoveCompletedTodosAction) {
            const pending = [...state].filter(todo => !todo.completed);

            return pending.length !== state.length ? pending : state;
        } else if (action instanceof ToggleTodoAction) {
            return [...state].map(todo => todo.id !== action.id ? todo : createTodo(todo.id, todo.title, !todo.completed));
        } else {
            return state;
        }
    }, initialState); // emmit the initial state to bootstrap the application
}

let nextId = Date.now();

function createTodo(id = nextId++, title, completed = false): Todo {
    return {id, title, completed};
}
