import { Header } from "@/components/header";
import { UsersCard } from "@/components/users-card";

export default function Home() {
  return (
    <div className="flex flex-col px-10">
      <div className="mt-20 mb-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Bem-vindo ao Ramonotes!</h2>
        <h4 className="font-thin">
          Aqui, você poderá criar e gerenciar suas anotações de forma simples e
          prática. Todos os dados que você adicionar aqui ficarão salvos
          exclusivamente em seu navegador!
        </h4>
      </div>
      <div>
        <UsersCard />
      </div>
    </div>
  );
}
