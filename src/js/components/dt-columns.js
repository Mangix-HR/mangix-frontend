const colsMap = [
  {
    column: "full_name",
    def: renderAvatar,
  },
  {
    column: "cpf",
    def: renderCPF,
  },
  {
    column: "role",
    def: renderRole,
  },
  {
    column: "pin",
    def: renderPin,
  },
  {
    column: "action",
    def: renderActionButtons,
  },
];

export function buildColumns(cols) {
  return colsMap.reduce((acc, map) => {
    if (!acc.dataset) {
      acc.dataset = [];
    }

    if (!acc.defs) {
      acc.defs = [];
    }

    cols.forEach((c, index) => {
      if (c === map.column) {
        acc.dataset.push({
          data: map.column,
        });

        acc.defs.push(map.def(index + 1));
      }
    });

    return acc;
  }, {});
}

// buildColumns(["full_name", "cpf"]);

function renderAvatar(pos) {
  return {
    targets: pos,
    responsivePriority: 4,
    render: function (data, type, row, meta) {
      const fullName = row.full_name ?? "John Doe";
      const avatar = row.avatar;

      let avatarHtml = "";

      if (avatar) {
        avatarHtml = `<img src="/src/assets/img/avatars/${avatar}" alt="Avatar" class="rounded-circle">`;
      } else {
        const initials = (fullName.match(/\b\w/g) || []).shift() || "";
        avatarHtml = `<span class="avatar-initial rounded-circle bg-label-${
          [
            "success",
            "danger",
            "warning",
            "info",
            "dark",
            "primary",
            "secondary",
          ][Math.floor(6 * Math.random())]
        }">${initials.toUpperCase()}</span>`;
      }

      return `
      <div class="d-flex justify-content-start align-items-center user-name">
        <div class="avatar-wrapper">
          <div class="avatar avatar-sm me-3">
            ${avatarHtml}
          </div>
        </div>
        <div class="d-flex flex-column">
          <a href="${"#"}" class="text-body text-truncate">
            <span class="fw-medium">${fullName}</span>
          </a>
        </div>
      </div>
    `;
    },
  };
}

function renderRole(pos) {
  return {
    targets: pos,
    render: function (data, type, row, meta) {
      const role = row.role;
      return `
      <span class='text-truncate d-flex align-items-center'>
        ${
          {
            COLABORADOR: `<span class="badge badge-center rounded-pill bg-label-warning w-px-30 h-px-30 me-2"><i class="bx bx-user bx-xs"></i></span>`,
            ADMIN: `<span class="badge badge-center rounded-pill bg-label-secondary w-px-30 h-px-30 me-2"><i class="bx bx-mobile-alt bx-xs"></i></span>`,
          }[role]
        }
        ${role}
      </span>`;
    },
  };
}

function renderCPF(pos) {
  return {
    targets: pos,
    render: function (data, type, row, meta) {
      const cpf = row.cpf ?? "No CPF Registered";

      return `
     <span class='text-truncate d-flex align-items-center'>
      <span class="fw-medium ">${cpf}</span>
    </span>`;
    },
  };
}

function renderPin(pos) {
  return {
    targets: pos,
    render: function (data, type, row, meta) {
      const pin = row.pin ?? "No Pin registered...";

      return `
  <span class='text-truncate d-flex align-items-center'>
    <span class="fw-medium ">${pin}</span> 
  </span>`;
    },
  };
}

function renderActionButtons() {
  return {
    targets: -1,
    title: "Actions",
    searchable: false,
    orderable: false,
    render: function (data, type, row, meta) {
      return `
      <div class="d-inline-block text-nowrap" id="${row.id}">
        <button class="btn btn-sm btn-icon"><i class="bx bx-edit"></i></button>
        <button class="btn btn-sm btn-icon delete-record"><i class="bx bx-trash disable-click"></i></button>
        <button class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded me-2"></i></button>
        <div class="dropdown-menu dropdown-menu-end m-0">
          <a href="${"#"}" class="dropdown-item">View</a>
          <a href="javascript:;" class="dropdown-item">Suspend</a>
        </div>
      </div>
    `;
    },
  };
}

// Buttons

