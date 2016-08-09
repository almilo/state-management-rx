import { Subject } from 'rxjs/Rx';
import { Action, FetchTodos } from './state/actions';
import { State } from './state/state';
import reducer from './state/reducer';
import view from './view';

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
const states = reducer(initialState, actions);

export * from './state/actions';

export function dispatch(action: Action) {
    actions.next(action);
}

interface RenderCallback {
    (value: string): void
}

export function onRender(renderCallback: RenderCallback) {
    view(states).subscribe(renderCallback);
}

export function bootstrap() {
    dispatch(new FetchTodos());
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
