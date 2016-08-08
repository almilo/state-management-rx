import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { State } from '../state';
import { Action } from '../actions';
import todosReducer from './todos-reducer';
import filterReducer from './filter-reducer';

export default function (initialState: State, actions: Observable<Action>): Observable<State> {
    const states = Observable.combineLatest( // combine the partial reducers into the application state
        todosReducer(initialState.business.todos, actions),
        filterReducer(initialState.ui.filter, actions),
        (todos, filter) => ({business: {todos}, ui: {filter}})
    )
        .share(); // do not set different processing pipelines

    return wrapWithBehavior(initialState, states) // use a behaviour to bootstrap the application
        .asObservable(); // expose only the observable part

    function wrapWithBehavior(initialValue: State, observable: Observable<State>) {
        const behaviorSubject = new BehaviorSubject(initialValue);

        observable.subscribe(value => behaviorSubject.next(value));

        return behaviorSubject;
    }
}
