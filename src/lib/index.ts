import { Observable } from 'rxjs/Rx';

interface Equality<T> {
    (value1: T, value2: T): boolean
}

export function select<T, V>(observable: Observable<T>, selector?: string | Function, equality?: Equality<T>): Observable<V> {
    return observable
        .map(asFunction(selector)) // select the part of the application state in which we are interested
        .distinctUntilChanged(equality); // don't emmit if the value we are interested in doesn't change

    function asFunction(selector: string | Function) {
        return (value: any) => {
            if (!selector) {
                return value;
            }

            return selector instanceof Function ? selector(value) : getPath(value, selector);
        }
    }
}

export function shallowEquals<T>(object1: Object | Array<T>, object2: Object | Array<T>): boolean {
    if (object1 instanceof Array && object2 instanceof Array) {
        return object1.length === object2.length && object1.every((todo, index) => object1[index] === object2[index]);
    } else if (object1 instanceof Object && object2 instanceof Object) {
        const properties1 = Object.keys(object1);
        const properties2 = Object.keys(object2);

        return properties1.length === properties2.length && properties1.every(hasCounterpart) && properties2.every(hasCounterpart);

        function hasCounterpart(propertyName: string) {
            return (<{[key: string]: any}>object1)[propertyName] === (<{[key: string]: any}>object2)[propertyName];
        }
    } else {
        throw new Error(`Only arrays and objects are supported and both value must be of the same type: '${typeof object1}', '${typeof object2}'.`);
    }
}

const versions: {[index: string]: number} = {};

export function versioned(views: Observable<string>, id: string): Observable<string> {
    return views.map(view => {
        versions[id] = (versions[id] !== undefined ? versions[id] : -1) + 1;

        return `<div class="debug">${view}<span class="version">version: ${versions[id]}&nbsp;</span></div>`;
    });
}

function getPath(obj: Object, path: string): any {
    return path.split('.').reduce((source, property) => (<{[key: string]: any}>source)[property], obj);
}
