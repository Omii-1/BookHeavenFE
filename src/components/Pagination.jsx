export function Pagination({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="flex gap-2 justify-center items-center pt-5">
      {
        pages.map((page, index) => {
          const isActive = currentPage === page;
          const buttonClasses = `border p-1 px-2 rounded ${isActive ? 'bg-white text-black' : 'text-white bg-zinc-800'} hover:bg-white hover:text-black`;

          return (
            <button
              className={buttonClasses}
              key={index}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          )
        })
      }
    </div>
  );
}
