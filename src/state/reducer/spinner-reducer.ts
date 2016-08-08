import { Observable } from 'rxjs/Rx';
import {
    Action,
    FetchTodos,
    TodosFetchingFailed,
    TodosFetched,
    TodosSavingFailed,
    TodosSaved,
    SaveTodos
} from '../actions';

export default function (initialState: boolean, actions: Observable<Action>): Observable<boolean> {
    return actions.scan((state, action) => { // apply the action to the last state
        if (action instanceof FetchTodos || action instanceof SaveTodos) {
            return true;
        } else if (action instanceof TodosFetched || action instanceof TodosFetchingFailed ||
            action instanceof TodosSaved || action instanceof TodosSavingFailed) {
            return false;
        } else {
            return state;
        }
    }, initialState) // emmit the initial state to bootstrap the application
        .distinctUntilChanged(); // avoid emitting if not changed
}
