import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { State } from '../state';
import { Action } from '../actions';
import { combineObservableFactories } from '../../lib/index';
import filter from './ui/filter-reducer';
import spinner from './ui/spinner-reducer';
import message from './ui/message-reducer';
import todos from './business/todos-reducer';

export default function (initialState: State, actions: Observable<Action>): Observable<State> {
    const states = Observable.combineLatest( // combine the partial reducers into the application state
        combineObservableFactories(initialState.ui, actions, {filter, spinner, message}),
        combineObservableFactories(initialState.business, actions, {todos}),
        (ui, business) => ({ui, business})
    )
        .share(); // do not set up different processing pipelines

    return wrapWithBehavior(initialState, states) // use a behaviour to bootstrap the application
        .asObservable(); // expose only the observable part

    function wrapWithBehavior(initialValue: State, observable: Observable<State>) {
        const behaviorSubject = new BehaviorSubject(initialValue);

        observable.subscribe(value => behaviorSubject.next(value));

        return behaviorSubject;
    }
}
