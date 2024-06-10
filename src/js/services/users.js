import MangixApi from "../api/api";
import { supabase } from "../supabase/supabase";

export async function getUsers() {
  return await supabase.from("profiles").select("*");
}

export async function createUser({
  email,
  password,
  full_name,
  phone,
  cpf,
  pin,
  role,
}) {
  const { data, status, statusText } = await MangixApi.post("/employee", {
    email,
    password,
    full_name,
    phone,
    cpf,
    pin,
    role,
  });

  console.log(data);
  if (status !== 201) throw new Error(statusText);

  return data;
}

export async function getUserById(id = null) {
  // if (!id) {data:null};

  const { data, status, statusText } = await MangixApi.get(
    `/employee${id ? `${id}` : ""}`
  );

  if (status !== 200) throw new Error(statusText);

  return data;
}

export async function getAdminUserList() {
  const { data, status, statusText } = await MangixApi.get("/admin/list");

  // console.log(data);
  if (status !== 200) throw new Error(statusText); // codigos de status de servidor

  return data;
}

export async function deleteUser(id) {
  const response = await MangixApi.delete(`/employee/account/${id}`);

  console.log(response);

  return response.data;
}
