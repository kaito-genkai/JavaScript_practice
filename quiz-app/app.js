const quiz = [
    {
        question: "ゲーム市場、最も売れたゲーム機はどれ？",
        answers: ["ファミコン", "PS2", "Swich", "DS"],
        correct: "DS"
    }, {
        question: "ホロライブの5期生を答えよ",
        answers: ["夏色まつり", "兎田ぺこら", "風真いろは", "雪花ラミィ"],
        correct: "雪花ラミィ"
    }, {
        question: "ロータリエンジンの車を答えよ",
        answers: ["ジムニーシエラ", "Rx-8", "フェアレディZ", "ロードスター"],
        correct: "Rx-8"
    }
]

const quizLength = quiz.length;
let quizIndex = 0;
let score = 0;

const $button = document.getElementsByTagName("button");
const buttonLength = $button.length;

// クイズの問題文、選択肢
const setupQuiz = () => {
    document.getElementById("js-question").textContent = quiz[quizIndex].question;
    let buttonIndex = 0;
    while(buttonIndex < buttonLength) {
        $button[buttonIndex].textContent = quiz[quizIndex].answers[buttonIndex];
        buttonIndex++;
    }
};

setupQuiz();

// ボタンをクリックした際の正誤判定
const clickHandler = (e) => {
    if(quiz[quizIndex].correct === e.target.textContent) {
        window.alert("正解！");
        score++;
    } else {
        window.alert("不正解");
    }

    quizIndex++;

    if(quizIndex < quizLength) {
        setupQuiz();
    } else {
        window.alert("終了！あなたの正解数は" + score + "/" + quizIndex + "です！");
    }
};

let handlerIndex = 0;
while (handlerIndex < buttonLength) {
    $button[handlerIndex].addEventListener("click", (e) => {
        clickHandler(e);
    });
    handlerIndex++;
}