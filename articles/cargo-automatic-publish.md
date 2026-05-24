---
title: "コマンドひとつで複数プラットフォームにrustプロジェクトをリリースする"
emoji: "🦀"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: [Rust, Homebrew, CLI]
published: true
---
# 概要
rustで作成した自作toolをコマンドいっぱつでcrates.io, homebrewにリリースできるようになったので手順を書き残しておきます。
自分は上記2つのみへのリリースですが、npmなども対応しているようです。

使用するのは下記2つ
- https://github.com/crate-ci/cargo-release
- https://github.com/axodotdev/cargo-dist

release時のコマンドとしては
```sh
cargo release {level}
```
のみです。
これで
- tag打ち
- Cargo.tomlのversion更新
- push
- cargo publishの実行
まで完了します。

また、上記のtag打ちをトリガーにしてhomebrew-patへformulaがpushされます。

以前はcargo publishの実行だけをCIで行ない他は手動でやっていたんですが、Cargo.tomlのversion更新を忘れてCIが落ちる、というのを毎回やってました。
どうにかならんかと自動化の方法を探していたら上記に出会い、その便利さに感動しました。
あまり日本語記事がないように見えたので書いておこうかなと。

# 導入手順
どちらもドキュメントがしっかりあるので、基本的にそちらを見ながらやれば問題はないかと思います。
ここでは簡単に流れだけのせておきます。

## cargo-distを導入
### 事前準備
homebrewにtapとして公開する場合、tap用のrepoを作っておく必要あります。
tapについて詳しくは[こちら](https://docs.brew.sh/Taps)
`your-repo/homebrew-{tap name}` を作るだけでOK。
中身は何も無しで良いです。
後々使うので、作成したtapへの `Contents: read, write` 権限を持つPATを作成しておいてください。

### 導入
お好みの方法でinstallしてください。
```sh
# script
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/axodotdev/cargo-dist/releases/latest/download/cargo-dist-installer.sh | sh

# homebrew
brew install axodotdev/tap/cargo-dist

# cargo binstall
cargo binstall cargo-dist
```

リリースしたいrepoで、
```sh
cargo dist init
```
いくつか聞かれるので自身に合ったものを選んでください。
依存への追加と、CI workflowとconfig用のyamlが作成されるので変更をpushしておきます。
最後にgithubの `Setting > Secrets and variables > Actions` に先程作成したPATを `HOMEBREW_TAP_TOKEN`として登録すれば、distの準備は完了です。

## cargo-releaseを導入
```sh
cargo install cargo-release
```
するだけ。
あとは

```sh
cargo release {level}
```
を実行すればOK。
上記はdry runなので、確認して問題なければ `--execute` でpublishされます。
levelにはSemVerのどのナンバーを上げるのか指定します。`[patch, minor, major]` など。

cargo releaseを実行するとtagがpushされるので、それをトリガーにcargo-distがCIで実行され、formulaのpushまで自動で行なわれます。

以上
