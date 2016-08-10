import { Todo, Filter } from './state';

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

export class FetchTodosAction {
}

export class TodosFetchedAction {
    constructor(public todos: Todo[]) {
    }
}

export class TodosFetchingFailedAction {
    constructor(public error: string) {
    }
}

export class SaveTodosAction {
}

export class TodosSavedAction {
}

export class TodosSavingFailedAction {
    constructor(public error: string) {
    }
}

export type Action = AddTodoAction |
    ModifyTodoAction |
    RemoveTodoAction |
    ToggleTodoAction |
    RemoveCompletedTodosAction |
    SetFilterAction |
    FetchTodosAction |
    TodosFetchedAction |
    TodosFetchingFailedAction |
    SaveTodosAction |
    TodosSavedAction |
    TodosSavingFailedAction;
