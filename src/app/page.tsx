
import { Header } from "@/components/header";
import { UsersCard } from "@/components/users-card";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div>
        Bem-vindo ao Ramonotes! Aqui, você poderá criar e gerenciar suas
        anotações de forma simples e prática!
      </div>
      <div>
        <UsersCard />
      </div>
    </div>
  );
}
