// only create store in this file.

import { bindActionCreators, createStore } from "redux";

// to avoid typos store all action type names as variables and use those variables.
const ADD_TODO = 'add_todo'
const DELETE_TODO = 'delete_todo'
const EDIT_TODO = 'edit_todo'
const FINISH_TODO = 'finish_todo'
function todoReducer(state, action) {
  if (action.type == "ADD_TODO") {
    let nextId = state.length + 1;
    return [
      ...state,
      { id: nextId, text: action.payload.todoText, isFinished: false },
    ];
  } else if (action.type == "EDIT_TODO") {
    const newTodoList = state.map((todo) => {
      if (todo.id == action.payload.id) {
        todo.text = action.payload.newTodo;
      }
      return todo;
    });
    return newTodoList;
  } else if (action.type == "FINISH_TODO") {
    const newTodoList = state.map((todo) => {
      if (todo.id == action.payload.id) {
        todo.isFinished = action.payload.state;
      }
      return todo;
    });
    return newTodoList;
  } else if (action.type == "DELETE_TODO") {
    const newTodoList = state.filter((todo) => todo.id != action.payload.id);
    return newTodoList;
  }
  return state;
}

const store = createStore(todoReducer, []);

// store has four functions {dispatch, getState, subscribe, replaceReducer}

// 1.get state is used to access the state
console.log(store.getState()); //prints state at that point of time.

// 2.replaceReducer

// prepared store using some reducer but now you want to replace that reducer with some other reducer. "replaceReducer()"

// 4.subscribe "executes for every dispatch"
store.subscribe(()=>console.log(store.getState()))

// 3.dispatch is used for triggering reducer with payload if rewuired.
store.dispatch({type: 'ADD_TODO', payload:{todoText: 'todo 2'}})
store.dispatch({type: 'ADD_TODO', payload:{todoText: 'todo 3'}})
console.log(store.getState());



//BIND-ACTOIN CREATERS 

// Action creater instead of hardcoding the actions and to avoid code repeatation.

const addTodo = function(todoText){
    return {type: 'ADD_TODO', payload: {todoText: todoText}}

}

store.dispatch(addTodo('todo 4'))

// Action creater for deleteTodo.
const deleteTodo = (id)=>({type: 'DELETE_TODO', payload : {id:id}})
store.dispatch(deleteTodo("1"))
store.dispatch(deleteTodo("2")) //Instead of calling creaters like this (affects readability), we can create bind action creaters

const actions = bindActionCreators({addTodo, deleteTodo}, store.dispatch)  //stores these actions inside dispatch with a key named "actions".
// We can access them using usinig actions word ,like this:

actions.addTodo('todo 5')
actions.deleteTodo("2")