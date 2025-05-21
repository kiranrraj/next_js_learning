'use client';

import React from 'react';
import styles from './Blog.module.css';

export type BlogProps = {
  id: string;
  title: string;
  author: string;
  datetime: string;
  tags: string[];
};

export default function Blog({ title, author, datetime, tags }: BlogProps) {
  return (
    <article className={styles.blogCard}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.author}>By: {author}</p>
      <p className={styles.datetime}>{new Date(datetime).toLocaleString()}</p>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
