import { Observable } from 'rxjs/Rx';
import { Todo } from '../state';
import { AddTodoAction, Action, ToggleTodoAction } from '../actions';

export default function (initialState: Todo[], actions: Observable<Action>): Observable<Todo[]> {
    return actions.scan((state, action) => {
        if (action instanceof AddTodoAction) {
            return [...state, createTodo(action.id, action.title)];
        } else if (action instanceof ToggleTodoAction) {
            return [...state].map(createToggler(action.id));
        } else {
            return state;
        }
    }, initialState);
}

function createTodo(id, title, completed = false): Todo {
    return {id, title, completed};
}

function createToggler(id: number): (Todo) => Todo {
    return (todo: Todo) => todo.id !== id ? todo : createTodo(todo.id, todo.title, !todo.completed);
}
