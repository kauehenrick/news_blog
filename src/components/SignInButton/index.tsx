"use Client"

import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react'

import styles from './styles.module.scss';

export function SignInButton() {
    const {data:session} = useSession(); 

    if (session) {
        return (
            <button 
            type="button"
            className={styles.signInButton}
            onClick={() => signOut()}
            >
            <FaGithub color='#04d361' />
            {session.user.name} <br />
            <FiX color='#737380' className={styles.closeIcon}/>
        </button>
        );
    } else {
        return (
            <button 
            type="button"
            className={styles.signInButton}
            onClick={() => signIn('github')}
        >
            <FaGithub color='#eba417' />
            Sign With Github
        </button>
        );
    }
}