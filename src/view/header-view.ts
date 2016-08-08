import { Observable } from 'rxjs/Rx';
import { State } from '../state/state';
import { select } from '../lib';
import { Filter } from '../state/reducer/filter-reducer';

type ViewModel = Filter;

export default function (states: Observable<State>): Observable<string> {
    return select(states, 'ui.filter') // select only the filter
        .map(render); // apply the rendering function

    function render(selectedFilter: ViewModel): string {
        const filters = ['ALL', 'COMPLETED', 'PENDING']
            .map(filter => {
                return `<label class="radio-inline">
                            <input type="radio" name="filter" value="${filter}"
                                   ${filter === selectedFilter ? 'checked' : ''}
                                   onchange="dispatch(new SetFilterAction('${filter}'))">
                            ${humanize(filter)}
                        </label>`;
            })
            .join('');

        return `<span>${filters}</span>`;

        function humanize(message: string): string {
            return message.toLowerCase().replace(/_/g, ' ');
        }
    }
}
