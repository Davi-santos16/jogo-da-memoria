import CardGame from "./components/CardGame";
import { format } from "date-fns";

export default function Home() {
  const hoje = new Date();

  return (
    <div>
      <div className="flex justify-center items-center gap-5">
        <h1 className="text-center text-2xl font-bold">Jogo Da Memoria</h1>
        <p className="text-center font-bold text-2xl">{format(hoje, "dd/MM/yyyy")}</p>
      </div>

      <div className="flex justify-center items-center mt-5">
        <CardGame />
      </div>
    </div>
  );
}