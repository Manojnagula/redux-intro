import { createStore } from "redux";
function todoReducer(state, action) {
  if (action.type == "add_todo") {
    let nextId = state.length + 1;
    return [
      ...state,
      { id: nextId, text: action.payload.todoText, isFinished: false },
    ];
  } else if (action.type == "edit_todo") {
    const newTodoList = state.map((todo) => {
      if (todo.id == action.payload.id) {
        todo.text = action.payload.newTodo;
      }
      return todo;
    });
    return newTodoList;
  } else if (action.type == "finish_todo") {
    const newTodoList = state.map((todo) => {
      if (todo.id == action.payload.id) {
        todo.isFinished = action.payload.state;
      }
      return todo;
    });
    return newTodoList;
  } else if (action.type == "delete_todo") {
    const newTodoList = state.filter((todo) => todo.id != action.payload.id);
    return newTodoList;
  }
  return state;
}

const store = createStore(todoReducer, [   ]);

// store has four functions {dispatch, getState, subscribe, replaceReducer}

// 1.get state is used to access the state
console.log(store.getState()); //prints state at that point of time.

// 2.replaceReducer

// prepared store using some reducer but now you want to replace that reducer with some other reducer. "replaceReducer()"

// 4.subscribe
store.subscribe(()=>console.log('Action dispatched'))

// 3.dispatch is used for triggering reducer with payload if rewuired.
store.dispatch({type: 'add_todo', payload:{todoText: 'todo 2'}})
console.log(store.getState());

