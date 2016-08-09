export interface Todo {
    id: number,
    title: string,
    completed: boolean
}

export type Filter = 'ALL' | 'COMPLETED' | 'PENDING';

export interface UiState {
    filter: Filter,
    spinner: number,
    message: string
}

export interface BusinessState {
    todos: Todo[],
}

export interface State {
    ui: UiState,
    business: BusinessState
}
