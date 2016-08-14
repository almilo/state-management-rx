import {
    Action,
    FetchTodosAction,
    TodosFetchingFailedAction,
    TodosFetchedAction,
    TodosSavingFailedAction,
    TodosSavedAction,
    SaveTodosAction
} from '../../actions';

export default function (state: number, action: Action): number {
    if (action instanceof FetchTodosAction || action instanceof SaveTodosAction) {
        return state + 1;
    } else if (action instanceof TodosFetchedAction || action instanceof TodosFetchingFailedAction ||
        action instanceof TodosSavedAction || action instanceof TodosSavingFailedAction) {
        if (state <= 0) {
            throw new Error(`Inconsistent spinner counter state: ${state}.`)
        }

        return state - 1;
    } else {
        return state;
    }
}
