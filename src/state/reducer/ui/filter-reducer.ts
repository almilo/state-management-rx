import { Observable } from 'rxjs/Rx';
import { SetFilterAction, Action } from '../../actions';
import { Filter } from '../../state';

export default function (initialState: Filter, actions: Observable<Action>): Observable<Filter> {
    // Reducer pipeline: Filter + Observable<Action> => Observable<Filter>
    return actions.scan((state, action) => { // apply the action to the last state
        if (action instanceof SetFilterAction) {
            return action.filter;
        } else {
            return state;
        }
    }, initialState) // emmit the initial state to bootstrap the application
        .distinctUntilChanged(); // avoid emitting if not changed
}
