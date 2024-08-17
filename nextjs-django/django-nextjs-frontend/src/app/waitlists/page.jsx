"use client"
import { useEffect } from "react";
import useSWR from "swr";

import { useAuth } from "@/components/authProvider"

const fetcher = (...args) => fetch(...args).then(res => res.json())

const WAITLIST_API_URL = "/api/waitlists/"

export default function Page() {

  const { data, error, isLoading } = useSWR(WAITLIST_API_URL, fetcher);
  const auth = useAuth()

  useEffect(() => {
    if (error?.status === 401) {
      //
      auth.loginRequiredRedirect()
    }
  }, [auth, error]);

  if (error) return <div>failed to load</div>
  if(isLoading) return <div>loading...</div>

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {JSON.stringify(data)}
      </div>
    </main>
  );
}
