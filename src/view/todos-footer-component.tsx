import React from 'react';

export class TodosFooter extends React.Component {
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
    }

    constructor() {
        this.state = {completed: 0, pending: 0};
    }

    componentWillReceiveProps(props) {
        this.setState(groupTodosByState(props.todos));
    }

    saveTodos() {
        return () => this.props.saveTodos();
    }

    removeCompletedTodos() {
        return () => this.props.removeCompletedTodos();
    }
}

function groupTodosByState(todos) {
    return todos.reduce(accumulate, {completed: 0, pending: 0});

    function accumulate({completed, pending}, todo) {
        return {
            completed: todo.completed ? completed + 1 : completed,
            pending: !todo.completed ? pending + 1 : pending
        };
    }
}
