---
title: 如何使用Hexo搭建博客并部署在GithubPage上
date: 2024--08--18 21:44:50
tags:
  - blog
---
## 前言

最近看见不少同学搭建了个人博客，心痒，于是折腾一个下午搭建博客。

首先，使用GithubPage和Hexo搭建博客其实十分简单，而且Hexo主题多、搭建的博客美观，但是官方文档和教程过于答辩，对于缺乏相关的知识、初次搭建博客的新手十分不友好。

于是，这里写一篇傻瓜式教程，看懂之后，10分钟就能完成搭建。

这里使用GithubAction部署，和使用`hexo deploy`一键部署相比，更适合使用Git管理。
个人起初使用`hexo deploy`一键部署的时候，总会出现一些奇奇怪怪的问题：比如莫名奇妙有的时候部署不成功，`hexo deploy`使用之前得push本地的文章修改但deploy和push都会推送一遍文章......

总而言之，这篇博客将教你怎么用GithubAction，快速把Hexo博客部署在GithubPage上

## 配置过程

1. 安装好Git、Node.js，再安装Hexo。
   > 这一阶段相对简单，网上的资料很充分。所以不再重复这些内容。
2. GitHub上创建名为usesrname.github.io的库，设置默认分支为main，设置Build and deployment Source 为GithubActions
3. 选择一个文件夹A，将该库git clone下来，得到usesrname.github.io文件夹
4. 选择一个文件夹B，使用`hexo init`初始化
5. 将文件夹B中的所有文件(包括隐藏文件)，剪切到usesrname.github.io文件夹中。
   > `hexo init` 和`git clone`都需要空文件夹，所以用这种方式搞一起。
6. 创建文件.github/workflows/pages.yml
   
文件的内容是
```
name: Pages  
  
on:  
  push:  
    branches:  
      - main # default branch  
  
jobs:  
  build:  
    runs-on: ubuntu-latest  
    steps:  
      - uses: actions/checkout@v4  
        with:  
          token: ${{ secrets.GITHUB_TOKEN }}  
          # If your repository depends on submodule, please see: https://github.com/actions/checkout  
          submodules: recursive  
      - name: Use Node.js 20  
        uses: actions/setup-node@v4  
        with:  
          # Examples: 20, 18.19, >=16.20.2, lts/Iron, lts/Hydrogen, *, latest, current, node  
          # Ref: https://github.com/actions/setup-node#supported-version-syntax  
          node-version: "20"  
      - name: Cache NPM dependencies  
        uses: actions/cache@v4  
        with:  
          path: node_modules  
          key: ${{ runner.OS }}-npm-cache  
          restore-keys: |  
            ${{ runner.OS }}-npm-cache  
      - name: Install Dependencies  
        run: npm install  
      - name: Build  
        run: npm run build  
      - name: Upload Pages artifact  
        uses: actions/upload-pages-artifact@v3  
        with:  
          path: ./public  
  deploy:  
    needs: build  
    permissions:  
      pages: write  
      id-token: write  
    environment:  
      name: github-pages  
      url: ${{ steps.deployment.outputs.page_url }}  
    runs-on: ubuntu-latest  
    steps:  
      - name: Deploy to GitHub Pages  
        id: deployment  
        uses: actions/deploy-pages@v4
```

7. 使用 `node --version` 指令检查你电脑上的 Node.js 版本。 记下主要版本（例如，`v20.y.z`, 那么主要版本是20）。使用主要版本的数字，代替pages.yml中的20.
8. `./source/_Post` 文件下,放博客文章。
   > 记不清了，也许和主题也有关。默认主题好像需要index.md，但是我在我的项目里面没找到这个文件。看别人的就行
9. 使用`git add .` ,`git commit -m message`,`git push -u origin main`，推送上去，等待GitHubAction构建完成后，就可以上(https://username.github.io/)看搭建好的博客。





## 总结

网上的教程和官方文档依托答辩，看我的博客就行。

后续可能更新Obsidian管理博客项目的内容，也可能因为懒放弃。

