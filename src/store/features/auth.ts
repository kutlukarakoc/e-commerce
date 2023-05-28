import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../types/userTypes'
import { RootState } from '../store'

const initialState: IUser = {
   user: JSON.parse(`${localStorage.getItem('user')}`) ?? {},
}

const auth = createSlice({
   name: 'user',
   initialState,
   reducers: {
      login: (state, action) => {
         localStorage.setItem('user', JSON.stringify(action.payload))
         state.user = action.payload
      },

      logout: (state) => {
         localStorage.removeItem('user')
         state.user = {}
      }
   }
})

export const { login, logout } = auth.actions
export const user = (state: RootState) => state.auth.user
export default auth.reducer