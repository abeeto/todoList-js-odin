export default function renderElement({elementTagName, innerText, classList, clickEventCallBack}) {
    const element = document.createElement(elementTagName);
    if (innerText){
        element.innerText = innerText;
    }
    if (classList){
        element.classList.add(...classList);
    }
    if (eventListenerFn) {
        element.addEventListener("click", eventListenerFn);
    }
    return element;
}
