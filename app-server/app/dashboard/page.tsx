'use client';
import { authClient } from "@/lib/auth-client" // import the auth client

const Dashboard = () => {
  const { 
    data: session, 
    isPending, //loading state
    error, //error object
    refetch //refetch the session
} = authClient.useSession() 

  if (isPending) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>You are signed in as {session?.user?.email}</div>
    </div>
  )
}
export default Dashboard;