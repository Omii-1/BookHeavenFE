import { Link } from "react-router-dom"


export const Hero = () => {
  return (
    <div className="h-[75vh] my-12 md:my-0 flex flex-col md:flex-row gap-8  md:gap-0 justify-center">
      <div className="w-full md:w-1/2 flex flex-col gap-4 items-center md:items-start justify-center">
        <h1 className="text-4xl md:text-6xl font-semibold text-yellow-100 text-center md:text-start">Discover Your Next Great Read</h1>
        <p className="text-xl text-zinc-300 text-center md:text-start">Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books</p>
        <Link to="/all-books" className="text-yellow-200 text-xl md:text-2xl font-semibold border border-yellow-100 py-2 md:py-3 px-4 md:px-6 hover:bg-zinc-800 rounded-full">Discover Books</Link>
      </div>
      <div className="w-full md:w-1/2 md:h-[100%] flex justify-center items-center">
        <img className="h-[300px] sm:h-[350px] lg:h-full " src="./hero.png" alt="hero" />
      </div>
    </div>
  )
}
