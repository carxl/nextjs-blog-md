import Head from 'next/head'
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css';


export async function getStaticProps({ params }) {
    // Add the "await" keyword like this:
    const postData = await getPostData(params.id);
  
    return {
      props: {
        postData,
      },
    };
  }

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
            <title>{postData.title}</title>
            <meta
            name="description"
            content={`${postData.title} | Andrés Parra Developer, CTO para Startups, Head on Engineering`}
            />
            <meta
            property="og:image"
            content="/images/ogimage.jpg"
            />
            <meta name="og:title" content={`${postData.title} | Andrés Parra Developer`} />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    );
}