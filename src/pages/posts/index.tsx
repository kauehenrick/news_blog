import Head from 'next/head';
import styles from './styles.module.scss'
import { createClient, repositoryName } from "@/prismicio";
import { GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import { contentRelationship } from '@prismicio/helpers/dist/isFilled';

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

	const response = await prismicClient.getAllByType("posts")

    const posts = response.map(post => {
        console.log(post.data.content.map(e => {
            console.log(e?.text)
        }))

        /*console.log(post.data.content.map(e => {
            console.log(e?.text)
        }))*/

        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            /*excerpt: post.data.content.map*/
        }
    })

    return {
        props: {}
    }
}