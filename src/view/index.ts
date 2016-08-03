import { Observable } from 'rxjs/Rx';
import { State } from '../state/state';
import headerView from './header-view';
import bodyView from './body-view';
import footerView from './footer-view';
import { versioned } from '../lib/index';

export default function (states: Observable<State>): Observable<string> {
    return Observable.combineLatest( // combine all the views into the main view using the most up-to-date values
        headerView(states).map(view => versioned(view, 'header')),
        bodyView(states).map(view => versioned(view, 'body')),
        footerView(states).map(view => versioned(view, 'footer')),
        (header, body, footer) => `${header}\n${body}\n${footer}`
    )
        .sample(Observable.interval(100)) // debounce the combined view to avoid flickering
        .share(); // do not set different processing pipelines
}
