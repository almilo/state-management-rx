import { Observable } from 'rxjs/Rx';

interface IEquality<T> {
    (value1: T, value2: T): boolean
}

export function select<T, V>(observable: Observable<T>, selector?: string | Function, equality?: IEquality<T>): Observable<V> {
    return observable
        .map(asFunction(selector)) // select the part of the application state in which we are interested
        .distinctUntilChanged(equality); // don't emmit if the value we are interested in doesn't change

    function asFunction(selector) {
        return value => {
            if (!selector) {
                return value;
            }

            return selector instanceof Function ? selector(value) : value[selector];
        }
    }
}

export function shallowEquals(object1, object2): boolean {
    if (!(object1 instanceof Object && object2 instanceof Object)) {
        throw new Error(`Only objects are supported: '${typeof object1}', '${typeof object2}'.`);
    }

    if (object1.length === undefined) {
        const properties1 = Object.keys(object1);
        const properties2 = Object.keys(object2);

        return properties1.length === properties2.length &&
            properties1.every(property => object1[property] === object2[property]) &&
            properties2.every(property => object1[property] === object2[property]);
    } else {
        return object1.length === object2.length && object1.every((todo, index) => object1[index] === object2[index]);
    }
}

let versions = {};

export function versioned(content: string, id: string): string {
    versions[id] = (versions[id] !== undefined ? versions[id] : -1) + 1;

    return `<div class="debug">${content}<span class="version">version: ${versions[id]}&nbsp;</span></div>`;
}
