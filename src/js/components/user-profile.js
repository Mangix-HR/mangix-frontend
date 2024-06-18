import {
  getUserById,
  updateUserAccount,
  updateUserProfile,
} from "../services/users";
import Events from "../utils/Events";
import LocalStorage from "../utils/local-storage";
import swal from "sweetalert2";

const accountForm = document.getElementById("account-form");
const profileForm = document.getElementById("profile-form");

const profileFormFields = {
  prefix: "profile",
  fields: [
    "full_name",
    "cpf",
    "company",
    "address",
    "cep",
    "function",
    "role",
    "currency",
    "pin",
  ],
};

const accountFormFields = {
  prefix: "account",
  fields: ["email", "phone", "password"],
};

Events.$onPageLoad(async () => {
  const userId = LocalStorage.getOrExpire("current_user");
  const { data: user } = await getUserById(userId);

  prefillUser(user, [profileFormFields, accountFormFields]);

  profileForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = mutation(profileFormFields);
    console.log(formData);
    const result = await updateUserProfile(userId, formData);

    if (result.status === 200) {
      showSuccessModal(result.statusText);
    } else {
      showErrorModal(result.statusText);
    }
  });

  accountForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = mutation(accountFormFields);

    const result = await updateUserAccount(userId, formData);

    if (result.status === 200) {
      showSuccessModal(result.statusText);
    } else {
      showErrorModal(result.statusText);
    }
  });
});

const getFields = ({ prefix, fields }) => {
  return fields.map((f) => {
    return {
      prefix,
      suffix: f,
      element: document.getElementById(`${prefix}-${f}`),
    };
  });
};

const mutation = (formOptions, cb = undefined) => {
  const fields = getFields(formOptions);

  return fields.reduce((acc, { suffix, element }) => {
    const inputValue = element?.value ?? "";
    acc[suffix] = inputValue === "" ? null : inputValue;

    return acc;
  }, {});
};

const prefillUser = (user, formFields) => {
  const allFields = formFields.reduce((acc, fData) => {
    const fieldElements = getFields(fData).map((fItem) => fItem);

    acc.push(...fieldElements);
    return acc;
  }, []);

  for (const [key, value] of Object.entries(user)) {
    allFields.forEach(({ suffix: fieldName, element }) => {
      if (key === fieldName && element) {
        element.value = value;
      }
    });
  }
};

const showSuccessModal = (title) => {
  swal({
    title: title,
    text: "User Profile Edited successfully",
    type: "success",
    confirmButtonText: "<span class='mx-auto'>Ok</span>",
    confirmButtonClass: "btn btn-primary mx-2",
    confirmButtonColor: "",
    showLoaderOnConfirm: true,
  });
};

const showErrorModal = (title) => {
  swal({
    title: title,
    text: "error editing user ",
    type: "error",
    confirmButtonText: "<span class='mx-auto'>Close</span>",
    confirmButtonClass: "btn btn-primary mx-auto",
    showCancelButton: false,
    confirmButtonColor: "",
    showLoaderOnConfirm: true,
  });
};
