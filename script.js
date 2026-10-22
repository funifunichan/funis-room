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

/* Music：表示したい曲 */
const musicList = [
  {
    title: "Love Letter",
    artist: "アルストロメリア"
  },
  {
    title: "TsunTsun",
    artist: "23.exe"
  }
];

/* Music：Appleから曲情報を取得 */
async function loadMusic() {
  const musicItems = document.querySelectorAll(".music-item");

  for (const [index, music] of musicList.entries()) {
    const item = musicItems[index];
    if (!item) continue;

    const params = new URLSearchParams({
      term: `${music.title} ${music.artist}`,
      country: "JP",
      media: "music",
      entity: "song",
      limit: "20"
    });

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?${params}`
      );

      if (!response.ok) {
        throw new Error("取得に失敗しました");
      }

      const data = await response.json();

      /* 曲名とアーティスト名が一致する曲を探す */
      const song = data.results.find(result =>
        result.trackName.toLowerCase() === music.title.toLowerCase() &&
        result.artistName.toLowerCase() === music.artist.toLowerCase()
      );

      if (!song) {
        throw new Error("曲が見つかりませんでした");
      }

      /* ジャケット画像 */
      item.querySelector(".music-cover").src =
        song.artworkUrl100.replace("100x100bb", "600x600bb");

      /* 曲名 */
      item.querySelector(".music-title").textContent =
        song.trackName;

      /* Apple Musicへのリンク */
      item.querySelector(".music-link").href =
        song.trackViewUrl;

    } catch (error) {
      console.error(error);
      item.querySelector(".music-title").textContent =
        "曲を取得できませんでした";
    }
  }
}

/* Music：ページ読み込み後に実行 */
loadMusic();
