// 画像・音声の置き場所(index.html からの相対パス)
const SRC = "source/";

const stage = document.getElementById("stage");
const bubble = document.getElementById("bubble");

const sounds = {
    bah: { audio: new Audio(SRC + "Bah.mp3"), text: "ﾊﾞｧｧｧｧ🦒" },
    pa: { audio: new Audio(SRC + "Pa.mp3"), text: "ﾊﾟｯｯ" },
    killYou: { audio: new Audio(SRC + "killYou.mp3"), text: "ﾌﾞﾁﾞｺﾞﾛｽｩｩｩ" },
    yeah: { audio: new Audio(SRC + "yeah.mp3"), text: "遺影" },
};
Object.values(sounds).forEach(s => (s.audio.preload = "auto"));

// 連打対応: 再生中の音の数を数え、0になったら口を閉じる
let playing = 0;

function setOpen(open) {
    stage.classList.toggle("is-open", open);
    bubble.classList.toggle("show", open);
}

// 連打時に口を閉じておく時間(ms)。長くすると閉じる動きがはっきり見える
const CLOSE_GAP = 70;

function fire(key) {
    const { audio, text } = sounds[key];
    const a = audio.cloneNode();   // 毎回新しいインスタンスなので重ねて鳴らせる
    a.currentTime = 0;

    // 押すたびに一旦口を閉じ、少し待ってから開いて再生する
    setOpen(false);
    setTimeout(() => {
        playing++;
        bubble.textContent = text;
        setOpen(true);
        a.play().catch(finish);
    }, CLOSE_GAP);

    let done = false;
    function finish() {
        if (done) return;
        done = true;
        playing = Math.max(0, playing - 1);
        if (playing === 0) setOpen(false);
    }
    a.addEventListener("ended", finish);
    a.addEventListener("error", finish);
}

document.getElementById("bahBtn").addEventListener("click", () => fire("bah"));
document.getElementById("paBtn").addEventListener("click", () => fire("pa"));
document.getElementById("killYouBtn").addEventListener("click", () => fire("killYou"));
document.getElementById("yeahBtn").addEventListener("click", () => fire("yeah"));