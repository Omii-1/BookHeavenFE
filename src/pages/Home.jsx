import {Hero} from "../components/Home/Hero"
import { RecentlyAdded } from "../components/Home/RecentlyAdded"

export function Home() {
  return (
    <div className='bg-zinc-900 text-white px-10 py-8'>
      <Hero />
      <RecentlyAdded />
    </div>
  )
}
