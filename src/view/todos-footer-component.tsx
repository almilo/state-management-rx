import React from 'react';

export const TodosFooter = React.createClass({
    render() {
        return (
            <div>
                <span className="col-md-8">Pending: {this.state.pending}, Completed: {this.state.completed}</span>
                <span className="col-md-4">
                    <button className="btn btn-xs btn-danger" onClick={this.removeCompletedTodos()}>
                        Remove completed todos
                    </button>
                    &nbsp;
                    <button className="btn btn-xs btn-danger" onClick={this.saveTodos()}>
                        Save todos
                    </button>
                </span>
            </div>
        );
    },
    getInitialState() {
        return groupTodosByState(this.props.todos);
    },
    componentWillReceiveProps(props) {
        this.setState(groupTodosByState(props.todos));
    },
    saveTodos() {
        return () => this.props.saveTodos();
    },
    removeCompletedTodos() {
        return () => this.props.removeCompletedTodos();
    }
});

function groupTodosByState(todos) {
    return todos.reduce(accumulate, { completed: 0, pending: 0 });

    function accumulate({ completed, pending }, todo) {
        return {
            completed: todo.completed ? completed + 1 : completed,
            pending: !todo.completed ? pending + 1 : pending
        };
    }
}
