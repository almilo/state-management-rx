import { Observable } from 'rxjs/Rx';
import { State } from '../state';
import { Action } from '../actions';
import { combineObservableFactories, toObservableFactory } from '../../lib/index';
import filterReducer from './ui/filter-reducer';
import spinnerReducer from './ui/spinner-reducer';
import messageReducer from './ui/message-reducer';
import todosReducer from './business/todos-reducer';

export default function (initialState: State, actions: Observable<Action>): Observable<State> {
    return Observable.combineLatest(
        combineObservableFactories(
            initialState.ui,
            actions,
            {
                filter: toObservableFactory(filterReducer),
                spinner: toObservableFactory(spinnerReducer),
                message: toObservableFactory(messageReducer)
            }
        ),
        combineObservableFactories(
            initialState.business,
            actions,
            {
                todos: toObservableFactory(todosReducer)
            }),
        (ui, business) => ({ui, business})
    )
        .share(); // do not set up different processing pipelines
}
