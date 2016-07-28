import { Observable } from 'rxjs/Rx';
import { SetFilterAction, Action } from '../actions';

export default function (initialState: string, actions: Observable<Action>): Observable<string> {
    return actions.scan((state, action) => {
        if (action instanceof SetFilterAction) {
            return action.filter;
        } else {
            return state;
        }
    }, initialState);
}
