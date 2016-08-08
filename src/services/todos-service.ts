import { Todo } from '../state/state';

const TODOS_KEY = 'todos';

export default class TodosService {
    load(): Promise<Object | void> {
        try {
            const todos = JSON.parse(window.localStorage[TODOS_KEY] || '[]');

            return new Promise(resolve => setTimeout(() => resolve(todos), 1000));
        } catch (e) {
            return Promise.reject(e);
        }
    }

    save(todos: Todo[]): Promise<Object | void> {
        try {
            window.localStorage[TODOS_KEY] = JSON.stringify(todos);

            return new Promise(resolve => setTimeout(() => resolve(), 1000));
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
