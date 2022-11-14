import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field } from "formik";

type InputProps = {
  id: string;
  label?: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  error?: string | string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  touched?: boolean;
};

const CustomInput = ({
  id,
  label,
  type,
  placeholder,
  disabled,
  required,
  value,
  error,
  onChange,
  touched,
}: InputProps) => {
  return (
    <Box mb={2} w="100%">
      <FormControl isDisabled={disabled} isInvalid={touched && !!error}>
        <FormLabel mb={5} htmlFor={id}>
          {label}
        </FormLabel>
        <Field
          name={id}
          as={Input}
          placeholder={placeholder}
          _placeholder={{
            color: "neutral.300",
            opacity: "0.5",
            fontWeight: "normal",
          }}
          type={type}
          isDisabled={disabled}
          required={required}
          value={value}
          onChange={onChange}
          errorBorderColor="error"
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </Box>
  );
};

export default CustomInput;
