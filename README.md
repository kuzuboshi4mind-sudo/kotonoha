# 言の葉帖 — 更新マニュアル

詩・短歌・手描きの絵・文集を置くためのサイトです。
**作品1つ ＝ テキストファイル1つ。** ファイルを追加するだけでサイトに反映されます。
GitHub のウェブ画面（スマホでも可）だけで更新できます。

---

## 作品を追加する（いちばんよく使う手順）

1. GitHub でこのリポジトリを開き、`_posts` フォルダに入る
2. 右上の **Add file → Create new file**
3. ファイル名を `日付-英数字の名前.md` にする
   例：`2026-10-08-hatsuyuki.md`
   - 日付が作品の日付になり、新しい順に並びます
   - 名前の部分は URL になるので **英数字とハイフン** で（ローマ字でOK）
4. `_templates` フォルダから、ジャンルに合ったひな形の中身をコピーして貼り付け、書き換える
5. 下の **Commit changes** を押す → 1〜2分でサイトに反映

### ひな形（_templates フォルダ）

| ファイル | ジャンル | 表示 |
|---|---|---|
| `詩.md` | 詩 | 横書き（縦書きにも切替可） |
| `短歌.md` | 短歌 | 縦書き（横書きにも切替可） |
| `絵.md` | 絵 | 画像を大きく表示・クリックで拡大 |
| `文集.md` | 文集 | 横書き・段落の頭を一字下げ |

### 書き方のきまり

```
---
title: 作品のタイトル
genre: poem        ← poem / tanka / illust / essay のどれか
---

ここから本文
```

- 上下の `---` で囲んだ部分が「設定」、その下が本文です
- **改行はそのまま改行** として表示されます
- **空行** を入れると連（段落）が分かれます
- 本文中に `---` だけの行を書くと、場面転換の「＊」になります
- 任意の設定：
  - `vertical: true` … この作品だけ縦書き（`false` で横書き）
  - `note: 一言` … 作品の下に「あとがき」として小さく表示
  - `image: /assets/images/works/ファイル名.jpg` … 画像を添える（絵以外のジャンルでも使えます）

---

## 絵（画像）を載せる

1. `assets/images/works` フォルダを開き、**Add file → Upload files** で画像をアップロード
   - ファイル名は英数字に（例：`neko-02.jpg`）
   - スキャンやスマホ写真は、長辺 2000px 前後・1〜2MB 以下に縮小しておくと表示が速くなります
2. `_posts` に作品ファイルを作り、`image:` にそのパスを書く
   ```
   ---
   title: 猫と月
   genre: illust
   image: /assets/images/works/neko-02.jpg
   ---
   鉛筆と水彩。
   ```

---

## 作品を直す・消す

- **直す**：`_posts` の該当ファイルを開き、鉛筆アイコン（Edit）で編集 → Commit
- **消す**：ファイルを開き、「…」メニュー → Delete file
- **一時的に非公開**：設定に `published: false` を足す

---

## ジャンルを増やす

例：「俳句」を追加する場合

1. `_data/genres.yml` の末尾に追記
   ```yaml
   - slug: haiku
     name: 俳句
     en: Haiku
     description: 十七音。
     vertical: true
   ```
2. `genres` フォルダに `haiku.md` を作り、次の内容を書く
   ```
   ---
   layout: genre
   title: 俳句
   genre: haiku
   permalink: /haiku/
   ---
   ```
3. 作品ファイルで `genre: haiku` と書けば、そのジャンルに入ります

メニューやトップページのジャンル一覧には自動で追加されます。
ジャンル名を変えたいとき（例：「絵」→「イラスト」）は `genres.yml` の `name` を変えるだけです。

---

## サイト名・自己紹介などを変える

| 変えたいもの | ファイル |
|---|---|
| サイト名・副題・作者名・SNSリンク | `_config.yml` |
| 「この場所について」ページ | `about.md` |
| 色・文字の大きさ | `assets/css/style.css` の先頭（`:root` の部分） |

---

## 公開のしかた（最初の1回だけ）

1. このフォルダを GitHub のリポジトリにアップロード
2. リポジトリの **Settings → Pages** を開く
3. **Source: Deploy from a branch**、Branch: `main` / `/ (root)` を選んで Save
4. 数分後、`https://ユーザー名.github.io/リポジトリ名/` で公開されます
5. このとき `_config.yml` の `baseurl` を `"/リポジトリ名"` に変更してください
   （独自ドメインを使う場合や、リポジトリ名が `ユーザー名.github.io` の場合は `""` のまま）

## （任意）手元のパソコンでプレビュー

Ruby が入っていれば：

```
bundle install
bundle exec jekyll serve
```

→ http://localhost:4000 で確認できます。

---

## フォルダの中身

```
_posts/          作品（ここにファイルを足していく）
_templates/      作品のひな形（サイトには表示されません）
_data/genres.yml ジャンルの一覧
genres/          ジャンルごとの一覧ページ
assets/images/works/  作品の画像
about.md         「この場所について」
_config.yml      サイト全体の設定
_layouts/ _includes/ assets/css/ assets/js/  デザイン（通常さわらない）
```
