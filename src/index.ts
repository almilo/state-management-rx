import { Subject } from 'rxjs/Rx';
import { Action, FetchTodos } from './state/actions';
import reducer from './state/reducer';
import view from './view';

const actions = new Subject<Action>();
const states = reducer({
    business: {
        todos: []
    },
    ui: {
        filter: 'ALL',
        spinner: false,
        message: ''
    }
}, actions);

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
