import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { State } from '../state';
import { Action } from '../actions';
import todos from './todos-reducer';
import filter from './filter-reducer';

export default function (initialState: State, actions: Observable<Action>): Observable<State> {
    const states = Observable.zip(
        todos(initialState.todos, actions),
        filter(initialState.filter, actions),
        (todos, filter) => ({todos, filter})
    );

    return wrapWithBehavior(initialState, states);
}

function wrapWithBehavior(initialValue, observable) {
    const behaviorSubject = new BehaviorSubject(initialValue);

    observable.subscribe(value => behaviorSubject.next(value));

    return behaviorSubject;
}
