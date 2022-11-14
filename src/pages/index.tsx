import { Box, Button, Container, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const Home: NextPage = () => {
  const session = useSession();

  return (
    <Box>
      <Container>
        <Heading>Home page</Heading>
        <Button onClick={() => signIn("google")}>Login with Google</Button>
        <Link href={"./auth/signin"}>Login with Credentials</Link>
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
