'use client';

import React from 'react';
import Blog, { BlogProps } from './Blog';
import styles from './BlogContainer.module.css';

type BlogContainerProps = {
  blogs: BlogProps[];
};

export default function BlogContainer({ blogs }: BlogContainerProps) {
  if (blogs.length === 0) {
    return <p className={styles.noBlogs}>No blogs found.</p>;
  }

  return (
    <div className={styles.container}>
      {blogs.map((blog) => (
        <Blog key={blog.id} {...blog} />
      ))}
    </div>
  );
}