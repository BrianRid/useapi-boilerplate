import type { NextPage } from "next";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";

const Home: NextPage = () => {
  const [user, setUser] = useState<{
    email: string;
    password: string;
    username: string;
  }>({
    email: "",
    password: "",
    username: "",
  });

  const signUpMutation = trpc.signup.useMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const signUp = async () => {
    const { email, password, username } = user;
    const toto = signUpMutation.mutate({ email, password, username });
    console.log(toto);
  };

  return (
    <div>
      <input placeholder="email" name="email" onChange={handleChange} />
      <input placeholder="username" name="username" onChange={handleChange} />
      <input placeholder="password" name="password" onChange={handleChange} />
      <button onClick={() => signUp()}>Signup</button>
    </div>
  );
};

export default Home;
