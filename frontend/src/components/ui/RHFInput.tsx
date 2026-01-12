import type { Control, FieldValues, Path } from "react-hook-form";
import type { LucideIcon } from "lucide-react";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./form";
import { Input } from "./input";

interface RHFInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  Icon: LucideIcon;
}

export default function RHFInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  Icon,
}: RHFInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="ml-2 font-medium text-primary-300">
            {label}
          </FormLabel>

          <FormControl>
            <div className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-primary-300" />
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                className="pl-10 text-md border-primary-100 focus-visible:border-primary-300 focus-visible:ring-2 placeholder:text-gray-300"
              />
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
