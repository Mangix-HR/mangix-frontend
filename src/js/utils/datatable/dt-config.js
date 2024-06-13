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
        const roles = ["ADMIN", "COLABORADOR"];

        roles.forEach((role) => {
          select.append(`<option value="${role}">${role}</option>`);
        });

        select.appendTo(".user_role_create");
      });
  },
};
