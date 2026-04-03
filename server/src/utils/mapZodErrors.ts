import { ZodError } from 'zod';

export function mapZodErrors(zodErr: ZodError): { field: string; message: string }[] {
    const formatted = zodErr.format();
    const formErrors: { field: string; message: string }[] = [];
    
    for (const [field, fieldError] of Object.entries(formatted)) {
        if (field === '_errors') continue;
        if (fieldError && typeof fieldError === 'object' && '_errors' in fieldError) {
            const errors = (fieldError as any)._errors as string[];
            errors.forEach((msg) => {
                formErrors.push({ field, message: msg });
            });
        }
    }
    
    return formErrors;
}
