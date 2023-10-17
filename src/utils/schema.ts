import { z } from 'zod';
import { errorMap } from 'zod-validation-error';
import { phoneRegex } from './constants';

z.setErrorMap(errorMap);

export const EmployeeSchema = z.object({
    city: z.string(),
    department: z.string(),
    departmentId: z.string(),
    email: z.string().email(),
    fullName: z.string(),
    gender: z.string(),
    hireDate: z.string().datetime(),
    id: z.string().uuid(),
    isPermanent: z.boolean(),
    mobile: z.string().regex(phoneRegex, 'Invalid phone number'),
});

export type Employee = z.infer<typeof EmployeeSchema>;
