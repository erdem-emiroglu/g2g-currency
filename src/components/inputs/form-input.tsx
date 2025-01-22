import React from 'react';
import TextField from '@mui/material/TextField';
import {DeepRequired, FieldErrorsImpl, GlobalError, UseFormRegister} from 'react-hook-form';

interface FormInputProps<T = any> {
    id: keyof T & string;
    name: keyof T & string;
    label: string;
    type?: string;
    register: UseFormRegister<any>;
    errors: Partial<FieldErrorsImpl<DeepRequired<T>>> & { root?: Record<string, GlobalError> & GlobalError }
    validationRules: Record<string, any>;
    defaultValue?: string;
}

const FormInput: React.FC<FormInputProps> = ({
                                                 id,
                                                 name,
                                                 label,
                                                 type = "text",
                                                 register,
                                                 errors,
                                                 validationRules,
                                                 defaultValue
                                             }) => {
    return (
        <div style={{marginBottom: '16px'}}>
            <TextField
                autoFocus
                required
                margin="dense"
                id={id}
                name={name}
                label={label}
                type={type}
                fullWidth
                variant="standard"
                slotProps={{
                    htmlInput: {
                        defaultValue,
                        ...register(name, validationRules),
                    },
                }}
                sx={{
                    borderColor: errors[name] ? "red" : undefined,
                }}
            />
            {errors[name] && (
                <p
                    style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "4px",
                        marginBottom: "0",
                    }}
                >
                    {errors[name]?.message as any}
                </p>
            )}
        </div>
    );
};

export default FormInput;
