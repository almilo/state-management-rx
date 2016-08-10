import { Subject } from 'rxjs/Rx';
import { Action, FetchTodosAction } from './state/actions';
import { State } from './state/state';
import reducer from './state/reducer';

const initialState: State = {
    business: {
        todos: []
    },
    ui: {
        filter: 'ALL',
        spinner: 0,
        message: ''
    }
};
const actions = new Subject<Action>();
export const states = reducer(initialState, actions);

export * from './state/actions';
export * from './state/state';

export function dispatch(action: Action) {
    actions.next(action);
}

export function bootstrap() {
    dispatch(new FetchTodosAction());
}

interface ActionDispatcher {
    (action: Action): void
}

interface SideEffectCallback {
    (dispatch: ActionDispatcher): void
}

export function sideEffect(sideEffectCallback: SideEffectCallback) {
    sideEffectCallback(dispatch);
}
