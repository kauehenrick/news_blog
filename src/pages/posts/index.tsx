import Head from 'next/head';
import styles from './styles.module.scss'
import { createClient } from "@/prismicio";
import { GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';

type Post = {
    slug: string,
    title: string,
    excerpt: any,
    updatedAt: string,
}

interface PostsProps {
    posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
    return (
        <>
            <Head>
                <title>Posts | newsblog</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    { posts.map(post => (
                        <a key={post.slug} href='#'> 
                            <time>{post.updatedAt}</time>
                            <strong>{post.title}</strong>
                            <p>{ post.excerpt.map(e => e.text)}</p>
                        </a>
                    ))
                    }
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismicClient = createClient();

	const response = await prismicClient.getAllByType("posts")

    const posts = response.map(post => {

        /*console.log(`\n CHECKING: \n ${post.uid} \n ${RichText.asText(post.data.title)} \n ${new Date(post.last_publication_date).toLocaleDateString('pt-br', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }) } \n ${JSON.stringify(post.data.content)} \n`)*/

        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content,
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-br', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }) 
        }
    })

    return {
        props: { posts }
    }
}