import { Observable } from 'rxjs/Rx';

export function select<T, V>(observable: Observable<T>, path?: string): Observable<V> {
    return observable
        .map(value => path ? value[path] : value) // select the part of the whole application state we are interested in
        .distinctUntilChanged(); // don't emmit if the value we are interested in does not change
}
