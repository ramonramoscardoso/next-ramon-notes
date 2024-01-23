"use client";

import { Notebook } from "@/app/utils/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { Check } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  createId,
  saveNotebookOnLocalStorage,
} from "@/app/utils/local-storage";
import { DatePicker } from "../date-picker";

interface CreateNotebookCardParams {
  id: string;
}

export function CreateNotebookCard({ id }: CreateNotebookCardParams) {
  const [taskInput, setTaskInput] = useState<string>("");
  const [formValues, setFormValues] = useState<Notebook>({
    name: "",
    tasks: [],
    done: false,
    date: new Date(),
    id: createId(id),
  });

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

  function handleDateChange(date: Date) {
    setFormValues((values) => ({
      ...values,
      date,
    }));
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

    window.location.reload();
  }

  return (
    <>
      <Card className="min-[600px]:w-[500px] w-[350px] flex flex-col items-center">
        <CardHeader>
          <CardTitle>Novo caderno de anotações</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleCreateNotebook}
            className="grid w-full items-center gap-4"
          >
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <span className="text-sm">Título do caderno</span>
                <Input
                  id="name"
                  placeholder="Título"
                  onChange={handleChange}
                />
                <DatePicker
                  value={formValues.date}
                  setValue={handleDateChange}
                  label="Data de conclusão"
                />
                {formValues.tasks.map((task, index) => {
                  return (
                    <Badge key={`task-${index}`} variant="secondary">
                      {index + 1} - {task.description}
                    </Badge>
                  );
                })}
                {formValues?.name && formValues.tasks.length < 10 && (
                  <>
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
                  </>
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
