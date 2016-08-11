import { Action, SetFilterAction } from '../../actions';
import { Filter } from '../../state';

export default function (state: Filter, action: Action): Filter {
    if (action instanceof SetFilterAction) {
        return action.filter;
    } else {
        return state;
    }
}
