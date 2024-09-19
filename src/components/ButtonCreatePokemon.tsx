import Link from "next/link";
import React from "react";

function ButtonCreatePokemon() {
  return (
    <button className="rounded bg-[#272727] px-4 py-2 text-sm font-bold text-white hover:bg-gray-700">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2 inline-block h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 4v16m8-8H4"
        />
      </svg>
      <Link href="/pokedex/create">Create New</Link>
    </button>
  );
}

export default ButtonCreatePokemon;
