import React from 'react';

export const TodosHeader = React.createClass({
    render() {
        const filters = ['ALL', 'COMPLETED', 'PENDING'].map(renderFilter.bind(this));

        return (
            <div>
                <span className="col-md-3">{ filters }</span>
                <span className="col-md-8">{ this.state.message }</span>
                <span className="col-md-1 busy-indicator"
                      style={{ visibility: this.state.spinner > 0 ? 'visible' : 'hidden' }}>
                    Busy...
                </span>
            </div>
        );

        function renderFilter(currentFilter) {
            return (
                <label key={currentFilter} className="radio-inline">
                    <input type="radio" name="filter"
                           defaultChecked={this.state.filter === currentFilter}
                           onClick={this.setFilter(currentFilter)}/>
                    {this.humanize(currentFilter)}
                </label>
            );
        }
    },
    getInitialState() {
        return {
            filter: this.props.filter,
            message: this.props.message,
            spinner: this.props.spinner
        };
    },
    componentWillReceiveProps(props) {
        this.setState({
            filter: props.filter,
            message: props.message,
            spinner: props.spinner
        });
    },
    setFilter(filter) {
        return () => this.props.setFilter(filter);
    },
    humanize(message) {
        return message.toLowerCase().replace(/_/g, ' ');
    }
});
