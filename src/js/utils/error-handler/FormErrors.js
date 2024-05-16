export const FormErrors = Object.freeze({
  InvalidRoleError: {
    ADMIN: "Este Login eh para admin",
    COLABORADOR: "Este Login eh para colaborador",
  },
  AuthApiError: "Login/Senha invalido",
  EmptyInputsError: "Campos de login nao pode ficar vazio",
});

export function handleFormErrors(...errors) {
  if (errors.length < 1) return;

  const errorLogin = document.getElementById("authError");
  errorLogin.classList.remove("hide");

  errors.forEach((err) => {
    if (!err) return;

    errorLogin.innerText = FormErrors[err?.name] ?? err?.message ?? err;
  });
}
