# FF14 Character Card Generator

FFXIV（ファイナルファンタジーXIV）のキャラクター紹介カードを作成できる、ブラウザ完結型のWebツールです。
スクリーンショットのアップロード、ジョブ選択、プレイスタイルやアクティブ時間の設定ができ、好みのテーマとフォントでカードをカスタマイズして画像として保存できます。

## 🌟 特徴
- **全面背景と磨りガラスオーバーレイ**: アップロードしたスクリーンショットをカード全体に敷き、右側の情報エリアを磨りガラス風に透けさせます。
- **直感的な画像調整**: マウスやタッチ操作でのドラッグ（移動）＆スクロールでのズーム（拡大・縮小）に対応。
- **豊富なカスタマイズ**: 6種類のテーマカラー、4種類の装飾枠（Gothic, Neon, Cyberなど）、6種類の厳選フォントを搭載。
- **レイアウト反転機能**: 情報パネルを「右側」または「左側」に変更可能。
- **アクティブ時間表示**: 24時間表記でアクティブな時間帯を表示。
- **高画質ダウンロード**: html2canvasを使用し、SNSシェアに最適なシャープで高品質なPNG画像を生成します。

## 🚀 使い方
1. キャラクター名を入力します。
2. 所属データセンター・ワールドを選択します。
3. アクティブ時間を選択します。
4. キャラクター画像をアップロードし、カード上でドラッグ＆ズームして位置を調整します。
5. 所有ジョブ（クリックでメインジョブ設定）とプレイスタイルを選択します。
6. お好みのテーマ、装飾、フォント、パネル位置を選択します。
7. 「Save Card as Image」ボタンを押すと、高画質なカード画像がダウンロードされます。

---

## 🛠️ GitHub Pages での公開手順

このプロジェクトはHTML/CSS/JSのみの静的サイトであるため、GitHub Pagesを使って**数クリックで無料公開**できます。

### 1. GitHubリポジトリを作成する
1. [GitHub](https://github.com/) にログインします（アカウントがない場合は作成してください）。
2. 右上の「**+**」アイコンから「**New repository**」をクリックします。
3. リポジトリ名（例: `ff14-card-generator`）を入力し、公開設定を **Public** にして、「**Create repository**」ボタンを押します。

### 2. コードをプッシュする
ローカルのターミナル（またはGitクライアント）を使い、作成したGitHubリポジトリへコードをアップロードします。

```bash
# 1. プロジェクトフォルダに移動
cd /Users/yamakadokyouko/.gemini/antigravity-ide/scratch/ff14-card-generator

# 2. Gitを初期化
git init

# 3. ファイルをステージングに追加
git add .

# 4. 初回コミットを作成
git commit -m "Initial commit: FF14 Card Generator setup"

# 5. メインブランチ名を main に変更
git branch -M main

# 6. リモートリポジトリ（GitHub）の登録
# (※ username と ff14-card-generator の部分はGitHub上に表示されたURLに置き換えてください)
git remote add origin https://github.com/[あなたのGitHubユーザー名]/ff14-card-generator.git

# 7. GitHubへプッシュ
git push -u origin main
```

### 3. GitHub Pages を有効化する
1. GitHub上のリポジトリページを開きます。
2. 上部タブの「⚙️ **Settings**」をクリックします。
3. 左側メニューから「**Pages**」を選択します。
4. **Build and deployment** セクションの **Branch** から `None` を `main` (もしくは `/ (root)`) に変更し、「**Save**」をクリックします。
5. 数分待つと、画面上部に公開されたサイトのURL（例: `https://[ユーザー名].github.io/ff14-card-generator/`）が表示されます！

---

## 📝 ライセンス
本ツールは非商用のファン作成ツールです。
本ツールに使用されている画像やロゴ、ゲーム内の設定等に関するすべての権利は、株式会社スクウェア・エニックスに帰属します。
© SQUARE ENIX CO., LTD. All Rights Reserved.
