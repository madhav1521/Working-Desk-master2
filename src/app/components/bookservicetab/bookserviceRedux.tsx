import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    Rooms:number,
    Bath:number,
    Date:string,
    Time:string,
    ServiceHours:string,
    ExtraService:{
        "Inside cabinets":false,
        "Inside fridge":false,
        "Inside oven":false,
        "Laundry wash & dry":false,
        "Interior windows":false
    },
    Comments:string,
    ServiceId:number,
    ServiceAddress:string,
    Email:string,
    Mobile:string,
    status:string,
    FirstName:string,
    LastName:string,
    datetime:string,
    Postalcode:string
}
const initialState: CounterState = {
    Rooms:0,
    Bath:0,
    Date:"",
    Time:"",
    ServiceHours:"",
    ExtraService:{
        "Inside cabinets":false,
        "Inside fridge":false,
        "Inside oven":false,
        "Laundry wash & dry":false,
        "Interior windows":false
    },
    Comments:"",
    ServiceId:0,
    ServiceAddress:"",
    Email:"",
    Mobile:"",
    status:"",
    FirstName:"",
    LastName:"",
    datetime:"",
    Postalcode:""
}

export const BookRedux = createSlice({
  name: 'getdata',
  initialState,
  reducers: {
    Rooms: (state, action: PayloadAction<any>) => {
      state.Rooms = action.payload
    }, 
    Bath: (state, action: PayloadAction<any>) => {
        state.Bath = action.payload
    },    
    Datee: (state, action: PayloadAction<any>) => {
        state.Date = action.payload
    },
    Time: (state, action: PayloadAction<any>) => {
        state.Time = action.payload
    },
    ServiceHours: (state, action: PayloadAction<any>) => {
        state.ServiceHours = action.payload
    },
    ExtraService: (state, action: PayloadAction<any>) => {
        state.ExtraService = action.payload
    }                 
      
  },
})

// Action creators are generated for each case reducer function
export const {Rooms,Bath,Datee,Time,ServiceHours,ExtraService } = BookRedux.actions

export default BookRedux.reducer