import MangixApi from "../api/api";
import { supabase } from "../supabase/supabase";

export async function logout() {
  return (await MangixApi.get("/auth/logout")).data;
}

export async function login(email, password) {
  return await MangixApi.post("/auth/login", {
    email,
    password,
  });
}

export async function validateSession() {
  try {
    await MangixApi.get("/auth/session");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getUser(session) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session?.user.id);

  const [user] = data;

  return {
    user,
    error,
  };
}

export async function getAllUsers() {
  return await supabase.from("profiles").select("*");
}
