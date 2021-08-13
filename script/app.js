var saved = localStorage.getItem('items');
//// If there are any saved items, update our list
if (saved) {
    document.querySelector("#items-list").innerHTML = saved;
}

const switchItemsColor = function () {
    var item = document.querySelector(".cloned-item");
    var itemBbColor = window.getComputedStyle(item, null).getPropertyValue("background-color");
    var input = document.querySelector(".input");
    var inputBgColor = window.getComputedStyle(input, null).getPropertyValue("background-color");
    if (inputBgColor !== itemBbColor) {
        items = document.querySelectorAll(".cloned-item");
        items.forEach(item => {
            item.classList.toggle("light-todo");
            item.classList.toggle("dark-todo");
        });
    }
    checkBox = document.querySelectorAll("#add-list-checkbox");
    checkBox = checkBox;
    let i = 0;
    for (let btn of checkBox) {
        if (i != 0) {
            //var item = document.querySelector(".cloned-item");
            var btnBbColor = window.getComputedStyle(btn, null).getPropertyValue("background-color");
            if (inputBgColor !== btnBbColor) {
                btn.classList.toggle("add-list-checkbox-light");
                btn.classList.toggle("add-list-checkbox-dark");
            }
        }
        i++;
    }
}

const lighDarkModeSwitchButton = document.querySelector("#switch-light-dark");
const switchColor = function () {
    icons = document.querySelectorAll(".switch-mode");
    for (let icon of icons) {
        icon.classList.toggle("display");
        icon.classList.toggle("hidden");
    }

    header = document.querySelector("#header");
    header.classList.toggle("header-light");
    header.classList.toggle("header-dark");

    main = document.querySelector("main");
    main.classList.toggle("light-background");
    main.classList.toggle("dark-background");

    input = document.querySelector(".input");
    input.classList.toggle("light-todo");
    input.classList.toggle("dark-todo");

    splitedBar = document.querySelector(".splited-bar");
    splitedBar.classList.toggle("light-todo");
    splitedBar.classList.toggle("dark-todo");

    items = document.querySelectorAll(".item");
    items.forEach(item => {
        item.classList.toggle("light-todo");
        item.classList.toggle("dark-todo");
    });
    checkBox = document.querySelectorAll("#add-list-checkbox");
    for (let btn of checkBox) {
        btn.classList.toggle("add-list-checkbox-light");
        btn.classList.toggle("add-list-checkbox-dark");
    }

    button = document.querySelectorAll(".action-btn");
    for (let btn of button) {
        btn.classList.toggle("action-btn-light");
        btn.classList.toggle("action-btn-dark");
    }
    //fix dark mode 
    actionBar = document.querySelector(".actions");
    actionBar.classList.toggle("light-todo");
    actionBar.classList.toggle("dark-todo");

    ///save color mode
    const inputColor = document.querySelector('.input');
    localStorage.setItem('inputColor', window.getComputedStyle(inputColor, null).getPropertyValue('background-color'));
};


let savedInputColor = localStorage.getItem('inputColor');

if (savedInputColor) {
    input = document.querySelector('.input');
    currentInputColor = window.getComputedStyle(input, null).getPropertyValue('background-color');
    if (savedInputColor !== currentInputColor) {
        switchColor();
    }

    clonedItems = document.querySelector('.cloned-item');
    if (clonedItems) {
        clonedItemsColor = window.getComputedStyle(clonedItems, null).getPropertyValue('background-color');
        input = document.querySelector('.input');
        currentInputColor = window.getComputedStyle(input, null).getPropertyValue('background-color');
        console.log(currentInputColor, clonedItemsColor)
        if (currentInputColor !== clonedItemsColor) {
            console.log("switch");
            switchItemsColor();
        }
    }
}

lighDarkModeSwitchButton.addEventListener('click', switchColor);

const createNewItem = function (newTodoContent) {
    const nodeToclone = document.querySelector("#item");
    const clone = nodeToclone.cloneNode(true);
    clone.style.display = "flex";
    let content = clone.childNodes[1];
    content = content.childNodes[3];
    content.innerHTML = newTodoContent;
    clone.classList.add("cloned-item");
    const itemsList = document.querySelector("#items-list");
    itemsList.prepend(clone);
};

const form = document.querySelector("form");
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const newTodoContent = form.elements['new-todo'];
    if (newTodoContent.value != '') {
        createNewItem(newTodoContent.value);
        updateItems();
        newTodoContent.value = '';
        saveItems();
    }
});


