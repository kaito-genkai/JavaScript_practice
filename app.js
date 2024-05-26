document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const todoInput = document.getElementById("new-todo");
    const todoList = document.getElementById("todo-list");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addTodo();
    });

    // Todo追加、リスト表示
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === "") return;

        const li = document.createElement("li");
        
        // 編集入力フォームオブジェクト作成
        const span = document.createElement("span");
        span.textContent = todoText;

        // 編集、削除ボタンラップ
        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("buttons");

        // 編集ボタン
        const editBtn = document.createElement("button");
        editBtn.textContent = "編集";
        editBtn.classList.add("edit");
        editBtn.addEventListener("click", () => {
            editTodo(span, editBtn, buttonDiv);
        });

        // 削除ボタン
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "削除";
        deleteBtn.classList.add("delete");
        deleteBtn.addEventListener("click", () => {
            todoList.removeChild(li);
        });

        buttonDiv.appendChild(editBtn);
        buttonDiv.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(buttonDiv);
        todoList.appendChild(li);

        todoInput.value = "";
    }

    // Todo編集
    function editTodo (span, editBtn, buttonDiv) {
        // 編集入力フォーム
        const originalText = span.textContent;
        const input = document.createElement("input");
        input.type = "text";
        input.value = originalText;
        input.classList.add("edit-input");

        // 保存ボタン
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "保存";
        saveBtn.classList.add("save");
        saveBtn.addEventListener("click", () => {
            const newText = input.value.trim();
            if (newText !== "") {
                span.textContent = newText;
            }
            span.style.display = "inline";
            editBtn.style.display = "inline";
            buttonDiv.removeChild(input);
            buttonDiv.removeChild(saveBtn);
        });

        span.style.display = "none";
        editBtn.style.display = "none";
        buttonDiv.insertBefore(input, editBtn);
        buttonDiv.insertBefore(saveBtn, editBtn);
    }
});