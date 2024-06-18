// 全てのコンテンツを読み込んでからこのファイルを実行
document.addEventListener("DOMContentLoaded", () => {
    // フォームのタグ情報を取得
    const form = document.getElementById("todo-form");
    // Todo入力フォームの情報を取得
    const todoInput = document.getElementById("new-todo");
    // Todoリスト情報を取得
    const todoList = document.getElementById("todo-list");

    // Local Storageへ保存されたTodoを読み込む
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.forEach(todo => addTodoElement(todo.text, todo.id));

    // 追加ボタン押下時の処理
    form.addEventListener("submit", (e) => {
        // 再読み込みを行わないようにする
        e.preventDefault();
        // Todo追加処理
        addTodo();
    });

    // Todo追加、リスト表示
    function addTodo() {
        // 入力フォームに入力した内容を取得
        const todoText = todoInput.value.trim();
        // 入力フォームがからの場合処理終了
        if (todoText === "") return;

        // 一意のIDを作成
        const todoId = Date.now();
        addTodoElement(todoText, todoId);

        // Local Storageに保存
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.push({text: todoText, id: todoId});
        localStorage.setItem("todos", JSON.stringify(todos));

        todoInput.value = "";
    }

    // 追加したTodo、編集、削除ボタン作成
    function addTodoElement(todoText, todoId) {
        const li = document.createElement("li");
        
        // 追加したTodo表示
        const span = document.createElement("span");
        span.textContent = todoText;

        // 編集、削除ボタンラップ用の変数作成
        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("buttons");

        // 編集ボタン
        const editBtn = document.createElement("button");
        editBtn.textContent = "編集";
        editBtn.classList.add("edit");
        editBtn.addEventListener("click", () => {
            editTodo(span, editBtn, buttonDiv, todoId);
        });

        // 削除ボタン
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "削除";
        deleteBtn.classList.add("delete");
        deleteBtn.addEventListener("click", () => {
            todoList.removeChild(li);

            // Local Storageから削除
            const todos = JSON.parse(localStorage.getItem("todos")) || [];
            const newTodos = todos.filter(todo => todo.id !== todoId);
            localStorage.setItem("todos", JSON.stringify(newTodos));
        });

        // 編集、削除ボタンをラップ
        buttonDiv.appendChild(editBtn);
        buttonDiv.appendChild(deleteBtn);

        // リストの中に追加したTodoと編集、削除ボタンを表示
        li.appendChild(span);
        li.appendChild(buttonDiv);
        todoList.appendChild(li);
    }

    // Todo編集
    function editTodo (span, editBtn, buttonDiv, todoId) {
        // Todoのテキストを取得
        const originalText = span.textContent;
        // 編集フォームを作成
        const input = document.createElement("input");
        input.type = "text";
        input.value = originalText;
        input.classList.add("edit-input");

        // 編集保存ボタンを作成
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "保存";
        saveBtn.classList.add("save");
        saveBtn.addEventListener("click", () => {
            const newText = input.value.trim();
            // 編集フォームが空ではない場合、Todoを上書きする
            if (newText !== "") {
                span.textContent = newText;

                // Local Storageを更新
                const todos = JSON.parse(localStorage.getItem("todos")) || [];
                const newTodos = todos.map(todo => 
                    todo.id === todoId ? { text: newText, id : todoId} : todo
                );
                localStorage.setItem("todos", JSON.stringify(newTodos));
            }

            // Todoの内容と編集ボタンを再表示させる
            span.style.display = "inline";
            editBtn.style.display = "inline";
            // 編集入力フォームと保存ボタンを非表示にする
            buttonDiv.removeChild(input);
            buttonDiv.removeChild(saveBtn);
        });

        // 編集画面へ遷移する際にTodoの内容と編集ボタンを非表示にする
        span.style.display = "none";
        editBtn.style.display = "none";
        // 編集入力フォームと保存ボタンを表示する
        buttonDiv.insertBefore(input, editBtn);
        buttonDiv.insertBefore(saveBtn, editBtn);
    }
});