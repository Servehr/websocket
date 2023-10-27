import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../store'
import { IAuthState } from '../interface/IAuthState'

const initialState: IAuthState = {
  firstName: 'Grace'
}  

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    login: (state: any, action: PayloadAction<{firstName: string}>) => {
      state.firstName = action.payload.firstName
      console.log(action.payload.firstName);
      
    },
    logout: (state: any) => {
      state.firstName = null
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    reset: (state: any, action: PayloadAction<IAuthState>) => {
      state.firstName += action.payload
    },
  },
//   extraReducers: (builder) => {
//     builder
//       .addCase(asyncCall.pending, (state) => {
//         state.stage = `busy`;
//       })
//       .addCase(asyncCall.fulfilled, (state) => {
//         state.stage = `idle`;
//         state.val += 100;
//       })
//       .addCase(asyncCall.rejected, (state, action) => {
//         state.stage = `failed`;
//         state.failureMsg = `Failed to count, ${action.payload}`;
//       });
//   },
})

export const { login, logout, reset } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default authSlice.reducer