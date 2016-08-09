import { Observable } from 'rxjs/Rx';
import { Todo } from '../../state';
import {
    AddTodoAction,
    Action,
    ToggleTodoAction,
    RemoveTodoAction,
    RemoveCompletedTodosAction,
    ModifyTodoAction,
    FetchTodos,
    TodosFetchingFailed,
    TodosFetched,
    SaveTodos,
    TodosSavingFailed,
    TodosSaved
} from '../../actions';
import { shallowEquals } from '../../../lib/index';
import TodosService from '../../../services/todos-service';
import { sideEffect } from '../../../index';

const todosService = new TodosService();

export default function (initialState: Todo[], actions: Observable<Action>): Observable<Todo[]> {
    // Reducer pipeline: Todo[] + Observable<Action> => Observable<Todo[]>
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
        } else if (action instanceof FetchTodos) {
            sideEffect(dispatch => {
                todosService.load()
                    .then((todos: Todo[]) => dispatch(new TodosFetched(todos)))
                    .catch(error => dispatch(new TodosFetchingFailed(error)));
            });

            return state;
        } else if (action instanceof SaveTodos) {
            sideEffect(dispatch => {
                todosService.save(state)
                    .then((todos: Todo[]) => dispatch(new TodosSaved()))
                    .catch(error => dispatch(new TodosSavingFailed(error)));
            });

            return state;
        } else if (action instanceof TodosFetched) {
            return action.todos;
        } else {
            return state;
        }
    }, initialState) // emmit the initial state to bootstrap the application
        .distinctUntilChanged(shallowEquals); // avoid emitting if not changed
}

let nextId = Date.now();

function createTodo(id: number = nextId++, title: string, completed: boolean = false): Todo {
    return {id, title, completed};
}
