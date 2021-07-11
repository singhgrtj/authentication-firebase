import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import '../style/style.css';
import { auth } from '../config/firebase';
import { useHistory, Redirect } from 'react-router-dom';


interface Props { }

export const App: React.FC<Props> = (props) => {

    const [logout, setLogout] = useState<boolean>(false);
    const [user, setUser] = useState<boolean>(true);
    let history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setUser(true);
            } else {
                setUser(false);
            }
        })
    }, [])

    const submitLogout = () => {
        setLogout(true);

        auth.signOut()
        .then(() => history.push('/login'))  
        .catch((error) => {
            console.log(error);
            setLogout(false);
        }) 
    }

    return (
        user ? (
        <div className="home">
            <h2>Homepage</h2>
            <Button type="submit" variant="contained" color="secondary" disabled={logout} onClick={submitLogout}>Logout</Button>
        </div> ) : 
        <Redirect to="login" />
    )
}

export default App;
