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
            return [...state, createTodo(action.id, action.title)];
        } else if (action instanceof ModifyTodoAction) {
            return state.map(todo => todo.id !== action.id ? todo : createTodo(todo.id, action.title, todo.completed));
        } else if (action instanceof RemoveTodoAction) {
            return [...state].filter(todo => todo.id !== action.id);
        } else if (action instanceof RemoveCompletedTodosAction) {
            return [...state].filter(todo => !todo.completed);
        } else if (action instanceof ToggleTodoAction) {
            return [...state].map(todo => todo.id !== action.id ? todo : createTodo(todo.id, todo.title, !todo.completed));
        } else {
            return state;
        }
    }, initialState); // emmit the initial state to bootstrap the application
}

function createTodo(id, title, completed = false): Todo {
    return {id, title, completed};
}
