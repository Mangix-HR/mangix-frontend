"use strict";

import swal from "sweetalert2";
import {
  createUser,
  deleteUser,
  getAdminUserList,
} from "../../services/users.js";
import { Dt } from "../../utils/datatable/dt.js";
import Events from "../../utils/Events.js";
import LocalStorage from "../../utils/local-storage.js";
import { navigate } from "../../utils/navigate.js";
import { toPage } from "../../utils/route-builder.js";

const user_storage_key = "current_user";
const usersTable = document.querySelector(".datatables-users");
const columns = ["full_name", "role", "cpf", "pin", "action"];

const dt = new Dt(usersTable, {
  fetcher: getAdminUserList,
  columns,
  actions: [handleCreateUser, handleDeleteUser, handleEditUser],
});

Events.$onPageLoad(async () => {
  await dt.initializeTable();
  LocalStorage.getOrExpire(user_storage_key);
});

function handleCreateUser() {
  const createUserForm = document.getElementById("addNewUserForm");
  const roleInput = document.getElementById("UserRoleCreate");
  let role = null;

  roleInput.addEventListener("change", (e) => {
    role = e.target?.value ?? null;
  });

  createUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formfields = [
      "full_name",
      "function",
      "email",
      "password",
      "contact",
      "cpf",
      "pin",
    ];

    const formData = formfields.reduce((acc, field) => {
      const fieldInput = document.getElementById(`add-user-${field}`);

      acc[field] = fieldInput.value;
      return acc;
    }, {});

    await createUser({
      ...formData,
      role,
    }).then(async () => {
      await dt.refresh();
    });
  });
}

function handleEditUser() {
  const editRecordButtons = document.querySelectorAll(".edit-record");

  editRecordButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.target.parentElement.id;

      LocalStorage.storeWithExpiry(user_storage_key, id, 300_000);
      navigate(toPage("account-settings"));
    });
  });
}

function handleDeleteUser() {
  const deleteRecordButtons = document.querySelectorAll(".delete-record");

  deleteRecordButtons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const userId = e.target.parentElement.id;

      swal({
        title: "Are you sure you want to delete this user?",
        text: "You will not be able to revert this action",
        type: "warning",
        showCancelButton: true,
        confirmButtonText:
          "<i class='bx bx-trash text-lg'></i> <span class='ml-2'>Delete</span>",
        cancelButtonText: "Cancel",
        confirmButtonClass: "btn btn-primary me-2  ",
        cancelButtonClass: "btn btn-label-secondary",
        confirmButtonColor: "",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          await deleteUser(userId)
            .then(async () => await dt.refresh())
            .catch((err) => swal.showValidationError(`Request failed ${err}`));
        },
      })
        .then((result) => {
          if (result) {
            swal({
              title: "User Deleted Successfully",
              type: "success",
              confirmButtonClass: "btn btn-success",
            });
          }
        })
        .catch((err) => {
          swal({
            title: "User Deletion Cancelled",
            type: "error",
            confirmButtonClass: "btn btn-info",
          });
        });
    });
  });
}
