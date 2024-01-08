import LocalizedLink from "@init-src/components/LocalizedLink";

function RightBtns() {
  return (
    <div className="header__icons flex justify-center items-center gap-5 lg:gap-4">
      <LocalizedLink
        className="hidden lg:flex w-12 h-12 rounded-full items-center justify-center relative bg-emerald-50 hover:bg-primary-500 hover:text-black transition-colors"
        to="/login"
      >
        <svg
          className="w-6 h-6 lg:h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </LocalizedLink>

      <LocalizedLink
        className="hidden lg:flex w-12 h-12 rounded-full items-center justify-center bg-stone-100 hover:bg-primary-500 hover:text-black transition-colors"
        to="/favorites"
      >
        <svg
          className="w-6 h-6 lg:h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </LocalizedLink>

      <LocalizedLink
        className="z-20 w-12 h-12 rounded-full flex items-center justify-center relative bg-orange-200 hover:bg-primary-500 hover:text-black transition-colors"
        to="/cart/"
      >
        <svg
          className="w-6 h-6 lg:h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        {/*
        <span className="cart__count absolute w-5 h-5 sm:w-8 sm:h-8 lg:w-6 lg:h-6 flex text-black items-center justify-center -top-2 lg:-top-1.5 md:-top-4 md:-right-2 right-0 rounded-full bg-stone-400">
          'total_count'
        </span> */}
      </LocalizedLink>
    </div>
  );
}

export default RightBtns;
