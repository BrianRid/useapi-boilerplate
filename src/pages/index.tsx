import { Box, Button, Container, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";

const Home: NextPage = () => {
  const session = useSession();

  return (
    <Box>
      <Container>
        <Heading>Home page</Heading>
        <Button onClick={() => signIn("google")}>Login with Google</Button>
        <Button onClick={() => signIn("credentials")}>
          Login with Credentials
        </Button>
        {session.status === "authenticated" && (
          <div>
            <p>Logged in as {session.data.user?.name}</p>
          </div>
        )}
      </Container>
    </Box>
  );
};

export default Home;
