import { Subject } from 'rxjs/Rx';
import { Action } from './state/actions';
import reducer from './state/reducers';
import views from './view';

const actions = new Subject<Action>();
const states = reducer({todos: [], filter: 'ALL'}, actions);

export * from './state/actions';

export function dispatch(action: Action) {
    actions.next(action);
}

interface RenderCallback {
    (value: string): void
}

export function onRender(renderCallback: RenderCallback) {
    views(states).subscribe(renderCallback);
}
