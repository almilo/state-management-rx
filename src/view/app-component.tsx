import React from 'react';
import ReactDOM from 'react-dom';
import {
    states,
    dispatch,
    bootstrap as appBootstrap,
    AddTodoAction,
    SetFilterAction,
    RemoveTodoAction,
    ToggleTodoAction,
    SaveTodosAction,
    RemoveCompletedTodosAction
} from 'todos';
import { TodosHeader } from './todos-header-component';
import { TodosBody } from './todos-body-component';
import { TodosFooter } from './todos-footer-component';

export const App = React.createClass({
    render() {
        return (
            <div>
                <div className="row">
                    <span>Renderings: { this.state.renderings }</span>
                </div>
                <div className="row">
                    <input type="text"
                           className="form-control"
                           onKeyPress={ this.maybeAddTodo }
                           autoFocus>
                    </input>
                </div>
                <div className="row">
                    <TodosHeader
                        filter={ this.state.ui.filter }
                        message={ this.state.ui.message }
                        spinner={ this.state.ui.spinner }
                        setFilter={ this.setFilter }>
                    </TodosHeader>
                </div>
                <div className="row">
                    <TodosBody
                        todos={ this.state.business.todos }
                        filter={ this.state.ui.filter }
                        toggleTodo={ this.toggleTodo }
                        removeTodo={ this.removeTodo }>
                    </TodosBody>
                </div>
                <div className="row">
                    <TodosFooter
                        todos={ this.state.business.todos }
                        removeCompletedTodos={ this.removeCompletedTodos }
                        saveTodos={ this.saveTodos }>
                    </TodosFooter>
                </div>
            </div>
        );
    },
    getInitialState() {
        return {
            renderings: 0,
            ui: {
                filter: 'ALL',
                message: '',
                spinner: 0
            },
            business: {
                todos: []
            }
        };
    },
    componentDidMount() {
        this.subscription = states.subscribe(state => {
            this.setState({
                renderings: this.state.renderings + 1,
                ui: state.ui,
                business: state.business
            });
        });
    },
    componentWillUnmount() {
        this.subscription.unsubscribe();
    },
    maybeAddTodo(event) {
        const target = event.target;
        const inputValue = target.value.trim();

        if (event.charCode === 13 && inputValue.length > 0) {
            dispatch(new AddTodoAction(inputValue));
            target.value = '';
        }
    },
    setFilter(filter) {
        dispatch(new SetFilterAction(filter));
    },
    toggleTodo(todo) {
        dispatch(new ToggleTodoAction(todo.id));
    },
    removeTodo(todo) {
        dispatch(new RemoveTodoAction(todo.id));
    },
    removeCompletedTodos() {
        dispatch(new RemoveCompletedTodosAction());
    },
    saveTodos() {
        dispatch(new SaveTodosAction());
    }
});

export function bootstrap(elementId) {
    ReactDOM.render(<App/>, document.getElementById(elementId));

    appBootstrap();
}
