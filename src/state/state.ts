export interface Todo {
    id: number,
    title: string,
    completed: boolean
}

export interface State {
    todos: Todo[],
    filter: string
}
