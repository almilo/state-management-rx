import React from 'react';

export class TodosHeader extends React.Component {
    render() {
        const filters = ['ALL', 'COMPLETED', 'PENDING'].map(renderFilter.bind(this));

        return (
            <div>
                <span className="col-md-3">{ filters }</span>
                <span className="col-md-8">{ this.props.message }</span>
                <span className="col-md-1"
                      style={{ visibility: this.props.spinner > 0 ? 'visible' : 'hidden' }}>
                    Busy...
                </span>
            </div>
        );

        function renderFilter(currentFilter) {
            return (
                <label key={currentFilter} className="radio-inline">
                    <input type="radio" name="filter"
                           defaultChecked={this.props.filter === currentFilter}
                           onClick={this.setFilter(currentFilter)}/>
                    {this.humanize(currentFilter)}
                </label>
            );
        }
    }

    setFilter(filter) {
        return () => this.props.setFilter(filter);
    }

    humanize(message) {
        return message.toLowerCase().replace(/_/g, ' ');
    }
}
