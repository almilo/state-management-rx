import { Observable } from 'rxjs/Rx';
import { State } from '../state/state';
import header from './header-view';
import body from './body-view';
import footer from './footer-view';
import { versioned } from '../lib/index';

export default function (states: Observable<State>): Observable<string> {
    return Observable.combineLatest( // combine all the views into the main view using the most up-to-date values
        versioned(header(states), 'header'),
        versioned(body(states), 'body'),
        versioned(footer(states), 'footer'),
        (header, body, footer) => `${header}\n${body}\n${footer}`
    )
        .sample(Observable.interval(100)) // sample the combined view to prevent redundant rendering cycles
        .share(); // do not set up different processing pipelines
}
