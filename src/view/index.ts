import { Observable } from 'rxjs/Rx';
import { State } from '../state/state';
import headerView from './header-view';
import bodyView from './body-view';
import footerView from './footer-view';

export default function (states: Observable<State>): Observable<string> {
    return Observable.zip(
        headerView(states),
        bodyView(states),
        footerView(states),
        (header, body, footer) => `${header}\n${body}\n${footer}`
    );
}
