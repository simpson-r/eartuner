import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";

const mutationFn = () =>
  signIn("email", {
    email,
    redirect: false,
    callbackUrl: "/dashboard",
  });
/**
 * This hook ...
 */
export const useLogin = () => {
  const { mutate: login, isSuccess } = useMutation({ mutationFn });
  return { mutate, isSuccess };
};
