import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function App() {
  const [page, setPage] = useState(1);

  const fetchPosts = async ({ queryKey }) => {
    const [, currentPage] = queryKey;
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
      params: {
        _page: currentPage,
        _limit: 10,
      },
    });
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", page], 
    queryFn: fetchPosts,     
    keepPreviousData: true, 
  });

  if (isLoading) return <h1> Yuklanmoqda ...</h1>;
  if (isError) return <h1>Xatolik yuz berdi!</h1>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id} className="mb-6">
            <h2 className="font-semibold">{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={data.length < 10}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
