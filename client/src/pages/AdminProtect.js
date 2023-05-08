import React  from 'react'
import { Navigate } from 'react-router-dom';

function AdminProtect(props) {

    if (!localStorage.getItem('user')) {
        return <Navigate to="/login" />;
    }

    
    let user = localStorage.getItem('user');
     
    user=JSON.parse(user);
    if(user.username!="admin" && user.password!="12345"){
        alert("Only admin can access this resources");
        return <Navigate to="/"/>
    }
    return (
        <>
            {props.children }
        </>
    )
}


export default AdminProtect


