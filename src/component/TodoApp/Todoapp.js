import React, { Component } from 'react'
import "./TodoApp.css"

export default class TodoApp extends Component {
  state = {
    input: "",
    items: [],
    editIndex: -1,
    errorMessage: "",
  };

  handleChange = event => {
    this.setState({
      input: event.target.value,
      errorMessage: "", // Clear error message when input changes
    });
  }

  handleCheckboxChange = index => {
    const { items } = this.state;
  
    const newItems = [...items];
    newItems[index].completed = !newItems[index].completed;
  
    const allCompleted = newItems.every(item => item.completed);
  
    this.setState({
      items: newItems,
      allTasksCompleted: allCompleted,
    });
  }  

  storeItems = event => {
    event.preventDefault();
    const { input, editIndex, items } = this.state;

    // Check for duplicates
    const isDuplicate = items.some(item => item.text === input);

    if (isDuplicate) {
      this.setState({
        errorMessage: "This item already exists in the list.",
      });
      return;
    }

    if (editIndex === -1) {
      this.setState({
        items: [...items, { text: input, completed: false }],
        input: "",
        errorMessage: "Item added to the list", 
      });
    } else {
      const newItems = [...items];
      newItems[editIndex] = { text: input, completed: newItems[editIndex].completed };
      this.setState({
        items: newItems,
        input: "",
        editIndex: -1,
        errorMessage: "Successfully updated", 
      });
    }
  }

  editItem = key => {
    const { items } = this.state;
    const editedTask = items[key];
  
    this.setState({
      input: editedTask.text,
      editIndex: key,
      errorMessage: "",
    });
    
    // Reset the completed property to false
    if (editedTask.completed) {
      const newItems = [...items];
      newItems[key] = { ...editedTask, completed: false };
      this.setState({
        items: newItems,
      });
    }
  }
  

  deleteItem = key => {
    this.setState({
      items: this.state.items.filter((data, index) => index !== key)
    });
  }

  render() {
    const { input, items, errorMessage } = this.state;

    const allChecked = items.length > 0 && items.every(item => item.completed);

    return (
      <div className="todo-container">

        <form className="input-section" onSubmit={this.storeItems}>
          <h1>Todo App</h1>

          <input type="text" value={input} onChange={this.handleChange} placeholder="Enter List..." />
          <p className="error-message">{errorMessage}</p> {}
        </form>

        <ul>
          {items.map((data, index) => (
            <li key={index}>
              <div className="list-item">
                <input
                className='checkbox'
                  type="checkbox"
                  checked={data.completed}
                  onChange={() => this.handleCheckboxChange(index)} />
                <span className={data.completed ? 'completed' : ''}>{data.text}</span>
                <div className="icons">
                  <i className="fas fa-edit" onClick={() => this.editItem(index)}></i>
                  <i className="fa-solid fa-trash fa" onClick={() => this.deleteItem(index)}></i>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {allChecked && <p className="completed-message">All tasks completed!</p>}
      </div>
    )
  }
}
