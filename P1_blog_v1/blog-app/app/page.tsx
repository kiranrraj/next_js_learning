'use client';

import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BlogModal from './components/BlogModal'
import BlogContainer from './components/BlogContainer';
import { BlogProps } from './components/Blog';

export default function HomePage() {
  // Store all blogs
  const [allBlogs, setAllBlogs] = useState<BlogProps[]>([
    {
      id: '1',
      title: 'Welcome to the Blog',
      author: 'Admin',
      datetime: new Date().toISOString(),
      tags: ['welcome', 'firstpost'],
    },
  ]);

  // Blogs filtered by search query
  const [filteredBlogs, setFilteredBlogs] = useState<BlogProps[]>(allBlogs);

  // Modal open state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle Add button opens modal
  const handleAddClick = () => setIsModalOpen(true);

  // Close modal
  const handleCloseModal = () => setIsModalOpen(false);

  // Add new blog post
  const handleAddBlog = (newBlog: { title: string; author: string; tags: string[] }) => {
    const blog: BlogProps = {
      id: Date.now().toString(),
      datetime: new Date().toISOString(),
      ...newBlog,
    };
    setAllBlogs((prev) => [blog, ...prev]);
  };

  // Update filteredBlogs whenever allBlogs change
  useEffect(() => {
    setFilteredBlogs(allBlogs);
  }, [allBlogs]);

  // Search function — filters blogs by title, author or tags (case insensitive)
  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) {
      setFilteredBlogs(allBlogs);
      return;
    }

    const filtered = allBlogs.filter(({ title, author, tags }) => {
      return (
        title.toLowerCase().includes(lowerQuery) ||
        author.toLowerCase().includes(lowerQuery) ||
        tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    });

    setFilteredBlogs(filtered);
  };

  return (
    <>
      <Header onAddClick={handleAddClick} onSearch={handleSearch} />
      <main style={{ padding: '1rem', paddingBottom: '4rem' }}>
        <BlogContainer blogs={filteredBlogs} />
      </main>
      <Footer />
      <BlogModal isOpen={isModalOpen} onClose={handleCloseModal} onAdd={handleAddBlog} />
    </>
  );
}