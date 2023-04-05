const initialData ={
    loading:false,
}

export const alertsReducer =(state=initialData, action)=>{
    console.log('i am in alertsReducer');
    switch(action.type)
    {
        case 'LOADING':{
            return{
                ...state,
                loading :action.payload
            }
        }
        default:
            return state
    }
}
