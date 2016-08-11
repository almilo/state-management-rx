import { Observable } from 'rxjs/Rx';
import { Action } from '../state/actions';

interface Equality<T> {
    (value1: T, value2: T): boolean
}

export function select<T, V>(observable: Observable<T>, selector?: string | Function, equality: Equality<T> = shallowEquals): Observable<V> {
    return observable
        .map(asFunction(selector)) // select the part of the application state in which we are interested
        .distinctUntilChanged(equality); // don't emmit if the value we are interested in doesn't change

    function asFunction(selector: string | Function) {
        return (value: any) => {
            if (!selector) {
                return value;
            }

            return selector instanceof Function ? selector(value) : getPath(value, selector);
        };

        function getPath(obj: Object, path: string): any {
            return path.split('.').reduce((source, property) => (<{[key: string]: any}>source)[property], obj);
        }
    }
}

function shallowEquals(value1: any, value2: any): boolean {
    if (value1 instanceof Array && value2 instanceof Array) {
        return value1.length === value2.length && value1.every((item: any, index: number) => value1[index] === value2[index]);
    } else if (value1 instanceof Object && value2 instanceof Object) {
        const properties1 = Object.keys(value1);
        const properties2 = Object.keys(value2);

        return properties1.length === properties2.length && properties1.every(hasCounterpart) && properties2.every(hasCounterpart);

        function hasCounterpart(propertyName: string) {
            return (<{[key: string]: any}>value1)[propertyName] === (<{[key: string]: any}>value2)[propertyName];
        }
    } else {
        return value1 === value2;
    }
}

const versions: {[index: string]: number} = {};

export function versioned(views: Observable<string>, id: string): Observable<string> {
    return views.map(view => {
        versions[id] = (versions[id] !== undefined ? versions[id] : -1) + 1;

        return `<div class="debug">${view}<span class="version">version: ${versions[id]}&nbsp;</span></div>`;
    });
}

interface ObservableFactory<T> {
    (initialState: T, actions: Observable<Action>): Observable<T>
}

export function combineObservableFactories<T>(initialState: T, actions: Observable<Action>, reducerMap: {[reducerName: string]: ObservableFactory<Object>}): Observable<T> {
    const reducerNames = Object.keys(reducerMap);
    const observables = reducerNames.map(reducerName => {
        const reducerInitialState = (<{[key: string]: any}>initialState)[reducerName];
        const reducer = reducerMap[reducerName];

        return reducer(reducerInitialState, actions);
    });
    const combineObservableResults = (observableResults: Array<Observable<any>>) => {
        return observableResults.reduce(combineObservableResult, {});

        function combineObservableResult(combinedObservableResults: {[reducerName: string]: Observable<any>}, observableResult: any, index: number) {
            combinedObservableResults[reducerNames[index]] = observableResult;

            return combinedObservableResults;
        }
    };

    return Observable.combineLatest.call(undefined, observables)
        .map(combineObservableResults)
        .share(); // do not set up different processing pipelines
}

interface Reducer<T> {
    (state: T, action: Action): T
}

export function toObservableFactory<T>(reducer: Reducer<T>, equality: Equality<T> = shallowEquals): ObservableFactory<T> {
    return (initialState: T, actions: Observable<Action>) => actions.scan(reducer, initialState).distinctUntilChanged(equality);
}
