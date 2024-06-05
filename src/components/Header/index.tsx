import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';
import Link from 'next/link';
import { ActiveLink } from '../ActiveLink';

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="images/logo.png" alt="" />
                <nav>
                    <ActiveLink activeClassName={styles.active} href="/">
                        <p>Home</p>
                    </ActiveLink>

                    <ActiveLink activeClassName={styles.active} href="/posts">
                        <p>Posts</p>
                    </ActiveLink>
                
                </nav>
                <SignInButton />
            </div>
        </header>
    );
}