import { getUserById, updateUserProfile } from "../services/users";
import Events from "../utils/Events";
import LocalStorage from "../utils/local-storage";

const formSubmit = document.getElementById("saveChanges");

Events.$onPageLoad(async () => {
  const userId = LocalStorage.getOrExpire("current_user");
  const { data: user } = await getUserById(userId);

  prefillUser(
    user,
    [...accountFormFields, ...profileFormFields],
    ({ name, value }) => {
      document.getElementById(`account-${name}`).value = value;
    }
  );

  formSubmit.addEventListener("click", async (e) => {
    e.preventDefault();

    await handleUpdateProfile(user.id);
  });
});

const mutation = (fields, cb) => {
  return fields.reduce((acc, field) => {
    acc[field] = cb(field);
    return acc;
  }, {});
};

const prefillUser = (user, fields, cb) => {
  for (const [key, value] of Object.entries(user)) {
    if (fields.some((field) => field === key)) {
      cb({ name: key, value });
    }
  }
};

const profileFormFields = [
  "full_name",
  "cpf",
  "company",
  "address",
  "cep",
  "role",
  "pin",
  "currency",
];

const accountFormFields = ["email", "phone", "password"];

async function handleUpdateProfile(userId) {
  const { email, phone, ...profileData } = mutation(
    profileFormFields,
    (field) => {
      const inputField = document.getElementById(`account-${field}`)?.value;

      return inputField === "" ? null : inputField;
    }
  );

  await updateUserProfile(userId, profileData);
}
