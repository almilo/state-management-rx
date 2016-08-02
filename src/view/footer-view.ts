import { Observable } from 'rxjs/Rx';
import { State, Todo } from '../state/state';
import { select } from '../lib';

let version = 0;

export default function (states: Observable<State>): Observable<string> {
    return select<State, Todo[]>(states, 'todos') // select only the todos list
        .map(render); // apply the rendering function

    function render(todos) {
        const totals = todos.reduce(accumulate, {completed: 0, pending: 0});

        return `<span>Pending: ${totals.pending}, Completed: ${totals.completed}
                    <button class="btn btn-xs btn-danger" onclick="foo.dispatch(new foo.RemoveCompletedTodosAction())">
                        Remove completed
                    </button>
                    <span> - version: ${version++}</span>
                </span>`;
    }

    function accumulate({completed, pending}, todo) {
        return {
            completed: todo.completed ? completed + 1 : completed,
            pending: !todo.completed ? pending + 1 : pending
        };
    }
}
