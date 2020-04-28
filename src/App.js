import React,{Component} from 'react';
import './App.css';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import { BrowserRouter as Router,Route } from "react-router-dom";
import axios from 'axios';

class App extends Component {
  state={
    todos:[
      // {
      //   id:1,
      //   title:'Take Out',
      //   completed:false
      // },
      // {
      //   id:2,
      //   title:'Take In',
      //   completed:false
      // }
    ]
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=6')
    .then(res => this.setState({todos: res.data}))
  }

  //Toggle Complete
  markComplete = (id) => {
    //console.log(id);
    this.setState( {
      todos: this.state.todos.map((todo) => {
        if(todo.id === id){
          todo.completed = !todo.completed
        }
        return todo;
      })
    })
  }
  
  //Delete todo
  delTodo = (id) => {

    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState( {todos: [...this.state.todos.filter(todo => todo.id!==id)]}));
    
  }

  //Add Todo
  
  addTodo = (title) => {
    // const newTodo = {
    //   id:4,
    //   title,
    //   completed:false
    // }

    axios.post('https://jsonplaceholder.typicode.com/todos',{
      title,
      completed:false
    })
    .then(res => this.setState({ todos: [...this.state.todos, res.data]}))

  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props =>(
              <React.Fragment>
                <AddTodo AddTodo={this.addTodo}/>
            <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>   
              </React.Fragment>
            )} />
            <Route path="/about" component={About}/>
          </div>
        </div>
      </Router>  
    );
  }
}

export default App;
