import { Observable } from 'rxjs/Rx';
import { State, Todo } from '../state/state';
import { shallowEquals, select } from '../lib';
import { Filter } from '../state/reducers/filter-reducer';

export default function (states: Observable<State>): Observable<string> {
    return select(states, filterTodos, shallowEquals) // build the presentation model based on the application state: filtered todos
        .map(render); // apply the rendering function

    function render(filteredTodos: Todo[]) {
        const filteredTodosAsListElements = filteredTodos
            .map(filteredTodo => `<li class="list-group-item">
                              <label>
                                  <input type="checkbox" ${filteredTodo.completed ? ' checked' : ''}
                                         onchange="dispatch(new ToggleTodoAction(${filteredTodo.id}))">&nbsp;
                                      ${filteredTodo.completed ? '<s>' : ''}${filteredTodo.title}${filteredTodo.completed ? '</s>' : ''}
                              </label>
                              <button class="close" onclick="dispatch(new RemoveTodoAction(${filteredTodo.id}))">
                                  <span>&times;</span>
                              </button>
                          </li>`
            )
            .join('');

        return `<ul class="list-group">${filteredTodosAsListElements}</ul>`;
    }

    function filterTodos(state: State): Todo[] {
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
