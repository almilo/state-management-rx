import { Filter } from './reducer/filter-reducer';
import { Todo } from './state';

export class AddTodoAction {
    constructor(public title: string) {
    }
}

export class ModifyTodoAction {
    constructor(public id: number, public title: string) {
    }
}

export class RemoveTodoAction {
    constructor(public id: number) {
    }
}

export class ToggleTodoAction {
    constructor(public id: number) {
    }
}

export class RemoveCompletedTodosAction {
}

export class SetFilterAction {
    constructor(public filter: Filter) {
    }
}

export class FetchTodos {
}

export class TodosFetched {
    constructor(public todos: Todo[]) {
    }
}

export class TodosFetchingFailed {
    constructor(public error: string) {
    }
}

export class SaveTodos {
}

export class TodosSaved {
}

export class TodosSavingFailed {
    constructor(public error: string) {
    }
}

export type Action = AddTodoAction |
    ModifyTodoAction |
    RemoveTodoAction |
    ToggleTodoAction |
    RemoveCompletedTodosAction |
    SetFilterAction |
    FetchTodos |
    TodosFetched |
    TodosFetchingFailed |
    SaveTodos |
    TodosSaved |
    TodosSavingFailed;
