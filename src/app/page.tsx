import { auth, currentUser } from "@clerk/nextjs/server"

export default async function Home() {

  const { userId } = auth()
  let userID;

  if (userId) {
    userID = userId
  }

  const user = await currentUser
  

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="font-black text-7xl">MLjs</h1>
      <h3>Run LLM's in the browser and build custom models</h3>
    </main>
  );
}
