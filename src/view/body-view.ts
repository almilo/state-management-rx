import { Observable } from 'rxjs/Rx';
import { State, Todo } from '../state/state';
import { select } from '../lib';
import { Filter } from '../state/reducers/filter-reducer';

let version = 0;

export default function (states: Observable<State>): Observable<string> {
    return select<State, Todo[]>(states) // select the whole application state (business model: todos + ui model: filter)
        .map(filterTodos) // build the presentation model based on the application state: filtered todos
        .map(render); // apply the rendering function

    function render(filteredTodos) {
        const filteredTodosAsListElements = filteredTodos
            .map(todo => `<li class="list-group-item">
                              <label>
                                  <input type="checkbox" ${todo.completed ? ' checked' : ''}
                                         onchange="foo.dispatch(new foo.ToggleTodoAction(${todo.id}))">&nbsp;
                                      ${todo.completed ? '<s>' : ''}${todo.title}${todo.completed ? '</s>' : ''}
                              </label>
                              <button class="close" onclick="foo.dispatch(new foo.RemoveTodoAction(${todo.id}))">
                                  <span>&times;</span>
                              </button>
                          </li>`
            )
            .join('');

        return `<div>version: ${version++}</div><ul class="list-group">${filteredTodosAsListElements}</ul>`;
    }

    function filterTodos(state) {
        return state.todos.filter(todo => matches(todo, state.filter));

        function matches(todo: Todo, filter: Filter) {
            switch (filter) {
                case 'ALL':
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
