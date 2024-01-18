"use client";

import { getUserById } from "@/app/utils/local-storage";
import { LocalStorageUserData } from "@/app/utils/types";
import { CreateNotebookCard } from "@/components/create-notebook-card";
import { NotebooksCard } from "@/components/notebooks-card";
import { Separator } from "@/components/ui/separator";

export default function UserHomePage({ params }: { params: { id: string } }) {
  const user: LocalStorageUserData = getUserById(params.id);

  const filterNotebooks = (type: "finished" | "notFinished") => {
    const notebookTypes = {
      finished: user.notebooks.filter((notebook) => notebook.done),
      notFinished: user.notebooks.filter((notebook) => !notebook.done),
    };

    return notebookTypes[type];
  };

  return (
    <div className="flex flex-col px-10">
      <div className="mt-20 mb-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Olá, {user.user.name}!</h2>
        {user?.notebooks?.length > 0 ? (
          <h4 className="font-thin">
            {`Atualmente, você possui ${
              filterNotebooks("notFinished").length
            } ${
              filterNotebooks("notFinished").length === 1
                ? "caderno"
                : "cadernos"
            } em progresso`}
          </h4>
        ) : (
          <h4 className="font-thin">
            Você ainda não tem nenhum caderno criado.
          </h4>
        )}
      </div>

      <div className="flex flex-col gap-10">
        {filterNotebooks("notFinished").length > 0 && (
          <section className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">
              Cadernos de anotação em progresso
            </h3>
            <Separator />
            <NotebooksCard
              id={params.id}
              notebooks={filterNotebooks("notFinished")}
            />
          </section>
        )}

        {filterNotebooks("finished").length > 0 && (
          <section className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">
              Cadernos de anotação finalizados
            </h3>
            <Separator />
            <NotebooksCard
              id={params.id}
              notebooks={filterNotebooks("finished")}
              type="finished"
            />
          </section>
        )}

        <section className="flex flex-col gap-3 mb-20">
          <h3 className="text-xl font-bold">
            Que tal criar um novo caderno de anotação?
          </h3>
          <Separator />
          {filterNotebooks("notFinished").length < 10 ? (
            <CreateNotebookCard id={params.id} />
          ) : (
            <>🚨 Máximo de 10 cadernos em execução atingido!</>
          )}
        </section>
      </div>
    </div>
  );
}
