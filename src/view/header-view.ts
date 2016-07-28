import { Observable } from 'rxjs/Rx';
import { State } from '../state/state';
import { select } from '../lib';

let version = 0;

export default function (states: Observable<State>): Observable<string> {
    return select<State, string>(states, 'filter')
        .map(filter => `Filter: ${humanize(filter)} - version: ${version++}`);
}

function humanize(message: string): string {
    return message.toLowerCase().replace(/_/g, ' ');
}
