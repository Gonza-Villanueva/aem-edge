import { buildBlock } from "../../../scripts/aem.js";

/**
 * Creates a modal dialog with the specified content and type.
 * @param {Node[]} contentNodes - The content to be displayed inside the modal.
 * @param {string} [type='default'] - The type of modal ('default' or 'slide').
 * @param {string} [position='right'] - The position for slide type modal ('left' or 'right').
 * @param {string} [title=''] - The title to be displayed in the modal header.
 * @returns {Object} An object containing the modal block, and methods to show and remove the modal.
 */
export default async function createModal(contentNodes, type = 'default', position = 'right', title = '') {
  const dialog = document.createElement("dialog");
  dialog.setAttribute("tabindex", 1);
  dialog.setAttribute("role", "dialog");

  const dialogHeader = document.createElement("div");
  dialogHeader.classList.add("modal-header");

  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.setAttribute("aria-label", "Close");
  closeButton.setAttribute("data-dismiss", "modal");
  closeButton.type = "button";
  closeButton.innerHTML = '<span class="icon icon-close"></span>';
  closeButton.addEventListener("click", () => dialog.close());
  dialogHeader.append(closeButton);

  if (title) {
    const titleElement = document.createElement("span");
    titleElement.classList.add("modal-title");
    titleElement.textContent = title;
    dialogHeader.append(titleElement);
  }

  dialog.append(dialogHeader);

  const dialogContent = document.createElement("div");
  dialogContent.classList.add("modal-content");
  dialogContent.append(...contentNodes);
  dialog.append(dialogContent);

  dialog.addEventListener("click", (event) => {
    if (event.pointerType !== "mouse") return;

    const dialogDimensions = dialog.getBoundingClientRect();
    if (
      event.clientX < dialogDimensions.left ||
      event.clientX > dialogDimensions.right ||
      event.clientY < dialogDimensions.top ||
      event.clientY > dialogDimensions.bottom
    ) {
      dialog.close();
    }
  });

  const block = buildBlock("modal", "");
  document.querySelector("main").append(block);

  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    block.remove();
  });

  block.append(dialog);

  if (type === 'slide') {
    dialog.classList.add(`slide-${position}`);
  }

  return {
    block,
    removeModal: () => dialog.close(),
    showModal: () => {
      dialog.showModal();
      setTimeout(() => {
        dialogContent.scrollTop = 0;
      }, 0);

      const observer = new MutationObserver(() => {
        const firstInput = dialogContent.querySelector("input");
        if (firstInput) {
          firstInput.focus();
          observer.disconnect();
        }
      });

      observer.observe(dialogContent, { childList: true, subtree: true });

      document.body.classList.add("modal-open");
    },
  };
}
