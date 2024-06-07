import { createClient } from "@/prismicio";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { RichText } from "prismic-dom";

import styles from './post.module.scss';

interface PostsProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function Post({ post }: PostsProps) {
    return (
        <>
            <Head>
                <title>{post.title} | NewsBlog </title>
            </Head>

            <main className="styles.container">
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div
                        className={styles.postContent}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    >
                    </div>
                </article>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req });
    const { slug } = params;

    const prismicClient = createClient();

    const response = await prismicClient.getByUID("posts", String(slug), {});

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-br', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
    }

    console.log(`CONTEÚDO ${RichText.asHtml(response.data.content)}`);

    return {
        props: {
            post,
        }
    }
}