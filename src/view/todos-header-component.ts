import { Component, Input, Output, EventEmitter } from 'angular2/core';
import { Filter } from 'todos';

@Component({
    selector: 'todos-header',
    template: `<span class="col-md-3">
                   <label class="radio-inline" *ngFor="let currentFilter of filters">
                       <input type="radio" name="filter"
                              [checked]="filter === currentFilter"
                              (click)="setFilter.emit(currentFilter)">
                       {{humanize(currentFilter)}}
                    </label>
                </span>
                <span class="col-md-8">{{message}}</span>
                <span class="col-md-1" [style.visibility]="spinner > 0 ? 'visible' : 'hidden'">Busy...</span>`
})
export class TodosHeaderComponent {
    filters: Array<Filter> = ['ALL', 'COMPLETED', 'PENDING'];

    @Input() filter: Filter;
    @Input() spinner: number;
    @Input() message: string;

    @Output() setFilter = new EventEmitter();

    ngOnChanges(changes: any) {
        console.log('HEADER CHANGES:', JSON.stringify(changes));
    }

    humanize(message: string): string {
        return message.toLowerCase().replace(/_/g, ' ');
    }
}
