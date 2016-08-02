import { Observable } from 'rxjs/Rx';
import { State, Todo } from '../state/state';
import { select } from '../lib';

let version = 0;

export default function (states: Observable<State>): Observable<string> {
    return select<State, Todo[]>(states) // select the whole application state (business model: todos + ui model: filter)
        .map(filterTodos) // build the presentation model based on the application state: filtered todos
        .map(render); // apply the rendering function

    function render(filteredTodos) {
        const filteredTodosAsString = filteredTodos
            .map(todo => `  ${todo.title}: ${todo.completed ? 'completed' : 'pending'}`)
            .join('\n');

        return `Todos:\n${filteredTodosAsString} - version: ${version++}`;
    }

    function filterTodos(state) {
        return state.todos.filter(todo => matches(todo, state.filter));

        function matches(todo, filter) {
            switch (filter) {
                case 'SHOW_ALL':
                    return true;
                case 'COMPLETED':
                    return todo.completed;
                case 'PENDING':
                    return !todo.completed;
                default:
                    throw new Error('Filter not supported: "' + state.filter + '".');
            }
        }
    }
}