export const dtConfig = {
  order: [[1, "asc"]],
  dom: '<"row mx-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
  language: {
    sLengthMenu: "_MENU_",
    search: "",
    searchPlaceholder: "Pesquisa ",
  },

  buttons: [
    {
      extend: "collection",
      className: "btn btn-label-secondary dropdown-toggle mx-3",
      text: '<i class="bx bx-export me-1"></i>Export',
      buttons: [
        {
          extend: "csv",
          text: '<i class="bx bx-file me-2" ></i>Csv',
          className: "dropdown-item",
          exportOptions: {
            columns: [1, 2, 3, 4, 5],
            format: {
              body: function (data, row, column, node) {
                let formattedData = "";
                if (data.length > 0) {
                  const parsedHtml = $.parseHTML(data);
                  formattedData = $.map(parsedHtml, function (element) {
                    if (
                      element.classList &&
                      element.classList.contains("user-name")
                    ) {
                      return element.lastChild.firstChild.textContent;
                    } else if (element.innerText) {
                      return element.innerText;
                    } else {
                      return element.textContent;
                    }
                  }).join("");
                }
                return formattedData;
              },
            },
          },
        },
        {
          extend: "excel",
          text: '<i class="bx bxs-file-export me-2"></i>Excel',
          className: "dropdown-item",
          exportOptions: {
            columns: [1, 2, 3, 4, 5],
            format: {
              body: function (data, row, column, node) {
                let formattedData = "";
                if (data.length > 0) {
                  const parsedHtml = $.parseHTML(data);
                  formattedData = $.map(parsedHtml, function (element) {
                    if (
                      element.classList &&
                      element.classList.contains("user-name")
                    ) {
                      return element.lastChild.firstChild.textContent;
                    } else if (element.innerText) {
                      return element.innerText;
                    } else {
                      return element.textContent;
                    }
                  }).join("");
                }
                return formattedData;
              },
            },
          },
        },
        {
          extend: "pdf",
          text: '<i class="bx bxs-file-pdf me-2"></i>Pdf',
          className: "dropdown-item",
          exportOptions: {
            columns: [1, 2, 3, 4, 5],
            format: {
              body: function (data, row, column, node) {
                let formattedData = "";
                if (data.length > 0) {
                  const parsedHtml = $.parseHTML(data);
                  formattedData = $.map(parsedHtml, function (element) {
                    if (
                      element.classList &&
                      element.classList.contains("user-name")
                    ) {
                      return element.lastChild.firstChild.textContent;
                    } else if (element.innerText) {
                      return element.innerText;
                    } else {
                      return element.textContent;
                    }
                  }).join("");
                }
                return formattedData;
              },
            },
          },
        },
        {
          extend: "copy",
          text: '<i class="bx bx-copy me-2" ></i>Copy',
          className: "dropdown-item",
          exportOptions: {
            columns: [1, 2, 3, 4, 5],
            format: {
              body: function (data, row, column, node) {
                let formattedData = "";
                if (data.length > 0) {
                  const parsedHtml = $.parseHTML(data);
                  formattedData = $.map(parsedHtml, function (element) {
                    if (
                      element.classList &&
                      element.classList.contains("user-name")
                    ) {
                      return element.lastChild.firstChild.textContent;
                    } else if (element.innerText) {
                      return element.innerText;
                    } else {
                      return element.textContent;
                    }
                  }).join("");
                }
                return formattedData;
              },
            },
          },
        },
      ],
    },
    {
      text: '<i class="bx bx-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add New User</span>',
      className: "add-new btn btn-primary",
      attr: {
        "data-bs-toggle": "offcanvas",
        "data-bs-target": "#offcanvasAddUser",
      },
    },
  ],
  responsive: {
    details: {
      display: $.fn.dataTable.Responsive.display.modal({
        header: function (row) {
          return "Details of " + row.data().full_name;
        },
      }),
      type: "column",
      renderer: function (api, rowIdx, columns) {
        const rowData = $.map(columns, function (column, index) {
          if (column.title !== "") {
            return `<tr data-dt-row="${column.rowIndex}" data-dt-column="${column.columnIndex}">
                          <td>${column.title}:</td> <td>${column.data}</td>
                        </tr>`;
          } else {
            return "";
          }
        }).join("");
        return rowData
          ? $('<table class="table"/><tbody />').append(rowData)
          : false;
      },
    },
  },
  initComplete: function () {
    this.api()
      .columns(3)
      .every(function () {
        const column = this;
        const select = $("#UserRole");

        column
          .data()
          .unique()
          .sort()
          .each(function (value, index) {
            select.append(`<option value="${value}">${value}</option>`);
          });
        select.appendTo(".user_role").on("change", function () {
          const value = $.fn.dataTable.util.escapeRegex($(this).val());

          column.search(value, true, false).draw();
        });
      });

    this.api()
      .columns(3)
      .every(function () {
        const column = this;
        const select = $("#UserRoleCreate");

        column
          .data()
          .unique()
          .sort()
          .each(function (value, index) {
            select.append(`<option value="${value}">${value}</option>`);
          });

        select.appendTo(".user_role_create");
      });
  },
};
