import store from "../../store/store";


const validate = (inputs, formErrors, action) => {
    const handleItem = store.getters['modalStore/getHandleItem'];
    const menuItems = store.getters['menuStore/getMenuItems'];
    const findItem = findLink(inputs.link, menuItems, handleItem);
    
    if (inputs.content.length < 3) {
        formErrors.content = 'Не короче 3-х символов';
    }
    else{
        formErrors.content = '';
    }

    if (inputs.title.length < 3) {
        formErrors.title = 'Не короче 3-х символов';
    }
    else{
        formErrors.title = '';
    }

    const linkRegex = /^[\/][a-zA-Z0-9\-_\/]*$/;
    const forbiddenSymbols = /[<>:"|?*]/;
    const slashes = inputs.link.split('/').length - 1;

    if (!inputs.link.startsWith('/')) {
        formErrors.link = 'Ссылка должна начинаться с /';
    } 
    else if (!linkRegex.test(inputs.link)) {
        formErrors.link = 'Неверный формат ссылки';
    }
    else if (forbiddenSymbols.test(inputs.link)) {
        formErrors.link = 'Недопустимые символы';
    } 
    else if (!/[a-zA-Z0-9]/.test(inputs.link.slice(1))) {
        formErrors.link = 'Хотя бы один символ после /';
    }
    else if (slashes > 1) {
        formErrors.link = 'Ссылка может содержать один /';
    }
    else if(findItem){
        formErrors.link = `Ссылка занята пунктом ${findItem.title}`;
    }
    else{
        formErrors.link = '';
    }

    return formErrors;
}

function findLink(inputLink, menuItems, handleItem){
    
    const item = menuItems.find(item => item.link === inputLink && item.parent_id === handleItem.parent_id && item.id !== handleItem.id);
    
    if (item) {
        return item;
    }
    return;
}

export default validate;