import Link from 'next/link'
import Layout from'../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ post }) {
  if (!post) {
    return <div>Loading...</div>
  }
  return (
    <Layout title={post.title}>
      <p classNAme='m-4'>
        {'ID: '}
        {post.id}
      </p>
      <p className='mb-8 text-xl front-bold'>{post.title}</p>
      <p classNAme='px-10'>{post.body}</p>

      <Link href='/blog-page'>
        <div className='flex cursor-pointer mt-12'>
          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
          </svg>
          <span>back to blog-page</span>
        </div>
      </Link>
    </Layout>
  )
}


export async function getStaticPaths() {
  const paths = await getAllPostIds()

  // fallbackは存在しないページを開いたときにどうするかの引数　falseだと４０４
  // 動的にページを増やすAPPの場合はtrueにしとくらしい
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { post: post } = await getPostData(params.id)
  return {
    props: { post },
  }
}