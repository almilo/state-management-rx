import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { State } from '../state';
import { Action } from '../actions';
import todosReducer from './todos-reducer';
import filterReducer from './filter-reducer';
import { shallowEquals } from '../../lib/index';

export default function (initialState: State, actions: Observable<Action>): Observable<State> {
    const states = Observable.combineLatest( // combine the partial reducers into the application state
        todosReducer(initialState.todos, actions),
        filterReducer(initialState.filter, actions),
        (todos, filter) => ({todos, filter})
    )
        .distinctUntilChanged(shallowEquals) // avoid emitting if not changed
        .share(); // do not set different processing pipelines

    return wrapWithBehavior(initialState, states) // use a behaviour to bootstrap the application
        .asObservable(); // expose only the observable part

    function wrapWithBehavior(initialValue, observable) {
        const behaviorSubject = new BehaviorSubject(initialValue);

        observable.subscribe(value => behaviorSubject.next(value));

        return behaviorSubject;
    }
}
