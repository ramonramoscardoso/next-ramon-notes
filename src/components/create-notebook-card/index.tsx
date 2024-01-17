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
import { Input } from "@/components/ui/input";
import { FormEvent, useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  createId,
  saveNotebookOnLocalStorage,
} from "@/app/utils/local-storage";
import { useRouter } from "next/navigation";

interface CreateNotebookCardParams {
  id: string;
}

export function CreateNotebookCard({ id }: CreateNotebookCardParams) {
  const [taskInput, setTaskInput] = useState<string>("");
  const [formValues, setFormValues] = useState<Notebook>({
    name: "",
    tasks: [],
    done: false,
    id: createId(id),
  });

  const router = useRouter();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  }

  function handleTaskInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setTaskInput(value);
  }

  function handleCreateTask() {
    const savedTasks = [...formValues.tasks];

    if (taskInput) {
      savedTasks.push({ description: taskInput, done: false });
    }

    setFormValues((values) => ({
      ...values,
      tasks: savedTasks,
    }));

    setTaskInput("");
  }

  function handleCreateNotebook(event: FormEvent) {
    event.preventDefault();

    saveNotebookOnLocalStorage(formValues, id);

    router.refresh();
  }

  return (
    <>
      <Card className="w-[350px] flex flex-col items-center">
        <CardHeader>
          <CardTitle>Novo caderno de anotações</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateNotebook} className="grid w-full items-center gap-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="name"
                  placeholder="Título do caderno"
                  onChange={handleChange}
                />
                {formValues.tasks.map((task, index) => {
                  return (
                    <Badge key={`task-${index}`} variant="secondary">
                      {index + 1} - {task.description}
                    </Badge>
                  );
                })}
                {formValues?.name && (
                  <div className="flex">
                    <Input
                      id="task"
                      placeholder="Digite uma tarefa"
                      value={taskInput}
                      onChange={handleTaskInputChange}
                    />
                    <Button
                      variant="outline"
                      onClick={handleCreateTask}
                      type="button"
                    >
                      <Check />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              type="submit"
              disabled={formValues.name ? false : true}
            >
              Criar
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
