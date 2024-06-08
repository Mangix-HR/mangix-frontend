import Events from "../../utils/Events.js";
import { login, logout } from "../../services/auth.js";
import { navigate } from "../../utils/navigate.js";
import { toPage } from "../../utils/route-builder.js";
import {
  FormErrors,
  handleFormErrors,
} from "../../utils/error-handler/FormErrors.js";
import LocalStorage from "../../utils/local-storage.js";

const isFormLoading = (condition) => {
  const button = document.getElementById("button");
  let retainBtnText = "ENTRAR";

  if (condition) {
    button.disabled = true;
    button.innerText = "Loading...";
  } else {
    button.disabled = false;
    button.innerText = retainBtnText;
  }
};

async function isValidRole(role, ROLE) {
  if (!role) return null;

  if (role !== ROLE) {
    await logout();
    return FormErrors.InvalidRoleError[ROLE];
  }

  return null;
}

export default class LoginPages {
  static admin() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const button = document.getElementById("button");

    Events.$click(button, async () => {
      const ROLE = "ADMIN";

      try {
        if (email.value === "" || password.value === "") {
          throw new Error(FormErrors.EmptyInputsError);
        }

        isFormLoading(true);
        const { data, error } = await login(email.value, password.value);
        const roleValidated = await isValidRole(data?.profile.role, ROLE);

        if (!error && !roleValidated) {
          LocalStorage.store("LAYOUT", ROLE);
          navigate(toPage("dashboard"));
        }

        isFormLoading(false);
        handleFormErrors(roleValidated, error);
      } catch (error) {
        handleFormErrors(error);
      }
    });
  }

  static colaborador() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const button = document.getElementById("button");

    Events.$click(button, async () => {
      const ROLE = "COLABORADOR";

      try {
        if (email.value === "" || password.value === "") {
          throw new Error(FormErrors.EmptyInputsError);
        }

        isFormLoading(true);
        const { data, error } = await login(email.value, password.value);
        const roleValidated = await isValidRole(data?.profile.role, ROLE);

        if (!error && !roleValidated) {
          LocalStorage.store("LAYOUT", ROLE);
          navigate(toPage("bater-ponto"));
        }

        isFormLoading(false);
        handleFormErrors(roleValidated, error);
      } catch (error) {
        handleFormErrors(error);
      }
    });
  }
}
