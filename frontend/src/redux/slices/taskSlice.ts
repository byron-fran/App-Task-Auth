import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Task} from '../../types/Task';


interface TaskState {
  tasks : Task[],

}

const initialState : TaskState = {
  tasks : []
};

const taskSlice = createSlice({
  name : 'tasks',
  
  initialState,
 
  reducers : {
    addTask : (state, action : PayloadAction<Task>) => {
     state.tasks.push(action.payload)
    },
    deleteTask : (state, action : PayloadAction<string>) => {
    
      state.tasks = state.tasks.filter((task : Task) => task.id !== action.payload)
    },
    updateTask : (state, action : PayloadAction<Task>) => {
      const tasksUpdate = state.tasks.map((task : Task) => {
        if(task.id === action.payload.id){
          task.content = action.payload.content;
          task.title = action.payload.title
          return task
        }
        return task
      })
      state.tasks = tasksUpdate
      
    },


  },

});



export const {addTask, deleteTask, updateTask} = taskSlice.actions;

//export default userSlice.reducer
export default taskSlice.reducer;