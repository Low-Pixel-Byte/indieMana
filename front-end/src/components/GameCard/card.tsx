import { GameProps } from ".";
import Image from "next/image";

type CardProps = {
  info: GameProps;
};

export const Card = ({ info }: CardProps) => {
  return (
    <div className="flex flex-col bg-slate-800 rounded-lg w-full">
      <Image
        width={380}
        height={100}
        objectFit="center"
        className="rounded-t-lg"
        src={info.bannerUrl}
        alt={"Banner do jogo " + info.name}
        layout="responsive"
      />
      <div className="p-4">
        <span className="text-white font-bold">{info.name}</span>
      </div>
    </div>
  );
};
