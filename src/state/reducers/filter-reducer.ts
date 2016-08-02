import { Observable } from 'rxjs/Rx';
import { SetFilterAction, Action } from '../actions';

export default function (initialState: string, actions: Observable<Action>): Observable<string> {
    return actions.scan((state, action) => { // apply the action to the last state
        if (action instanceof SetFilterAction) {
            return action.filter;
        } else {
            return state;
        }
    }, initialState); // emmit the initial state to bootstrap the application
}
