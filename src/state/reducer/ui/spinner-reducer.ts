import { Observable } from 'rxjs/Rx';
import {
    Action,
    FetchTodosAction,
    TodosFetchingFailedAction,
    TodosFetchedAction,
    TodosSavingFailedAction,
    TodosSavedAction,
    SaveTodosAction
} from '../../actions';

export default function (initialState: number, actions: Observable<Action>): Observable<number> {
    // Reducer pipeline: number + Observable<Action> => Observable<number>
    return actions.scan((state, action) => { // apply the action to the last state
        if (action instanceof FetchTodosAction || action instanceof SaveTodosAction) {
            return state + 1;
        } else if (action instanceof TodosFetchedAction || action instanceof TodosFetchingFailedAction ||
            action instanceof TodosSavedAction || action instanceof TodosSavingFailedAction) {
            if (state <= 0) {
                throw new Error(`Inconsistent spinner counter state: ${state}.`)
            }

            return state - 1;
        } else {
            return state;
        }
    }, initialState) // emmit the initial state to bootstrap the application
        .distinctUntilChanged(); // avoid emitting if not changed
}
