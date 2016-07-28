import { Observable } from 'rxjs/Rx';

interface ISelector<T, V> {
    (T): V;
}

export function select<T, V>(observable: Observable<T>, pathOrSelector: string | ISelector<T, V>): Observable<V> {
    const selector = asSelector(pathOrSelector);

    return observable.map(value => selector(value));
}

function asSelector<T, V>(pathOrSelector: string | ISelector<T, V>): ISelector<T, V> {
    if (pathOrSelector instanceof Function) {
        return pathOrSelector;
    } else {
        const paths = pathOrSelector.split('.');

        return value => paths.reduce((value, path) => (value[path]), value);
    }
}
