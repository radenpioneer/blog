---
title: "Next.JS: React ternyata tidak 'sesusah' itu"
date: 2021-01-28T09:11:32.123Z
tags:
  - tech
  - web
image: "https://source.unsplash.com/OqtafYT5kTw/3840x2160"
---
Belakangan ini mencoba lagi hal-hal baru di JAMstack. Sebenarnya sejak beberapa bulan yang lalu ingin sedikit bermain-main dengan *front-end framework* berbasis JS, seperti Vue. Tapi cuma belajar dari dokumentasi ofisial kok kayaknya susah banget ya.

Nah baru-baru ini menjajal kemampuan [Next.JS](https://nextjs.org/), framework berbasis React/JSX. Dari dulu pingin bermain-main dengan framework semacam ini karena kecepatannya dan kalau dalam persepsi *user-interface* lebih mendekati aplikasi *native*. Apalagi selama ini sudah membuat aplikasi PWA. Sehingga dapat mengurangi batasan yang selama ini kalau menggunakan vanilla HTML + AMP.

Saya menggunakan project lama saya yang saat ini masih ongoing -- website [DPC PKS Mentawa Baru Ketapang](https://pksmbketapang.org/) -- yang memang saya ingin redesign. 

![Website DPC PKS MB Ketapang berbasis Next.JS](/assets/img/uploads/pksmbketapang.png "Website DPC PKS MB Ketapang berbasis Next.JS")

Setelah menggunakan NextJS ternyata React tidak sesulit yang saya rasakan selama ini. Bahkan lebih mudah dipahami berkat dokumentasinya yang mudah dipahami. Dalam hanya waktu sekitar 3 hari saya berhasil mentransformasikan project yang sebelumnya menggunakan Eleventy + AMP + Basscss, menjadi berbasis NextJS. Namun bagaimanapun proses perubahan itu mengharuskan saya untuk menghapus semua kode untuk kemudian digantikan dengan kode-kode NextJS.

Sementara ini project tersebut sudah saya *deploy* dalam mode *branch deploy*, dan belum saya gabungkan ke *main branch*. Karena belum semua fitur terselesaikan sebagaimana permintaan. Namun project tersebut dapat dicek di link ini: [dev.pksmbketapang.org](https://dev.pksmbketapang.org)