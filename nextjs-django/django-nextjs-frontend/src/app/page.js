"use client"
import { useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {

  const { data, error, isLoading } = useSWR('http://127.0.0.1:8001/api/hello', fetcher);
  if (error) return <div>failed to load</div>
  if(isLoading) return <div>loading...</div>

  // const [data, setData] = useState({})

  // async function getDjangoAPIData() {
  //   const response = await fetch("http://127.0.0.1:8001/api/hello");
  //   const responseData = await response.json();
  //   console.log(data)
   //  // setDataStr(JSON.stringify(data))
  //   setData(responseData)
  // }

  // async function handleClick() {
  //   await getDjangoAPIData()
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <button onClick={handleClick}>
        Lookup Data
      </button> */}
      <div>
        {JSON.stringify(data)}
      </div>
    </main>
  );
}
