export const Footer = () => {
  return (
    <footer className=" bg-indigo-700 text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-3  ">
          <div className="flex flex-col items-center border-r border-indigo-400">
            <span className="font-bold text-white text-xl">IndieMana</span>
            <p>
              IndieMana é sua vitrine para explorar jogos indie incríveis de
              desenvolvedores ao redor do mundo. Descubra histórias únicas e
              viva experiências inesquecíveis.
            </p>
          </div>

          <div className="flex flex-col gap-4 items-center justify-center border-r border-indigo-400">
            <div className="flex flex-col border-b border-indigo-400 w-full items-center justify-center">
              <span className="font-bold text-white text-xl uppercase">
                navegação Rápida
              </span>
              <nav className="">
                <ul className="flex  gap-2">
                  <li>Sobre Nós</li>
                  <li>Explorar Jogos</li>
                  <li>Enviar Jogo</li>
                  <li>Comunidade</li>
                  <li>Suporte</li>
                </ul>
              </nav>
            </div>

            <div className="flex flex-col w-full items-center justify-center">
              <span className="font-bold text-white text-xl uppercase">
                contato
              </span>
              <div className="flex gap-2">
                <span>contato@indiemana.com</span>
                <span>|</span>
                <span>Suporte</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-center justify-center">
            <span className="font-bold text-white text-xl uppercase">
              redes sociais
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-around border-t border-indigo-400 py-8">
        <div className="container mx-auto">
          <span>© 2025 IndieMana. Todos os direitos reservados.</span>
          <span>Desenvolvido por: Bruno de Araujo e Gabriel Dutra.</span>
        </div>
      </div>
    </footer>
  );
};
