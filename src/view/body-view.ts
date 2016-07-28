import { Observable } from 'rxjs/Rx';
import { State, Todo } from '../state/state';
import { select } from '../lib';

let version = 0;

export default function (states: Observable<State>): Observable<string> {
    return select<State, Todo[]>(states, 'todos')
        .map(todos => {
            const todosAsString = todos
                .map(todo => `  ${todo.title}: ${todo.completed ? 'completed' : 'pending'}`)
                .join('\n');

            return `Todos:\n${todosAsString} - version: ${version++}`;
        });
}
