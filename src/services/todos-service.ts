import { Todo } from '../state/state';

const DELAY = 1000;
const TODOS_KEY = 'todos';

export default class TodosService {
    load(): Promise<Object | void> {
        try {
            const todos = JSON.parse(window.localStorage[TODOS_KEY] || '[]');

            return new Promise(resolve => setTimeout(() => resolve(todos), DELAY));
        } catch (e) {
            return Promise.reject(e);
        }
    }

    save(todos: Todo[]): Promise<Object | void> {
        try {
            window.localStorage[TODOS_KEY] = JSON.stringify(todos);

            return new Promise(resolve => setTimeout(() => resolve(), DELAY));
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
