import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-5 bg-indigo-700">
      <h1 className="text-3xl font-bold text-white">IndieMana</h1>
      <nav>
        <ul className="flex items-center gap-4">
          <li className="">
            <a className="text-white hover:text-gray-400 text-lg" href="/games">
              Jogos
            </a>
          </li>
          <li>
            <a
              className="text-white hover:text-gray-400 text-lg"
              href="/developers"
            >
              Desenvolvedores
            </a>
          </li>
          <li>
            <a
              className="text-white hover:text-gray-400 text-lg"
              href="/community"
            >
              Comunidade
            </a>
          </li>
          <li>
            <a className="text-white hover:text-gray-400 text-lg" href="/about">
              Sobre
            </a>
          </li>
        </ul>
      </nav>

      <div className="flex items-center">
        <input type="text" />
      </div>

      <button className="px-4 py-2 text-black bg-yellow-300 rounded text-lg font-semibold">
        Sugerir jogo
      </button>
    </header>
  );
}
