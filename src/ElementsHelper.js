function ElementsHelper() {
    
    const createGenericElement = ({elementTagName, innerText, classList, clickEventCallBack}) => {
        const element = document.createElement(elementTagName);
        if (innerText){
            element.innerText = innerText;
        }
        if (classList){
            element.classList.add(...classList);
        }
        if (clickEventCallBack) {
            element.addEventListener("click", clickEventCallBack);
        }
        return element;
    }
    const createInputElement = ({fieldName, inputType}) => {
        const inputNode = document.createElement("input");
        inputNode.setAttribute("type", inputType);
        inputNode.setAttribute("name", fieldName);
        inputNode.setAttribute("id", `form-${fieldName}`);
        return inputNode;
    }

    const createLabelElement = (fieldName, innerText) => {
        const labelNode = document.createElement("label");
        labelNode.setAttribute("for",  `form-${fieldName}`);
        labelNode.innerText = innerText;
        return labelNode;
    }

    return {createGenericElement, createInputElement, createLabelElement}
}
export default ElementsHelper();