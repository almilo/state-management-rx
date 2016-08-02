import { Observable } from 'rxjs/Rx';
import { State } from '../state/state';
import { select } from '../lib';

let version = 0;

export default function (states: Observable<State>): Observable<string> {
    return select<State, string>(states, 'filter') // select only the filter
        .map(render); // apply the rendering function

    function render(selectedFilter) {
        const filters = ["ALL", "COMPLETED", "PENDING"]
            .map(filter => {
                return `<label class="radio-inline">
                            <input type="radio" name="filter" value="${filter}"
                                   ${filter === selectedFilter ? 'checked' : ''}
                                   onchange="foo.dispatch(new foo.SetFilterAction('${filter}'))">
                            ${humanize(filter)}
                        </label>`;
            })
            .join('');

        return `<div>${filters}<span> - version: ${version++}</span></div>`;

        function humanize(message: string): string {
            return message.toLowerCase().replace(/_/g, ' ');
        }
    }
}
