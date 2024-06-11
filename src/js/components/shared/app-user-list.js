"use strict";

import {
  createUser,
  deleteUser,
  getAdminUserList,
} from "../../services/users.js";
import { Dt } from "../../utils/datatable/dt.js";
import Events from "../../utils/Events.js";

const usersTable = document.querySelector(".datatables-users");

const columns = ["full_name", "role", "cpf", "pin", "action"];

const dt = new Dt(usersTable, {
  fetcher: getAdminUserList,
  columns,
  refreshOn: [handleFormCreation, handleUserDeletion],
});

Events.$onPageLoad(async () => {
  dt.initializeTable();
});

function handleFormCreation() {
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

function handleUserDeletion() {
  const deleteRecordButtons = document.querySelectorAll(".delete-record");

  deleteRecordButtons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = e.target.parentElement.id;

      await deleteUser(id).then(async () => {
        await dt.refresh();
      });
    });
  });
}
