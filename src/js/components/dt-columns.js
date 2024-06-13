export const colsMap = [
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
        <button class="btn btn-sm btn-icon edit-record"><i class="bx bx-edit disable-click"></i></button>
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
