"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
import { dateToDDMMYYYY } from "@/app/utils/dayjs";

interface DatePickerParams {
  value: Date | string;
  setValue: (value: Date) => void;
  label: string;
}

export function DatePicker({ value, setValue, label }: DatePickerParams) {
  return (
    <>
      <span className="text-sm">{label}</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? dateToDDMMYYYY(value) : <span>Data de Conclusão</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={new Date(value)}
            onSelect={(v: any) => setValue(v)}
            required={true}
            initialFocus
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
