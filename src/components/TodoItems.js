import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TodoItems extends Component {
    // getStyle= () => {
    //     if(this.props.todo.completed){
    //         return {
    //             textDecoration:'line-through'
    //         }
    //     }else{
    //         return {
    //             textDecoration:'none'
    //         }
    //     }
    // }
    //Get this in one line
    getStyle= () => {
        return {
            background:'#f4f4f4',
            padding:'10px',
            borderBottom:'1px black solid',
            textDecoration: this.props.todo.completed ? 'line-through': 'none'
            
        }
    }

    //We have to use arrow function because
    //'this' is not binded with the function
    //we'll create without using arrow function
    //Either we've to bind that in render lifecycle method
    //or use arrow function.
    // markComplete = (e) => {
    //     //e is that particular event which we're gonna have via onChange.
         
    // } We'll create it in app component where we can change the state.
    
    render() {
        const { id,title } = this.props.todo;
        return (
            <div style={this.getStyle()}>
                <p>
                    <input type="checkbox" onChange={this.props.markComplete.bind(this, id)}/>
                    { title }
                    <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>x</button>
                </p>
            </div>
        )
    }
}

const btnStyle={
    background: 'white',
    color: '#000',
    border:'none',
    padding:'5px 9px',
    borderRadius:'50%',
    cursor: 'pointer',
    float: 'right'
}

TodoItems.propTypes={
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}
