import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormProps, FieldValues } from 'react-hook-form';
import { z } from 'zod';

export function useFormWithZod<TFieldValues extends FieldValues = FieldValues>(
  schema: z.ZodType<TFieldValues>,
  options?: Omit<UseFormProps<TFieldValues>, 'resolver'>
) {
  return useForm<TFieldValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    ...options,
  });
}
