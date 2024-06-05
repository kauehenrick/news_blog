import Head from 'next/head';
import styles from './styles.module.scss'
import { createClient } from "@/prismicio";
import { GetStaticProps } from 'next';

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | newsblog</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    <a>
                        <time></time>
                        <strong></strong>
                        <p></p>
                    </a>
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismicClient = createClient();

	const posts = await prismicClient.getAllByType("posts")

    console.log(JSON.stringify(posts, null, 2))

    return {
        props: {}
    }
}