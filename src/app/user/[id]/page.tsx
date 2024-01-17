"use client";

import { getUserById } from "@/app/utils/local-storage";
import { LocalStorageUserData } from "@/app/utils/types";
import { CreateNotebookCard } from "@/components/create-notebook-card";
import { NotebooksCard } from "@/components/notebooks-card";
import { Separator } from "@/components/ui/separator";

export default function UserHomePage({ params }: { params: { id: string } }) {
  const user: LocalStorageUserData = getUserById(params.id);

  return (
    <div className="flex flex-col px-10">
      <div className="mt-20 mb-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Olá, {user.user.name}!</h2>
        {user?.notebooks?.length > 0 ? (
          <h4 className="font-thin">
            {`Hoje, você possui ${user.notebooks.length} ${
              user.notebooks.length === 1 ? "caderno" : "cadernos"
            } em progresso`}
          </h4>
        ) : (
          <h4 className="font-thin">
            Você ainda não tem nenhum caderno criado.
          </h4>
        )}
      </div>

      <div className="flex flex-col gap-10">
        {user.notebooks.length > 0 && (
          <section className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">Cadernos de anotação</h3>
            <Separator />
            <NotebooksCard id={params.id} />
          </section>
        )}

        <section className="flex flex-col gap-3">
          <h3 className="text-xl font-bold">
            Que tal criar um novo caderno de anotação?
          </h3>
          <Separator />
          <CreateNotebookCard id={params.id} />
        </section>
      </div>
    </div>
  );
}

{
  /* <div className="flex flex-col px-10">
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
</div> */
}
