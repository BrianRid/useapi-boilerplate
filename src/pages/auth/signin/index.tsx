import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { signIn } from "next-auth/react";
import React from "react";
import CustomInput from "../../../components/input";
import * as Yup from "yup";

export default function SignIn() {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Adresse email obligatoire"),
    password: Yup.string().required("Mot de passe obligatoire"),
  });

  return (
    <Container>
      <Heading>Connexion</Heading>
      <Flex flexDir={"column"}>
        <Button onClick={() => signIn("google")}>Connexion avec Google</Button>
        <Divider w="full" my={5} />
        <Box w="100%">
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              fetch("/api/user/check-credentials", {
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
              <>
                <form onSubmit={formik.handleSubmit}>
                  <VStack spacing={6} alignItems="start" minW="100%">
                    <CustomInput
                      id="email"
                      label="Adresse email"
                      type="text"
                      placeholder="Saisissez votre adresse email"
                      error={formik.errors.email}
                      touched={formik.touched.email}
                      onChange={formik.handleChange}
                    />
                    <CustomInput
                      id="password"
                      label="Mot de passe"
                      type="password"
                      placeholder="Saisissez votre mot de passe"
                      error={formik.errors.password}
                      touched={formik.touched.password}
                      onChange={formik.handleChange}
                    />
                    <Button type="submit">Se connecter</Button>
                  </VStack>
                </form>
              </>
            )}
          </Formik>
        </Box>
      </Flex>
    </Container>
  );
}
