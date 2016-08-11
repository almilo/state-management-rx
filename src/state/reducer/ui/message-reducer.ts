import { Action, TodosFetchingFailedAction, TodosSavingFailedAction } from '../../actions';

export default function (state: string, action: Action) {
    if (action instanceof TodosFetchingFailedAction) {
        return `Fetching the todo list failed: '${action.error}'.`;
    } else if (action instanceof TodosSavingFailedAction) {
        return `Saving the todo list failed: '${action.error}'.`;
    } else {
        return '';
    }
}
