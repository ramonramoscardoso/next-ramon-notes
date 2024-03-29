"use client";

import { dateDifferenceFromToday } from "@/app/utils/dayjs";
import { deleteNotebook } from "@/app/utils/local-storage";
import { Notebook } from "@/app/utils/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NotebooksCardParams {
  id: string;
  notebooks: Notebook[];
  type?: "finished" | "notFinished";
}

export function NotebooksCard({ id, notebooks, type }: NotebooksCardParams) {
  const [notebookDeleteId, setNotebookDeleteId] = useState<number | null>(null);

  const router = useRouter();

  function handleDeleteNotebook(notebookId: number) {
    deleteNotebook(id, notebookId);

    window.location.reload();
  }

  function createTasksDetailsSection(
    tasks: { description: string; done: boolean }[]
  ) {
    const finishedTasks = tasks.filter((task) => task.done);
    const notFinishedTasksLength = tasks.length - finishedTasks.length;

    return (
      <div className="text-center">
        <p>
          {`${finishedTasks.length} ${
            finishedTasks.length === 1
              ? "anotação finalizada ✅"
              : "anotações finalizadas ✅"
          }`}
        </p>
        {type !== "finished" && (
          <p>
            {`${notFinishedTasksLength} ${
              notFinishedTasksLength === 1
                ? "anotação não finalizada ❌"
                : "anotações não finalizadas ❌"
            }`}
          </p>
        )}
      </div>
    );
  }

  function getOpacity() {
    if (type === "finished") return "opacity-30";

    return "opacity-1";
  }

  function getBorderColor(date: string, done: boolean) {
    const dateDifference = dateDifferenceFromToday(date);

    if (dateDifference > 1 || done) return "";

    return "border-4 border-red-500";
  }

  function getLateNotebookText(date: string) {
    const dateDifference = dateDifferenceFromToday(date);

    if (dateDifference < 0) return <>🚨 Caderno atrasado!</>

    return <>🚨 Falta pouco tempo para finalizar!</>
  }

  function notebookCard(notebook: Notebook) {
    return (
      <>
        <div className="w-full flex justify-end h-0">
          <Button
            variant="ghost"
            onClick={() => setNotebookDeleteId(notebook.id)}
          >
            <Trash2 size={15} />
          </Button>
        </div>
        <Card
          className={`min-[600px]:w-[350px] w-[250px] min-h-[320px] flex flex-col justify-center items-center ${getOpacity()} ${getBorderColor(
            notebook.date as string,
            notebook.done
          )}`}
        >
          <CardHeader>
            <CardTitle>{notebook.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {notebook.tasks.length > 0 ? (
              <>{createTasksDetailsSection(notebook.tasks)}</>
            ) : (
              <p className="text-center">Nenhuma anotação ainda 📋</p>
            )}
            {!notebook.done && (
              <div className="text-center">
                {dateDifferenceFromToday(notebook.date.toString()) <= 1 && (
                  <p className="mt-5">{getLateNotebookText(notebook.date.toString())}</p>
                )}
                <p className="mt-5">
                  Data para conclusão: {notebook.date.toString()}
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                router.push(`/user/${id}/notebook/${notebook.id}`);
              }}
            >
              Abrir caderno
            </Button>
          </CardFooter>
        </Card>
      </>
    );
  }

  function notebookDeleteCard(notebook: Notebook) {
    return (
      <Card className="min-[600px]:w-[350px] w-[250px] flex flex-col items-center bg-rose-700">
        <CardHeader>
          Tem certeza que deseja deletar o caderno {notebook.name}?
        </CardHeader>

        <CardFooter className="flex w-full justify-between">
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={() => handleDeleteNotebook(notebook.id)}
          >
            Sim
          </Button>
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={() => setNotebookDeleteId(null)}
          >
            Cancelar
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <>
      {notebooks?.length > 0 && (
        <div className="grid min-[1200px]:grid-cols-3 md:grid-cols-2 gap-5 place-items-center">
          {notebooks.map((notebook) => {
            return (
              <div key={`notebook-${notebook.id}`}>
                {notebookDeleteId && notebookDeleteId === notebook.id ? (
                  <>{notebookDeleteCard(notebook)}</>
                ) : (
                  <>{notebookCard(notebook)}</>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
