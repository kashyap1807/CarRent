import React  from 'react'
import { Navigate } from 'react-router-dom';

function Protect(props) {

    if (!localStorage.getItem('user')) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            {props.children }
        </>
    )
}


export default Protect


