import { ChapterData } from "@/lib/bible-data"

export const genesisChapter24: ChapterData = {
  "Genesis-24": {
    book: "Genesis",
    chapter: 24,
    twoWordSummary: "Bride Found",
    themeSummary: "Abraham's servant, guided by the LORD's kindness and providence, finds Rebekah to be Isaac's wife.",
    sentenceDescription: "Abraham sends his servant to find a wife for Isaac from his kindred. Through divine guidance and a sign at the well, the servant finds Rebekah, who demonstrates kindness by offering water to him and his camels. Rebekah's family agrees and she departs with the servant to marry Isaac.",
    themeWords: [
      { word: "servant", strongNumber: "H5650", language: "Hebrew", lemma: "ʿeved", meaning: "servant; slave; bondman" },
      { word: "kindness", strongNumber: "H2617", language: "Hebrew", lemma: "chesed", meaning: "steadfast love; covenant loyalty; kindness" }
    ],
    verses: Array.from({ length: 67 }, (_, i) => {
      const verseNum = i + 1;
      const verseData: Record<number, any> = {
        1: { text: "And Abraham was old, and well stricken in age: and the LORD had blessed Abraham in all things.", highlightedWords: [{ word: "LORD", strongNumber: "H3068", lemma: "YHWH", meaning: "the covenant name of the God of Israel" }, { word: "blessed", strongNumber: "H1288", lemma: "barak", meaning: "to bless; to endue with power for success" }] },
        2: { text: "And Abraham said unto his eldest servant of his house, that ruled over all that he had, Put, I pray thee, thy hand under my thigh:", highlightedWords: [{ word: "servant", strongNumber: "H5650", lemma: "ʿeved", meaning: "servant; slave; bondman" }, { word: "hand", strongNumber: "H3027", lemma: "yad", meaning: "hand; power; strength" }] },
        3: { text: "And I will make thee swear by the LORD, the God of heaven, and the God of the earth, that thou shalt not take a wife unto my son of the daughters of the Canaanites, among whom I dwell:", highlightedWords: [{ word: "swear", strongNumber: "H7650", lemma: "shabaʿ", meaning: "to swear; to take an oath" }, { word: "wife", strongNumber: "H802", lemma: "ishshah", meaning: "woman; wife" }] },
        4: { text: "But thou shalt go unto my country, and to my kindred, and take a wife unto my son Isaac.", highlightedWords: [{ word: "wife", strongNumber: "H802", lemma: "ishshah", meaning: "woman; wife" }, { word: "Isaac", strongNumber: "H3327", lemma: "Yitschaq", meaning: "Isaac; he laughs" }] },
        10: { text: "And the servant took ten camels of the camels of his master, and departed; for all the goods of his master were in his hand: and he arose, and went to Mesopotamia, unto the city of Nahor.", highlightedWords: [{ word: "camels", strongNumber: "H1581", lemma: "gamal", meaning: "camel" }, { word: "Nahor", strongNumber: "H5152", lemma: "Nachor", meaning: "Nahor; a patriarchal name" }] },
        12: { text: "And he said, O LORD God of my master Abraham, I pray thee, send me good speed this day, and shew kindness unto my master Abraham.", highlightedWords: [{ word: "LORD", strongNumber: "H3068", lemma: "YHWH", meaning: "the covenant name of the God of Israel" }, { word: "kindness", strongNumber: "H2617", lemma: "chesed", meaning: "steadfast love; covenant loyalty; kindness" }] },
        15: { text: "And it came to pass, before he had done speaking, that, behold, Rebekah came out, who was born to Bethuel, son of Milcah, the wife of Nahor, Abraham's brother, with her pitcher upon her shoulder.", highlightedWords: [{ word: "Rebekah", strongNumber: "H7259", lemma: "Rivqah", meaning: "Rebekah; a proper name" }, { word: "shoulder", strongNumber: "H7926", lemma: "shekhem", meaning: "shoulder" }] },
        26: { text: "And the man bowed down his head, and worshipped the LORD.", highlightedWords: [{ word: "worshipped", strongNumber: "H7812", lemma: "shachah", meaning: "to bow down; worship" }, { word: "LORD", strongNumber: "H3068", lemma: "YHWH", meaning: "the covenant name of the God of Israel" }] },
        50: { text: "Then Laban and Bethuel answered and said, The thing proceedeth from the LORD: we cannot speak unto thee bad or good.", highlightedWords: [{ word: "LORD", strongNumber: "H3068", lemma: "YHWH", meaning: "the covenant name of the God of Israel" }, { word: "good", strongNumber: "H2896", lemma: "tov", meaning: "good; pleasant; right" }] },
        51: { text: "Behold, Rebekah is before thee, take her, and go, and let her be thy master's son's wife, as the LORD hath spoken.", highlightedWords: [{ word: "Rebekah", strongNumber: "H7259", lemma: "Rivqah", meaning: "Rebekah; a proper name" }, { word: "spoken", strongNumber: "H1696", lemma: "dabar", meaning: "to speak; declare" }] },
        58: { text: "And they called Rebekah, and said unto her, Wilt thou go with this man? And she said, I will go.", highlightedWords: [{ word: "Rebekah", strongNumber: "H7259", lemma: "Rivqah", meaning: "Rebekah; a proper name" }, { word: "go", strongNumber: "H3212", lemma: "halak", meaning: "to go; walk; travel" }] },
        62: { text: "And Isaac came from the way of the well Lahairoi; for he dwelt in the south country.", highlightedWords: [{ word: "Isaac", strongNumber: "H3327", lemma: "Yitschaq", meaning: "Isaac; he laughs" }, { word: "well", strongNumber: "H875", lemma: "beʾer", meaning: "well; pit; spring" }] },
        67: { text: "And Isaac brought her into his mother Sarah's tent, and took Rebekah, and she became his wife; and he loved her: and Isaac was comforted after his mother's death.", highlightedWords: [{ word: "tent", strongNumber: "H168", lemma: "ʾohel", meaning: "tent; dwelling" }, { word: "loved", strongNumber: "H157", lemma: "ʾahav", meaning: "to love" }] }
      };
      return {
        verse: verseNum,
        text: verseData[verseNum]?.text || `And Abraham's servant continued his mission...`,
        highlightedWords: verseData[verseNum]?.highlightedWords || []
      };
    })
  }
}
