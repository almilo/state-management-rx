export class AddTodoAction {
    constructor(public id: number, public title: string) {
    }
}

export class ToggleTodoAction {
    constructor(public id: number) {
    }
}

export class SetFilterAction {
    constructor(public filter: string) {
    }
}

export type Action = AddTodoAction | ToggleTodoAction | SetFilterAction;
