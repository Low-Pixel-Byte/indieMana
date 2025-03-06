import Link from "next/link";
import { GameProps } from ".";
import Image from "next/image";

type CardProps = {
  info: GameProps;
};

export const Card = ({ info }: CardProps) => {
  return (
    <Link href={`/games/${info.id}`} className="flex flex-col w-full">
      <div className="relative h-80 w-56 border-4 border-indigo-700 rounded-lg">
        <Image
          src={info.bannerUrl}
          alt={"Banner do jogo " + info.name}
          fill
          className="rounded-t-lg object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-white font-bold line-clamp-2 text-xl mt-2">
          {info.name}
        </span>
        <div className="h-0.5 bg-indigo-700 my-2 rounded-full"></div>
        <span className="text-gray-400 line-clamp-4">{info.description}</span>
      </div>
    </Link>
  );
};
