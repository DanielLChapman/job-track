import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { useUser } from '../components/User';

function signin(props) {
    let [needToRegister, setNeedToRegister] = useState(false);
    const router = useRouter();
    let user = useUser();
    React.useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, []);
    
    return (
        <section className="SignInContainer">
            {
                !needToRegister ? (
                    <SignIn />
                ) : 
                (
                    <SignUp />
                )
            }
            
            <button onClick={() => {setNeedToRegister(!needToRegister)}}>{!needToRegister ? 'Need to Register?' : 'Sign In'}</button>
        </section>
    );
}

export default signin;