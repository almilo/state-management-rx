import { Observable } from 'rxjs/Rx';
import { Action, TodosFetchingFailed, TodosSavingFailed } from '../actions';

export default function (initialState: string, actions: Observable<Action>): Observable<string> {
    // Reducer pipeline: string + Observable<Action> => Observable<string>
    return actions.scan((state, action) => { // apply the action to the last state
        if (action instanceof TodosFetchingFailed) {
            return `Fetching the todo list failed: '${action.error}'.`;
        } else if (action instanceof TodosSavingFailed) {
            return `Saving the todo list failed: '${action.error}'.`;
        } else {
            return '';
        }
    }, initialState) // emmit the initial state to bootstrap the application
        .distinctUntilChanged(); // avoid emitting if not changed
}
