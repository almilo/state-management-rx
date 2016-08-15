import React from 'react';

export const TodosBody = React.createClass({
    render() {
        const todos = this.state.filteredTodos.map(renderTodo.bind(this));

        return (
            <ul className="list-group">
                {todos}
            </ul>
        );

        function renderTodo(todo) {
            return (
                <li key={todo.id} className="list-group-item">
                    <label>
                        <input type="checkbox"
                               defaultChecked={todo.completed}
                               onClick={this.toggleTodo(todo)}/>&nbsp;
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
                    </label>
                    <button className="close" onClick={this.removeTodo(todo)}>
                        <span>&times;</span>
                    </button>
                </li>
            );
        }
    },
    getInitialState() {
        return {
            filteredTodos: filterTodos(this.props.todos, this.props.filter)
        };
    },
    componentWillReceiveProps(props) {
        this.setState({
            filteredTodos: filterTodos(props.todos, props.filter)
        });
    },
    toggleTodo(todo) {
        return () => this.props.toggleTodo(todo);
    },
    removeTodo(todo) {
        return () => this.props.removeTodo(todo);
    }
});

function filterTodos(todos, filter) {
    return todos.filter(todo => matches(todo, filter));

    function matches(todo, filter) {
        switch (filter) {
            case 'ALL':
                return true;
            case 'COMPLETED':
                return todo.completed;
            case 'PENDING':
                return !todo.completed;
            default:
                throw new Error(`Filter not supported: "${filter}".`);
        }
    }
}
