"use client"

import { useAuth } from "@/components/authProvider";
import ThemeToggleButton from "@/components/themeToggleButton";
import useSWR from "swr";
import WaitlistForm from "./waitlists/forms";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {

  const auth = useAuth()

  const { data, error, isLoading } = useSWR('http://127.0.0.1:8001/api/hello', fetcher);
  if (error) return <div>failed to load</div>
  if(isLoading) return <div>loading...</div>

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <WaitlistForm />
      </div>
      <div>
        {auth.isAuthenticated ? "Hello User" : "Hello Guest"}
      </div>
      <div>
        <ThemeToggleButton/>
      </div>
    </main>
  );
}
