'use client'


// import { useSession, signIn, signOut } from "next-auth/react"

// export default function Component() {
//   const { data: session } = useSession()
//   if (session) {
//     return (
//       <>
//         Signed in as {session.user.email} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//       </>
//     )
//   }
//   return (
//     <>
//       Not signed in <br />
//       <button className="bg-orange-500 px-5 py-3 m-2 rounded" onClick={() => signIn()}>Sign in</button>
//     </>
//   )
// }





import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import  * as Z  from "zod"
import Link from "next/link"

function page() {
  return (
    <div>page</div>
  )
}

export default page