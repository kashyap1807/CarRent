import { message } from 'antd';
import axios from 'axios';


export const userLogin = (reqObj) => {
    return async dispatch => {

        dispatch({
            type: 'LOADING',
            payload: true

        })

        try {
            const response = await axios.post('/api/users/login', reqObj)
            message.success('Login success')
            setTimeout(() => {
                window.location.href = '/'
            }, 500);
            localStorage.setItem('user', JSON.stringify(response.data) )
            
            dispatch({
                type: 'LOADING',
                payload: false
            })
        }
        catch (error) {
            console.log(error)
            message.error('Something went wrong')
            dispatch({
                type: 'LOADING',
                payload: false
            })
        }
    }

}

export const userRegister = (reqObj) => {
    return async dispatch => {

        dispatch({
            type: 'LOADING',
            payload: true

        })

        try {
            await axios.post('/api/users/register', reqObj)
            message.success('Registraction successfull');
            setTimeout(() => {
                window.location.href = '/login'
            }, 500);

            dispatch({
                type: 'LOADING',
                payload: false
            })
        }
        catch (error) {
            console.log(error)
            message.error('Something went wrong')
            dispatch({
                type: 'LOADING',
                payload: false
            })
        }
    }

}
