import { Observable } from 'rxjs/Rx';
import { Action, TodosFetchingFailedAction, TodosSavingFailedAction } from '../../actions';

export default function (initialState: string, actions: Observable<Action>): Observable<string> {
    // Reducer pipeline: string + Observable<Action> => Observable<string>
    return actions.scan((state, action) => { // apply the action to the last state
        if (action instanceof TodosFetchingFailedAction) {
            return `Fetching the todo list failed: '${action.error}'.`;
        } else if (action instanceof TodosSavingFailedAction) {
            return `Saving the todo list failed: '${action.error}'.`;
        } else {
            return '';
        }
    }, initialState) // emmit the initial state to bootstrap the application
        .distinctUntilChanged(); // avoid emitting if not changed
}
