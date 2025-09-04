"use client";
import Image from "next/image";

interface CardItemProps {
  srcFront: string;
  srcBack: string;
  virado: boolean;
  onClick: () => void;
}

export default function CardItem({ srcFront, srcBack, virado, onClick }: CardItemProps) {
  return (
    <Image
      className="cursor-pointer"
      onClick={onClick}
      alt="card"
      src={virado ? srcBack : srcFront}
      width={120}
      height={120}
    />
  );
}
