"use strict";

document.addEventListener("DOMContentLoaded", function (e) {
  const formAccountSettings = document.querySelector("#formAccountSettings");
  const formAccountDeactivation = document.querySelector(
    "#formAccountDeactivation"
  );
  const deactivateButton = formAccountDeactivation
    ? formAccountDeactivation.querySelector(".deactivate-account")
    : null;
  const accountActivationCheckbox =
    document.querySelector("#accountActivation");

  if (formAccountSettings) {
    FormValidation.formValidation(formAccountSettings, {
      fields: {
        firstName: {
          validators: {
            notEmpty: { message: "Please enter first name" },
          },
        },
        lastName: {
          validators: { notEmpty: { message: "Please enter last name" } },
        },
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          eleValidClass: "",
          rowSelector: ".col-md-6",
        }),
        submitButton: new FormValidation.plugins.SubmitButton(),
        autoFocus: new FormValidation.plugins.AutoFocus(),
      },
      init: (e) => {
        e.on("plugins.message.placed", function (e) {
          if (e.element.parentElement.classList.contains("input-group")) {
            e.element.parentElement.insertAdjacentElement(
              "afterend",
              e.messageElement
            );
          }
        });
      },
    });
  }

  if (formAccountDeactivation) {
    FormValidation.formValidation(formAccountDeactivation, {
      fields: {
        accountActivation: {
          validators: {
            notEmpty: { message: "Please confirm you want to delete account" },
          },
        },
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          eleValidClass: "",
        }),
        submitButton: new FormValidation.plugins.SubmitButton(),
        fieldStatus: new FormValidation.plugins.FieldStatus({
          onStatusChanged: function (status) {
            if (status) {
              deactivateButton.removeAttribute("disabled");
            } else {
              deactivateButton.setAttribute("disabled", "disabled");
            }
          },
        }),
        autoFocus: new FormValidation.plugins.AutoFocus(),
      },
      init: (e) => {
        e.on("plugins.message.placed", function (e) {
          if (e.element.parentElement.classList.contains("input-group")) {
            e.element.parentElement.insertAdjacentElement(
              "afterend",
              e.messageElement
            );
          }
        });
      },
    });
  }

  if (deactivateButton) {
    deactivateButton.onclick = function () {
      if (accountActivationCheckbox.checked) {
        Swal.fire({
          text: "Are you sure you would like to deactivate your account?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          customClass: {
            confirmButton: "btn btn-primary me-2",
            cancelButton: "btn btn-label-secondary",
          },
          buttonsStyling: false,
        }).then(function (result) {
          if (result.value) {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Your file has been deleted.",
              customClass: { confirmButton: "btn btn-success" },
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              title: "Cancelled",
              text: "Deactivation Cancelled!!",
              icon: "error",
              customClass: { confirmButton: "btn btn-success" },
            });
          }
        });
      }
    };
  }

  const phoneNumberInput = document.querySelector("#phoneNumber");
  const zipCodeInput = document.querySelector("#zipCode");
  if (phoneNumberInput)
    new Cleave(phoneNumberInput, { phone: true, phoneRegionCode: "BR" });
  if (zipCodeInput) new Cleave(zipCodeInput, { delimiter: "", numeral: true });

  let uploadedAvatar = document.getElementById("uploadedAvatar");
  const fileInput = document.querySelector(".profile-file");
  const imageResetButton = document.querySelector(".profile-image-reset");
  if (uploadedAvatar) {
    const originalSrc = uploadedAvatar.src;
    fileInput.onchange = () => {
      if (fileInput.files[0])
        uploadedAvatar.src = window.URL.createObjectURL(fileInput.files[0]);
    };
    imageResetButton.onclick = () => {
      fileInput.value = "";
      uploadedAvatar.src = originalSrc;
    };
  }
});

$(function () {
  const selectElements = $(".select2");
  if (selectElements.length) {
    selectElements.each(function () {
      const selectElement = $(this);
      selectElement.wrap('<div class="position-relative"></div>');
      selectElement.select2({ dropdownParent: selectElement.parent() });
    });
  }
});
