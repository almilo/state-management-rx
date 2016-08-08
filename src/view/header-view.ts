import { Observable } from 'rxjs/Rx';
import { State } from '../state/state';
import { select } from '../lib';
import { Filter } from '../state/reducer/filter-reducer';

type ViewModel = {
    filter: Filter,
    spinner: boolean,
    message: string
};

export default function (states: Observable<State>): Observable<string> {
    return select(states, 'ui') // select all the UI
        .map(render); // apply the rendering function

    function render(ui: ViewModel): string {
        const filters = ['ALL', 'COMPLETED', 'PENDING']
            .map(filter => {
                return `<label class="radio-inline">
                            <input type="radio" name="filter" value="${ui.filter}"
                                   ${filter === ui.filter ? 'checked' : ''}
                                   onchange="dispatch(new SetFilterAction('${filter}'))">
                            ${humanize(filter)}
                        </label>`;
            })
            .join('');

        return `<div class="row">
                    <span class="col-md-3">${filters}</span>
                    <span class="col-md-8">${ui.message}</span>
                    <span class="col-md-1" style="visibility: ${ui.spinner ? 'default' : 'hidden'}">Busy...</span>
                </div>`;

        function humanize(message: string): string {
            return message.toLowerCase().replace(/_/g, ' ');
        }
    }
}
