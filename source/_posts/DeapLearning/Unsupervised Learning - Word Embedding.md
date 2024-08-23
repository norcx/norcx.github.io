---
title: Unsupervised Learning - Word Embedding
date: 2024--08--23 12:49:50
tags:
  - 炼丹师渡劫飞升指北
  - unsupervised
mathjax: true
published: false
---
WordEmbedding用于把单词映射到向量中，这个向量十分合理，而且具有一些很好的性质。

![image.png](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408231256124.png)

Word Embedding是什么
- 加强版1-of-N Encoding
- 维度更多，每个维度有特定的含义
- 相同类型的词，位置接近

如何做Word Embedding呢
- Machine learn the meaning of words from reading ***a lot of documents*** without supervision
- Generating Word Vector is ***unsupervised***. 只知道输入不知道输出。![image.png](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408231304052.png)
- A word can be understood by its ***context***


How to exploit the context?
![image.png](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408231309993.png)

Predicion Based
怎么做的
![image.png](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408231313356.png)


为什么work
![image.png](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408231315955.png)

![image.png](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408231320759.png)


![image.png](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408231321519.png)
![image.png](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408231324317.png)

![image.png](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408231328439.png)

word embedding的单词的位置，似乎有某种关系
![image.png](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408231333057.png)
利用这种关系的方式
![image.png](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408231336415.png)

