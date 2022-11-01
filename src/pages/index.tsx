import { Button, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

const Home: NextPage = () => {
  return (
    <div>
      <Heading>Home page</Heading>
      <Button onClick={() => signIn("google")}>Login with Google</Button>
      <Button onClick={() => signIn("credentials")}>
        Login with Credentials
      </Button>
    </div>
  );
};

export default Home;
