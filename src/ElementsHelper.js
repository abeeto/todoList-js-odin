    
const createGenericElement = ({elementTagName, innerText, classList, attributesMap, clickEventCallBack}) => {
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
    if (attributesMap) {
        for (const [key, value] of Object.entries(attributesMap)) {
            element.setAttribute(key, value);
        }
    }
    return element;
}

function wrapElements({wrapperTag, wrapperClassList, elementsToWrap}) {
    const parent = document.createElement(wrapperTag)
    parent.replaceChildren(...elementsToWrap);
    if (wrapperClassList) {
        parent.classList.add(...wrapperClassList);
    }
    return parent;
}

export default {createGenericElement, wrapElements};