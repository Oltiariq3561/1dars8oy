import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

function getPosts() {
  return axios.get('https://jsonplaceholder.typicode.com/posts');
}

function addPost(newPost) {
  return axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
}

function App() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });

  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      const newPost = {
        title: title,
        body: body,
        userId: 1
      };
      
      mutation.mutate(newPost);
      setTitle('');
      setBody('');
    }
  };

  if (isLoading) return <h1>Yuklanmoqda...</h1>;
  if (isError) return <h1>Xatolik yuz berdi !</h1>;

  return (
    <div>
        <h1>vazifa 2</h1>
      <h1 className="text-3xl mb-4">Postlar</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="p-2 border mb-2 w-full"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Post body"
          className="p-2 border mb-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Post
        </button>
      </form>

      <ul>
        {data.data.map((post) => (
          <li key={post.id} className="mb-2">
            <h3 className="font-bold">{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
