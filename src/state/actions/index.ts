export class AddTodoAction {
    constructor(public id: number, public title: string) {
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
    constructor() {
    }
}

export class SetFilterAction {
    constructor(public filter: string) {
    }
}

export class NoopAction {
}

export type Action = AddTodoAction |
    ModifyTodoAction |
    RemoveTodoAction |
    ToggleTodoAction |
    RemoveCompletedTodosAction |
    SetFilterAction |
    NoopAction;
