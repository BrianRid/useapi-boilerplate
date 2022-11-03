import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Formik, Form, useFormik } from "formik";
import { useState } from "react";
import CustomInput from "../../components/input";
import * as Yup from "yup";
import { signIn } from "next-auth/react";

const SignUp = () => {
  const [formValues, setFormValues] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Nom d'utilisateur obligatoire"),
    email: Yup.string().email().required("Email obligatoire"),
    password: Yup.string().required("Mot de passe obligatoire"),
  });

  return (
    <Box h="100%">
      <Container>
        <Heading>SignUp</Heading>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            fetch("/api/user/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });
          }}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <VStack spacing={6} alignItems="start">
                <CustomInput
                  id="name"
                  label="Nom d'utilisateur"
                  type="text"
                  error={formik.errors.name}
                  touched={formik.touched.name}
                  onChange={formik.handleChange}
                  required
                  placeholder="Saisissez votre nom d'utilisateur"
                />
                <CustomInput
                  id="email"
                  label="Adresse mail"
                  type="email"
                  error={formik.errors.email}
                  touched={formik.touched.email}
                  onChange={formik.handleChange}
                  placeholder="Saisissez votre adresse mail"
                />
                <CustomInput
                  id="password"
                  label="Mot de passe"
                  type="password"
                  error={formik.errors.password}
                  touched={formik.touched.password}
                  onChange={formik.handleChange}
                  placeholder="Saisissez votre mot de passe"
                />
                <Button isLoading={formik.isSubmitting} type="submit">
                  Soumettre
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default SignUp;
