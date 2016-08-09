import { Observable } from 'rxjs/Rx';
import { State, Filter } from '../state/state';
import { select } from '../lib';

type ViewModel = {
    filter: Filter,
    spinner: number,
    message: string
};

export default function (states: Observable<State>): Observable<string> {
    //                                  select                   render
    // Render pipeline: Observable<State> => Observable<ViewModel> => Observable<string>
    return select<State, ViewModel>(states, 'ui').map(render);

    function render(viewModel: ViewModel): string {
        const filters = ['ALL', 'COMPLETED', 'PENDING']
            .map(filter => `<label class="radio-inline">
                                <input type="radio" name="filter" value="${viewModel.filter}"
                                       ${filter === viewModel.filter ? 'checked' : ''}
                                       onchange="dispatch(new SetFilterAction('${filter}'))">
                                ${humanize(filter)}
                            </label>`)
            .join('');

        return `<div class="row">
                    <span class="col-md-3">${filters}</span>
                    <span class="col-md-8">${viewModel.message}</span>
                    <span class="col-md-1" style="visibility: ${viewModel.spinner > 0 ? 'default' : 'hidden'}">Busy...</span>
                </div>`;

        function humanize(message: string): string {
            return message.toLowerCase().replace(/_/g, ' ');
        }
    }
}
