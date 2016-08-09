import { Observable } from 'rxjs/Rx';
import { State, Todo } from '../state/state';
import { select, shallowEquals } from '../lib';

type ViewModel  = {
    pending: number,
    completed: number
};

export default function (states: Observable<State>): Observable<string> {
    return select(states, groupTodosByState, shallowEquals)  // build the presentation model based on the application state: totals by state
        .map(render); // apply the rendering function

    function render(viewModel: ViewModel): string {
        return `<div class="row">
                    <div class="col-md-8">Pending: ${viewModel.pending}, Completed: ${viewModel.completed}</div>
                    <div class="col-md-4">
                        <button class="btn btn-xs btn-danger" onclick="dispatch(new RemoveCompletedTodosAction())">
                            Remove completed todos
                        </button>
                        <button class="btn btn-xs btn-danger" onclick="dispatch(new SaveTodos())">
                            Save todos
                        </button>
                    </div>
                </div>`;
    }

    function groupTodosByState(state: State): ViewModel {
        return state.business.todos.reduce(accumulate, {completed: 0, pending: 0});

        function accumulate({completed, pending}, todo: Todo) {
            return {
                completed: todo.completed ? completed + 1 : completed,
                pending: !todo.completed ? pending + 1 : pending
            };
        }
    }
}
