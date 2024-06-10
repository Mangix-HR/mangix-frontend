"use strict";

import DataTable from "datatables.net-dt";
import { createUser, deleteUser, getAdminUserList } from "../../services/users";
import Events from "../../utils/Events";
import "datatables.net-buttons-bs5";
import "datatables.net-fixedcolumns-bs5";
import "jquery-datatables-checkboxes";
import "datatables.net-fixedheader-bs5";
import { buildColumns, dtConfig } from "../dt-columns";

let dt;
const tableEvents = [handleFormCreation, handleUserDeletion];

function initializeTable(tableElement, data, columns) {
  const { dataset, defs } = columns;

  return new DataTable(tableElement, {
    data,
    columns: [{ data: "" }, ...dataset],
    columnDefs: [
      {
        className: "control",
        searchable: false,
        orderable: false,
        responsivePriority: 2,
        targets: 0,
        render: function (data, type, row, meta) {
          return "";
        },
      },
      ...defs,
    ],
    ...dtConfig,
  });
}

const tableEventsManager = (eventsCbs = []) => {
  eventsCbs.forEach((cb) => {
    cb();
  });
};

async function refreshTable(eventCb = []) {
  if (!dt) {
    console.log("no datatable found");
    return;
  }

  const { data } = await getAdminUserList();

  dt.clear();
  dt.rows.add(data);
  dt.draw();

  tableEventsManager(eventCb);
}

Events.$onPageLoad(async () => {
  const usersTable = document.querySelector(".datatables-users");
  const { data } = await getAdminUserList();

  const columns = buildColumns(["full_name", "role", "cpf", "pin", "action"]);

  if (data) {
    dt = initializeTable(usersTable, data, columns);

    tableEventsManager(tableEvents);

    setInterval(async () => {
      await refreshTable(tableEvents);
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
      await refreshTable(tableEvents);
    });
  });
}

function handleUserDeletion(dt) {
  const deleteRecordButtons = document.querySelectorAll(".delete-record");

  deleteRecordButtons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = e.target.parentElement.id;

      await deleteUser(id).then(async () => await refreshTable(tableEvents));
    });
  });
}
