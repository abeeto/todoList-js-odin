import ElementsHelper from "./ElementsHelper";
import createTaskForm from "./CreateTaskForm";

const parentNode = document.createElement("div");
parentNode.classList.add("flow-y-bottom");
const formNode = createTaskForm();

let backButton = ElementsHelper.createGenericElement({
  elementTagName: "button",
  innerText: "Go Back",
  clickEventCallBack: () => {
    parentNode.replaceChildren(taskButton);
  },
});
let taskButton = ElementsHelper.createGenericElement({
  elementTagName: "div",
  innerText: "Click To Add Task",
  classList: [
    "create-task__text-style",
    "create-task__button-sizing",
    "dashed-border",
    "primary-bg",
    "flex",
    "flex-row-y-center",
    "flex-center",
    "min-height-task",
  ],
  clickEventCallBack: function () {
    const newElement = ElementsHelper.wrapElements({
      wrapperTag: "div",
      wrapperClassList: ["create-task"],
      elementsToWrap: [formNode, backButton],
    });
    parentNode.replaceChildren(newElement);
  },
});
parentNode.appendChild(taskButton);

export default parentNode;
