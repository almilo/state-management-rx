import { Filter } from './reducer/filter-reducer';

export interface Todo {
    id: number,
    title: string,
    completed: boolean
}

interface UiState {
    filter: Filter,
    spinner: boolean,
    message: string
}

interface BusinessState {
    todos: Todo[],
}

export interface State {
    ui: UiState,
    business: BusinessState
}
