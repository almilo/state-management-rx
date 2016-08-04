import { Filter } from './reducers/filter-reducer';

export interface Todo {
    id: number,
    title: string,
    completed: boolean
}

interface UiState {
    filter: Filter
}

interface BusinessState {
    todos: Todo[],
}

export interface State {
    ui: UiState,
    business: BusinessState
}
