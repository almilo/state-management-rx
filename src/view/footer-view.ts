import { Observable } from 'rxjs/Rx';
import { State, Todo } from '../state/state';
import { select } from '../lib';

let version = 0;

export default function (states: Observable<State>): Observable<string> {
    return select<State, Todo[]>(states, 'todos')
        .map(todos => {
            const {completed, pending} = todos.reduce(accumulate, {completed: 0, pending: 0});

            return `Pending: ${pending}, Completed: ${completed} - version: ${version++}`;

            function accumulate({completed, pending}, todo) {
                return {
                    completed: todo.completed ? completed + 1 : completed,
                    pending: !todo.completed ? pending + 1 : pending
                };
            }
        });
}
