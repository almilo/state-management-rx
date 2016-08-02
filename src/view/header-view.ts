import { Observable } from 'rxjs/Rx';
import { State } from '../state/state';
import { select } from '../lib';

let version = 0;

export default function (states: Observable<State>): Observable<string> {
    return select<State, string>(states, 'filter') // select only the filter
        .map(render); // apply the rendering function

    function render(filter) {
        return `Filter: ${humanize(filter)} - version: ${version++}`;

        function humanize(message: string): string {
            return message.toLowerCase().replace(/_/g, ' ');
        }
    }
}
