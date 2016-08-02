import { Filter } from './reducers/filter-reducer';

export interface Todo {
    id: number,
    title: string,
    completed: boolean
}

export interface State {
    todos: Todo[],
    filter: Filter
}
