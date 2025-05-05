import { posts } from '../data/posts.json';

const Home = () => {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <a href={`/posts/${post.slug}`}>{post.title}</a> - {post.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
