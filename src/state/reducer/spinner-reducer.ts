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

export default function (initialState: number, actions: Observable<Action>): Observable<number> {
    return actions.scan((state, action) => { // apply the action to the last state
        if (action instanceof FetchTodos || action instanceof SaveTodos) {
            return state + 1;
        } else if (action instanceof TodosFetched || action instanceof TodosFetchingFailed ||
            action instanceof TodosSaved || action instanceof TodosSavingFailed) {
            if (state < 0) {
                throw new Error(`Inconsistent spinner counter state: ${state}.`)
            }
            return state - 1;
        } else {
            return state;
        }
    }, initialState) // emmit the initial state to bootstrap the application
        .distinctUntilChanged(); // avoid emitting if not changed
}
