import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
function Zazifa() {
  function getData() {
    return axios("https://jsonplaceholder.typicode.com/posts")
  }
  const {isLoading, isError, data} = useQuery({
    queryKey: ["phones"],
    queryFn: getData
  })
  if (isLoading) {
    return <h1>Yuklanmoqda ...</h1>
  }
  if (isError) {
    return <h1>yuklashda hatolik yuz berdi !</h1>
  }
  return (
    <div>
        <h1>Vazifa 1</h1>
      <ul>
      {
         data?.data.length > 0 && data.data.map(function (v) {
          return(
            <li key={v.id}>
              <h2>{v.title}</h2>
              <p>{v.body}</p>
            </li>
          )
        })
      }
      </ul>
    </div>
  )
}
export default Zazifa