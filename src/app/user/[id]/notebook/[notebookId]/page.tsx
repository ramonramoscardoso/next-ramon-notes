"use client";

import {
  updateNotebookOnLocalStorage,
  userNotebook,
} from "@/app/utils/local-storage";
import { Notebook } from "@/app/utils/types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CheckedState } from "@radix-ui/react-checkbox";
import { PenLine, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditInput {
  index: number;
  description: string;
}

export default function NotebookPage({
  params,
}: {
  params: { id: string; notebookId: string };
}) {
  const [notebook, setNotebook] = useState<Notebook>(
    userNotebook(params.id, params.notebookId)
  );
  const [doneNotebook, setDoneNotebook] = useState<boolean>(notebook.done);
  const [editInput, setEditInput] = useState<EditInput | null>(null);
  const [newTaskInput, setNewTaskInput] = useState<string>("");

  const router = useRouter();

  function handleCheckNote(index: number, checked: boolean) {
    const notebookCopy = { ...notebook };
    notebookCopy.tasks[index].done = checked;

    setNotebook(notebookCopy);
  }

  function handleEditNoteType(value: any, index: number) {
    const notebookCopy = { ...notebook };

    notebookCopy.tasks[index].description = value;

    setNotebook(notebookCopy);
  }

  function disableInput(index: number) {
    if (editInput && index === editInput?.index) return false;

    return true;
  }

  function handleCreateNewTask() {
    if (newTaskInput) {
      notebook.tasks.push({ description: newTaskInput, done: false });

      setNewTaskInput("");
    }
  }

  function getUnmarkedNotes() {
    return notebook.tasks.filter((task) => !task.done);
  }

  function handleSaveChanges() {
    updateNotebookOnLocalStorage(notebook, params.id, params.notebookId);

    router.replace(`/user/${params.id}`);
  }

  function handleFinishOrReopen(done: boolean) {
    updateNotebookOnLocalStorage(
      { ...notebook, done: done },
      params.id,
      params.notebookId
    );

    if (done) router.replace(`/user/${params.id}`);
    else setDoneNotebook(false);
  }

  return (
    <>
      {!notebook ? (
        <>Ops! O caderno de anotações não foi encontrado</>
      ) : (
        <div className="w-full flex justify-center mt-5">
          <Card className="w-[900px]">
            <CardHeader>
              <CardTitle>{notebook.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {notebook.tasks.map((task, index) => {
                return (
                  <div
                    key={`task-${index}`}
                    className="flex gap-5 items-center"
                  >
                    <Checkbox
                      checked={task.done}
                      onCheckedChange={(value: CheckedState) =>
                        handleCheckNote(index, value as boolean)
                      }
                      disabled={doneNotebook}
                    />
                    <Input
                      value={task.description}
                      disabled={disableInput(index)}
                      onChange={(e) =>
                        handleEditNoteType(e.target.value, index)
                      }
                    />
                    {editInput && editInput.index === index ? (
                      <Button onClick={() => setEditInput(null)}>
                        <Check />
                      </Button>
                    ) : (
                      <>
                        {!doneNotebook && (
                          <Button
                            variant="outline"
                            onClick={() =>
                              setEditInput({
                                index,
                                description: task.description,
                              })
                            }
                          >
                            <PenLine />
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                );
              })}

              {!doneNotebook && notebook.tasks.length < 10 && (
                <div className="flex gap-5">
                  <Input
                    id="task"
                    placeholder="Digite uma nova tarefa"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                  />
                  <Button
                    variant={newTaskInput ? "default" : "outline"}
                    disabled={newTaskInput ? false : true}
                    onClick={handleCreateNewTask}
                    type="button"
                  >
                    <Check />
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex gap-3">
              {!doneNotebook ? (
                <>
                  {getUnmarkedNotes().length === 0 && (
                    <Button onClick={() => handleFinishOrReopen(true)}>
                      Finalizar Caderno de Anotações
                    </Button>
                  )}
                  <Button onClick={handleSaveChanges}>Salvar alterações</Button>
                </>
              ) : (
                <Button onClick={() => handleFinishOrReopen(false)}>
                  Reabrir caderno
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
