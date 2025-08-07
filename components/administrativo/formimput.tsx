import { TextField, MenuItem } from "@mui/material";
import { Control, FieldPath, FieldValues, useController } from "react-hook-form";

// Opción para items de select
type SelectOption = {
  value: string | number;
  label: string;
};

// Props del componente
interface FormFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  type?: "text" | "number" | "email" | "password";
  variant?: "outlined" | "filled" | "standard";
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  fullWidth?: boolean;
  required?: boolean;
  helperText?: string;
  // Props específicas para select
  select?: boolean;
  options?: SelectOption[];
  // Props de validación
  rules?: any;
  // Props adicionales para el contenedor
  className?: string;
}

export default function FormField<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  variant = "outlined",
  color = "warning",
  fullWidth = true,
  required = false,
  helperText,
  select = false,
  options = [],
  rules,
  className = "flex mb-0 w-full"
}: FormFieldProps<T>) {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control,
    rules
  });

  return (
    <div className={className}>
      <TextField
        {...field}
        id={name}
        label={required ? `${label} *` : label}
        type={type}
        variant={variant}
        color={color}
        fullWidth={fullWidth}
        select={select}
        error={!!error}
        helperText={error ? error.message : helperText}
        slotProps={select ? {
          select: {
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            },
          }
        } : undefined}
      >
        {select && options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}