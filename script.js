// ナビのリンクをすべて取得
const navLinks = document.querySelectorAll(".nav a");

// ナビをクリックしたときの処理
navLinks.forEach(link => {
  link.addEventListener("click", () => {

    // すべてのタブから選択状態を外す
    navLinks.forEach(item => {
      item.classList.remove("active");
    });

    // クリックしたタブを選択状態にする
    link.classList.add("active");
  });
});

/*============================================================*/

