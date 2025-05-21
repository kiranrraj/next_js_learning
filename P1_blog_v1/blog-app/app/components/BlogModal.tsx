'use client';

import React, { useState } from 'react';
import styles from './BlogModal.module.css';

type AddBlogModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newBlog: {
    title: string;
    author: string;
    tags: string[];
  }) => void;
};

export default function AddBlogModal({ isOpen, onClose, onAdd }: AddBlogModalProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!title.trim() || !author.trim()) {
      alert('Please fill in title and author');
      return;
    }

    // Convert comma separated tags string to array, trimming spaces
    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    onAdd({ title, author, tags });

    // Reset fields and close modal
    setTitle('');
    setAuthor('');
    setTagsInput('');
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.h2}>Add New Blog</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Title
            <input
              className={styles.input}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label className={styles.label}>
            Author
            <input
              className={styles.input}
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </label>

          <label className={styles.label}>
            Tags (comma separated)
            <input
              className={styles.input}
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. react, nextjs"
            />
          </label>

          <div className={styles.buttons}>
            <button type="submit">Add Blog</button>
            <button type="button" onClick={onClose} className={styles.cancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
