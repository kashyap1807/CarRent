const initialData = {
    cars: []
};
console.log('i am out reducer')
export const carsReducer = (state = initialData, action) => {
    console.log('i am in reducer');
    switch (action.type) {

        case 'GET_ALL_CARS': {
            return {
                ...state,
                cars: action.payload
            }
        }
        
        default:
            return state
        }
    }
    