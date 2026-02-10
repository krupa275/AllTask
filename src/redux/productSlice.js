import { createSlice } from '@reduxjs/toolkit'



export const productSlice = createSlice({
  name: 'product',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {

    setProductData: (state, action) => {
      state.list = action.payload;
      state.loading = false

    },
    deleteFetchdata: (state, action) => {
      console.log(action.payload, state.list);
      state.list = state.list.filter((item) => {
        return item.id !== action.payload
      })
      state.loading = false;
    },
    editFetchdata: (state, action) => {
      state.list = state.list.map((val)=>{
        if(val?.id === action.payload.id){
          return action.payload
        }
        else{
          return val
        }
      })
     
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = true
    },

  },
})

export const { setProductData, setLoading, setLoaingSuccess, deleteFetchdata,editFetchdata } = productSlice.actions

export default productSlice.reducer