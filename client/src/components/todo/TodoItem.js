import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTodo, completeTodo, editTodo } from '../../actions/todoActions';

class TodoItem extends Component {
  constructor() {
    super();
    this.state = {
      editInput: '',
      edit: false
    }

    this.handleEdit = this.handleEdit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }



  handleDelete(id) {
    this.props.deleteTodo(id);
  }

  onChange(e) {
    this.setState({editInput: e.target.value});
  }
  
  isCompletee(id) {
    this.props.completeTodo(id);
  }

  handleEdit() {
    this.setState({editInput: this.props.todo.task, edit: !this.state.edit});
  }

  onSubmit(e) {
    e.preventDefault();

    const newTask = {
      task: this.state.editInput
    };
    var id = this.props.todo._id
    this.props.editTodo(id, newTask)

    this.setState({editInput: '', edit: false})
  }

  render() {
    const { todo } = this.props;
    const { edit } = this.state;

    let isEdit;

    if (!edit) {
      isEdit = <span className={(todo.isComplete ? 'complete' : '')}>{todo.task}</span>
    } else {
      isEdit = <form className="editForm" onSubmit={this.onSubmit}><input value={this.state.editInput} onChange={this.onChange} /></form>
    }

    return (
      <li className="task" key={todo._id}>
        {isEdit}
        <div className={'circle ' + (todo.isComplete ? 'completeCircle' : '')} onClick={this.isCompletee.bind(this, todo._id)}></div>
        <div onClick={this.handleDelete.bind(this, todo._id)} className="icon-delete"></div>
        <div onClick={this.handleEdit} className="icon-edit"></div>
      </li>
    )
  }
}

export default connect(null, { deleteTodo, completeTodo, editTodo })(TodoItem);