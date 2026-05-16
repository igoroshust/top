function createToggle(element, attribute, value1, value2) {
    return function () {
        const current = element.getAttribute(attribute);
        const newValue = current === value1 ? value2 : value1;
        element.setAttribute(attribute, newValue);
    }
}

const img = document.getElementById('myImage');

document.getElementById('changeBtn').addEventListener('click', createToggle(img, 'src', '/developing-client-side/image-1.png', '/developing-client-side/image-2.png'))