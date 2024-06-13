import { getUserById } from "../services/users";
import Events from "../utils/Events";
import LocalStorage from "../utils/local-storage";

const formSubmit = document.getElementById("saveChanges");

Events.$onPageLoad(async () => {
  const userId = LocalStorage.getOrExpire("current_user");

  const { data } = await getUserById(userId);

  fillUserForm(data);
});

function useFields(fieldOptions) {
  // if (!cb) return;

  const mutation = (cb) => {
    return fieldOptions.reduce((acc, field) => {
      acc[field] = cb(field);
      return acc;
    }, {});
  };

  const prefillUser = (user, cb) => {
    for (const [key, value] of Object.entries(user)) {
      if (fieldOptions.some((field) => field === key)) {
        cb({ name: key, value });
      }
    }
  };

  return {
    prefillUser,
    mutation,
  };
}

const formFields = [
  "full_name",
  "cpf",
  "email",
  "company",
  "phone",
  "address",
  "zip",
  "role",
  "pin",
  "currency",
];

function fillUserForm(data) {
  const { prefillUser } = useFields(formFields);
  const user = data;

  prefillUser(user, ({ name, value }) => {
    document.getElementById(`account-${name}`).value = value;
  });
}

async function handleUpdateUser() {
  const { mutation } = useFields(formFields);

  const formSubmission = mutation(
    (field) => document.getElementById(`account-${field}`)?.value
  );

  console.log(formSubmission);
}

formSubmit.addEventListener("click", async (e) => {
  e.preventDefault();

  await handleUpdateUser();
});
