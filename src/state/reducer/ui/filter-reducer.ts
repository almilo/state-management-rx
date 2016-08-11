import { Observable } from 'rxjs/Rx';
import { Action, SetFilterAction } from '../../actions';
import { Filter } from '../../state';

export default function (initialState: Filter, actions: Observable<Action>): Observable<Filter> {
    // Reducer pipeline: Filter + Observable<Action> => Observable<Filter>
    return actions.scan(reducer, initialState) // emmit the initial state to bootstrap the application
        .distinctUntilChanged(); // avoid emitting if not changed

    function reducer(state: Filter, action: Action) { // apply the action to the last state
        if (action instanceof SetFilterAction) {
            return action.filter;
        } else {
            return state;
        }
    }
}
