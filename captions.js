/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 3.6, end: 9.6, tr: 'Bin, milyon, milyar: büyük sayılar her yerde', en: 'Thousand, million, billion: big numbers are everywhere',
      note: 'Haberlerde, haritalarda, uzay kitaplarında çok büyük sayılar görürüz. Bu sayıları nasıl okuruz?' },
    { scene: 2, start: 10.6, end: 15.6, tr: 'Ay’a uzaklık yaklaşık 384 400 km', en: 'The Moon is about 384 400 km away',
      note: 'Dünya ile Ay arasındaki uzaklık yaklaşık 384 400 kilometre. Bu altı basamaklı bir sayı.' },
    { scene: 2, start: 16.0, end: 21.0, tr: 'Sağdan üçer üçer ayır: birler ve binler bölüğü', en: 'Split into threes from the right: ones and thousands',
      note: 'Basamakları sağdan üçer üçer ayıralım. Sağdaki üç basamak birler bölüğü, soldaki üç basamak binler bölüğü.' },
    { scene: 2, start: 21.4, end: 25.8, tr: 'Üç yüz seksen dört bin dört yüz', en: 'Three hundred eighty-four thousand four hundred',
      note: 'Her bölüğü üç basamaklı bir sayı gibi okuyup bölüğün adını söyleriz: üç yüz seksen dört bin, dört yüz.' },
    { scene: 3, start: 26.6, end: 30.2, tr: 'Güneş’e uzaklık: yaklaşık 150 000 000 km', en: 'The Sun is about 150 000 000 km away',
      note: 'Dünya ile Güneş arası çok daha uzak: yaklaşık 150 000 000 kilometre. Dokuz basamak var.' },
    { scene: 3, start: 30.6, end: 34.6, tr: 'Her bölükte aynı sıra: yüz, on, bir', en: 'Every group has the same order: hundreds, tens, ones',
      note: 'Dikkat edin: her bölükte basamaklar aynı sırayla gider: yüzler, onlar, birler. Bu bir örüntü.' },
    { scene: 3, start: 35.0, end: 39.6, tr: 'Yeni bölük: milyonlar', en: 'A new group: millions',
      note: 'Binler bölüğünün soluna yeni bir bölük geldi: milyonlar bölüğü.' },
    { scene: 3, start: 40.0, end: 45.6, tr: 'Yüz elli milyon', en: 'One hundred fifty million',
      note: 'Milyonlar bölüğünde 150 var: yüz elli milyon. Diğer bölükler sıfır olduğu için okunmaz.' },
    { scene: 4, start: 46.6, end: 51.8, tr: 'Üç milyon iki yüz kırk bir bin yüz yirmi üç', en: 'Three million two hundred forty-one thousand one hundred twenty-three',
      note: '3 241 123 sayısını okuyalım: üç milyon, iki yüz kırk bir bin, yüz yirmi üç.' },
    { scene: 4, start: 56.4, end: 59.6, tr: 'Binler bölüğü 000: okunmaz!', en: 'The thousands group is 000: it isn’t read!',
      note: 'Peki 3 000 085? Binler bölüğündeki üç basamak da sıfır. Sıfır olan bölükten ve adından hiç söz etmeyiz.' },
    { scene: 4, start: 60.0, end: 63.8, tr: 'Üç milyon seksen beş', en: 'Three million eighty-five',
      note: 'Bu yüzden sayı “üç milyon seksen beş” diye okunur. “Bin” demeyiz.' },
    { scene: 5, start: 64.6, end: 69.2, tr: 'Dünya’da 8 milyardan fazla insan yaşıyor', en: 'More than 8 billion people live on Earth',
      note: 'Dünya’da sekiz milyardan fazla insan yaşıyor. Sekiz milyarı yazmak için on basamak gerekiyor.' },
    { scene: 5, start: 69.6, end: 72.0, tr: 'Yeni bölük: milyarlar', en: 'A new group: billions',
      note: 'Milyonlar bölüğünün soluna da milyarlar bölüğü geliyor.' },
    { scene: 5, start: 72.4, end: 79.6, tr: 'Her üç basamakta yeni bir bölük başlar', en: 'Every three digits a new group begins',
      note: 'Örüntüyü gördük: sağdan her üç basamakta yeni bir bölük başlıyor: birler, binler, milyonlar, milyarlar.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Üçer üçer ayır, bölüğü oku, adını söyle', en: 'Split in threes, read each group, say its name',
      note: 'Çok basamaklı bir sayıyı okumak için: sağdan üçer üçer ayır, her bölüğü üç basamaklı sayı gibi oku, sonra bölüğün adını söyle.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Artık en büyük sayıları da okuyabilirsin!', en: 'Now you can read the biggest numbers too!',
      note: 'Bu kuralla ne kadar büyük olursa olsun her sayıyı okuyabiliriz!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
