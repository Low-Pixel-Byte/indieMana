import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex p-5 bg-indigo-700">
      <div className="container flex items-center mx-auto justify-between">
        <h1 className="text-3xl font-bold text-white">
          <Link href="/">IndieMana</Link>
        </h1>
        <nav>
          <ul className="flex items-center gap-4">
            <li className="">
              <Link
                className="text-white hover:text-gray-400 text-lg"
                href="/games"
              >
                Jogos
              </Link>
            </li>
            <li>
              <Link
                className="text-white hover:text-gray-400 text-lg"
                href="/developers"
              >
                Desenvolvedores
              </Link>
            </li>
            <li>
              <Link
                className="text-white hover:text-gray-400 text-lg"
                href="/community"
              >
                Comunidade
              </Link>
            </li>
            <li>
              <Link
                className="text-white hover:text-gray-400 text-lg"
                href="/about"
              >
                Sobre
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center">
          <input type="text" />
        </div>

        <button className="px-4 py-2 text-black bg-yellow-300 rounded text-lg font-semibold">
          Sugerir jogo
        </button>
      </div>
    </header>
  );
}