const updateItems = () => {
    btnCheckBoxs = document.querySelectorAll("#add-list-checkbox");
    btnCheckBoxs.forEach(btn => {
        btn.addEventListener('click', function () {
            btn.classList.add("check-box-clicked");
            btn.childNodes[1].classList.remove("hidden");
            btn.disabled = true;
            btn.classList.remove("add-list-checkbox-light");
            btn.classList.remove("add-list-checkbox-dark");
            content = btn.nextElementSibling;
            content.classList.add("completed");
            /// add items to  item-list
            parent = btn.parentElement.parentElement;
            parent.classList.add("completed");
            console.log(parent);
            updateItems();
            saveItems();
        })
    });
    crossButtons = document.querySelectorAll(".cross-btn");
    crossButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            parentElement = btn.parentElement;
            parentElement.remove();
            /// save items list localy
            saveItems();
        })
    });
    /// save items list localy
    saveItems();
};
const saveItems = function () {
    localStorage.setItem('items', document.querySelector("#items-list").innerHTML);
}
updateItems();



/// action buttons
let itemsList = localStorage.getItem('items');

const allBtn = document.querySelectorAll('#all');
allBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        itemslistParent = document.querySelector("#items-list");
        itemslistParent.innerHTML = '';
        itemsList = localStorage.getItem('items');
        if (itemsList) {
            itemslistParent.innerHTML = itemsList;
            updateItems();
        }
        btn.classList.add('selected');
        let activeBtn = document.querySelectorAll('#active');
        activeBtn.forEach(btn => {
            btn.classList.remove('selected');
        });
        let completedBtn = document.querySelectorAll('#completed');
        completedBtn.forEach(btn => {
            btn.classList.remove('selected');
        });
    })
});

const activeBtn = document.querySelectorAll('#active');
activeBtn.forEach(btn => {
    btn.addEventListener('click', () => {

        itemslistParent = document.querySelector("#items-list");
        itemslistParent.innerHTML = '';
        itemsList = localStorage.getItem('items');
        if (itemsList) {
            itemslistParent.innerHTML = itemsList;
            updateItems();
        }
        itemslistParent = document.querySelector("#items-list");
        itemsList = document.querySelectorAll(".cloned-item");

        itemsList.forEach(item => {
            complited = false
            classList = item.classList;
            classList.forEach(cl => {
                if (cl === 'completed') {
                    complited = true;
                }
            });
            if (complited)
                item.style.display = 'none';
            else {
                item.style.disabled = 'block';
            }
        });

        btn.classList.add('selected');
        let allBtn = document.querySelectorAll('#all');
        allBtn.forEach(btn => {
            btn.classList.remove('selected');
        });
        let completedBtn = document.querySelectorAll('#completed');
        completedBtn.forEach(btn => {
            btn.classList.remove('selected');
        });
    })
})

const completedBtn = document.querySelectorAll('#completed');
completedBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        itemslistParent = document.querySelector("#items-list");
        itemslistParent.innerHTML = '';
        itemsList = localStorage.getItem('items');
        if (itemsList) {
            itemslistParent.innerHTML = itemsList;
            updateItems();
        }
        itemslistParent = document.querySelector("#items-list");
        itemsList = document.querySelectorAll(".cloned-item");

        itemsList.forEach(item => {
            complited = false
            classList = item.classList;
            classList.forEach(cl => {
                if (cl === 'completed') {
                    complited = true;
                }
            });
            if (!complited)
                item.style.display = 'none';
            else {
                item.style.disabled = 'block';
            }
        });

        btn.classList.add('selected');
        let allBtn = document.querySelectorAll('#all');
        allBtn.forEach(btn => {
            btn.classList.remove('selected');
        });
        let activeBtn = document.querySelectorAll('#active');
        activeBtn.forEach(btn => {
            btn.classList.remove('selected');
        });
    })
})

// clear completed todo

const clearCompletedBtn = document.querySelector('#clear-completed');
clearCompletedBtn.addEventListener('click', () => {
    itemslistParent = document.querySelector("#items-list");
    itemslistParent.innerHTML = '';
    itemsList = localStorage.getItem('items');
    if (itemsList) {
        itemslistParent.innerHTML = itemsList;
        updateItems();
    }
    itemslistParent = document.querySelector("#items-list");
    itemsList = document.querySelectorAll(".cloned-item");
    itemsList.forEach(item => {
        complited = false
        classList = item.classList;
        classList.forEach(cl => {
            if (cl === 'completed') {
                complited = true;
            }
        });
        if (complited) {
            //delete completed todo
            item.remove();
            updateItems();
            saveItems();
        }
    });
})


///save color mode
const inputColor = document.querySelector('.input');
localStorage.setItem('inputColor', window.getComputedStyle(inputColor, null).getPropertyValue('background-color'));