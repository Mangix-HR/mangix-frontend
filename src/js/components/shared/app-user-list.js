"use strict";

import { createUser, deleteUser, getAdminUserList } from "../../services/users";
import {
  refreshTable,
  initializeTable,
  tableEventsManager,
} from "../../utils/datatable/dt";
import Events from "../../utils/Events";

let dt;

const tableParams = {
  dt,
  dataFetcher: await getAdminUserList(),
  events: [handleFormCreation, handleUserDeletion],
};

Events.$onPageLoad(async () => {
  const usersTable = document.querySelector(".datatables-users");

  const { data } = await getAdminUserList();
  const columns = ["full_name", "role", "cpf", "pin", "action"];

  if (data) {
    dt = initializeTable(usersTable, data, columns);

    tableEventsManager(tableParams.events);

    setInterval(async () => {
      await refreshTable(tableParams);
    }, 120_000);
  }
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
      await refreshTable(tableParams);
    });
  });
}

function handleUserDeletion(dt) {
  const deleteRecordButtons = document.querySelectorAll(".delete-record");

  deleteRecordButtons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = e.target.parentElement.id;

      await deleteUser(id).then(async () => await refreshTable(tableParams));
    });
  });
}
