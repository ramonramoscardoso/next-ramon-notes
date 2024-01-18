"use client";

import { Notebook } from "@/app/utils/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface NotebooksCardParams {
  id: string;
  notebooks: Notebook[];
  type?: "finished" | "notFinished";
}

export function NotebooksCard({ id, notebooks, type }: NotebooksCardParams) {
  const router = useRouter();

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

  return (
    <>
      {notebooks?.length > 0 && (
        <div className="grid grid-cols-3 place-items-stretch">
          {notebooks.map((notebook) => {
            return (
              <Card
                className={`w-[350px] flex flex-col items-center ${getOpacity()}`}
                key={`${notebook.name}-notebook-card`}
              >
                <CardHeader>
                  <CardTitle>{notebook.name}</CardTitle>
                </CardHeader>
                {notebook.tasks.length > 0 ? (
                  <CardContent>
                    {createTasksDetailsSection(notebook.tasks)}
                  </CardContent>
                ) : (
                  <CardContent>Nenhuma anotação ainda 📋</CardContent>
                )}
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
            );
          })}
        </div>
      )}
    </>
  );
}
