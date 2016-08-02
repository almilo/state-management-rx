import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { immutable } from '../../lib';
import { State } from '../state';
import { Action } from '../actions';
import todos from './todos-reducer';
import filter from './filter-reducer';

let previousState: State = {todos: undefined, filter: undefined};

export default function (initialState: State, actions: Observable<Action>): Observable<State> {
    const states = Observable.zip( // combine the partial reducers into the application state
        todos(initialState.todos, actions),
        filter(initialState.filter, actions),
        (todos, filter) => previousState = immutable(previousState, {todos, filter})
    )
        .share(); // do not set different processing pipelines

    return wrapWithBehavior(initialState, states) // use a behaviour to bootstrap the application
        .asObservable(); // expose only the observable part

    function wrapWithBehavior(initialValue, observable) {
        const behaviorSubject = new BehaviorSubject(initialValue);

        observable.subscribe(value => behaviorSubject.next(value));

        return behaviorSubject;
    }
}
