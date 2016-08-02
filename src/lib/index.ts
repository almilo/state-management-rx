import { Observable } from 'rxjs/Rx';

export function select<T, V>(observable: Observable<T>, path?: string): Observable<V> {
    return observable
        .map(value => path ? value[path] : value) // select the part of the application state in which we are interested
        .distinctUntilChanged(); // don't emmit if the value we are interested in doesn't change
}

export function immutable<Object>(previousValue: Object, newValue: Object): Object {
    return equals(previousValue, newValue) ? previousValue : newValue;

    function equals(previousValue: Object, newValue: Object): boolean {
        const keys = Object.keys(previousValue);

        return keys.length === Object.keys(newValue).length && keys.every(key => previousValue[key] === newValue[key]);
    }
}
