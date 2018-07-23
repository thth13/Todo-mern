import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadTodos, addTodo } from '../../actions/todoActions';
import TodoItem from './TodoItem';

class Todo extends Component {
  constructor(props) {
      super(props);
      this.state = {
          todo: '',
          addInput: false
      }

      this.addInput = this.addInput.bind(this);
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadTodos();
  }

  addInput() {
      this.setState({addInput: !this.state.addInput});
  }

  onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
      e.preventDefault();
      const newTodo = {
          task: this.state.todo
      };

      this.props.addTodo(newTodo);

      this.setState({todo: '', addInput: !this.state.addInput});
  }

  render() {
    let taskButton;

    if (!this.state.addInput) {
        taskButton = <button className="newButton" onClick={this.addInput}>New task</button>
    } else {
        taskButton = (
            <form onSubmit={this.onSubmit}>
                <input name="todo" value={this.state.todo} onChange={this.onChange} className="inputTask"></input>
            </form>
        )
    }
    return (
        <div className="todo-main">
            <div className="header"><h2>Website todo</h2></div>
            <div className="todo">
                <ul className="list">
                    {this.props.todo.todos.map(item => (
                        <TodoItem todo={item} key={item._id} />
                    ))}
                </ul>
            </div>
            {taskButton}
        </div>
    )
  }
}

const mapStateToProps = state => ({
    todo: state.todo
});

export default connect(mapStateToProps, { loadTodos, addTodo })(Todo);