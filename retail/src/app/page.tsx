'use client'

import { useAppContext } from "./Context"


export default function Home() {
  
  const {state}=useAppContext();
  return (
    <div>
      {state}
    </div>
  )
}
