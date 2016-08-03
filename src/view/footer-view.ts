import { Observable } from 'rxjs/Rx';
import { State } from '../state/state';
import { select, shallowEquals } from '../lib';

export default function (states: Observable<State>): Observable<string> {
    return select(states, groupTodosByState, shallowEquals)  // build the presentation model based on the application state: totals by state
        .map(render); // apply the rendering function

    function render(totalsByState) {
        return `<span>Pending: ${totalsByState.pending}, Completed: ${totalsByState.completed}
                    <button class="btn btn-xs btn-danger" onclick="foo.dispatch(new foo.RemoveCompletedTodosAction())">
                        Remove completed
                    </button>
                </span>`;
    }

    function groupTodosByState(state: State): {} {
        return state.todos.reduce(accumulate1, {completed: 0, pending: 0});

        function accumulate1({completed, pending}, todo) {
            return {
                completed: todo.completed ? completed + 1 : completed,
                pending: !todo.completed ? pending + 1 : pending
            };
        }
    }
}
