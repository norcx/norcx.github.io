---
title: Semi-supervised Learning
date: 2024--08--20 01:01:52
tags:
  - 炼丹师渡劫飞升指北
mathjax: true
---
## 引入

让我们回顾一下监督学习：
- Supervised learning: $\left\{\left(x^r, \hat{y}^r\right)\right\}_{r=1}^R$
    - E.g. $x^r$ : image, $\hat{y}^r$ : class labels

不知道你训练模型的时候，是否遇到这样的困扰：有label的数据集过少，训练的时候，无论怎么训练，训练集准确率90%以上了，测试集准确率却难以进一步提升。无论如何调整模型的结构或参数，模型在测试集上的准确率始终难以提升。

也许，这不是模型的结构或者参数设置的问题。可能只是数据过少的缘故。

一个可能的解决方案是，数据增强。大概率能提升模型的性能，但可能不足以解决数据过少的问题。

> 我们能不能应用没有label的数据，帮助我们改善模型的性能呢？

答案是可以的。

![](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408200058264.png)

蓝色和橙色，是有label的数据，灰色是没有label的数据。

当你看见这样一幅图的时候，你也可能和笔者一样，有这样的冲动：
![](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408200058724.png)

这么划分猫狗分类的边界线，是不是更合理呢？

可以假设，离label标签为猫的数据近的数据，更有可能是猫，同理，离label标注为狗的数据更近的数据，更有可能是狗。

如果假设成立的话，第二幅图的模型，大概能更准确地区分猫和狗之间的差异。

由此可见，如果能把unlabeled data利用起来，有可能改善模型的性能。

## 定义

- Semi-supervised learning: $\left\{\left(x^r, \hat{y}^r\right)\right\}_{r=1}^R,\left\{x^u\right\}_{u=R}^{R+U}$
    - A set of unlabeled data, usually $U \gg R$
    - Transductive learning: unlabeled data is the testing data
     - Inductive learning: unlabeled data is not the testing data

## Why semi-supervised learning?

- Collecting data is easy, but collecting "labelled" data is expensive
- 与人类的认知行为相似，我们经常猜测unlabeled data的label。






> semi-supervised learning 包含一些假设，而这些假设是否符合实际就会影响模型的性能



## Low-density Separation Assumption

### 钙版 Self Learn
假设数据直接有明显的分界线。
- Given: labelled data set $=\left\{\left(x^r, \hat{y}^r\right)\right\}_{r=1}^R$,
- unlabeled data set $=\left\{x^u\right\}_{u=l}^{R+U}$
- Repeat: 
    - Train model $f^*$ from labelled data set
    - Apply $f^*$ to the unlabeled data set
        - Obtain $\left\{\left(x^u, y^u\right)\right\}_{u=l}^{R+U}$ Pseudo-label
    - Remove ***a set of*** data from unlabeled data set, and add them into labeled data set


如何加入data，有一定开放性





### 进阶版 Entropy-based Regularization

> 为什么用熵？概率的和不一定是1

![](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408200059468.png)


$$
E(y^{u})=-\sum_{m=1}^{n}y_{m}^{u}\ln(y_{m}^{u})
$$
$$
L = \sum_{x^r}C(y^r,\hat{y}^r) + \lambda \sum_{x^u}E(y^u)
$$

第一部分$\sum_{x^r}C(y^r,\hat{y}^r)$，是有label数据的损失函数
第二部分$\sum_{x^u}E(y^u)$是没有label数据，预测结果的信息熵。
这样，有无标注的数据，我们都利用了起来，而且只需要通过梯度下降，我们就能更新模型的参数。


>[!question] 为什么这里以损失函数的方式引入熵？
>损失函数是用于计算参数的梯度，并更新参数的。
>影响Entropy函数的参数只有模型的参数，这样设计，不要记录unlabeled data的假的的label。***只需要专注于模型参数的更新***。十分巧妙。



## Smoothness Assumption
- Assumption: "similar" $x$ has the same $\hat{y}$
- More precisely:
    - x is not uniform.
    - If $x^1$ and $x^2$ are close in a high density region. $\widehat{y}^1$ and $\widehat{y}^2$ are the same. *connected by a high density path*
      
![](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408200059312.png)

$x_{2}$和$x_{3}$比较近，$x_{1}$和$x_{2}$比较远，但因为密度原因，$x_{2}$和$x_{1}$归为1类比较合理.

一个例子
![](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408200059359.png)
![](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408200059150.png)

### Graph-based approach 
- How to know $x^1$ and $x^2$ are close in a high density region (connected by a high density path)

Represented the data points as a graph
Graph representation is nature sometimes.
E.g. Hyperlink of webpages, citation of papers
![](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408200059532.png)
![](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408200100955.png)
d改为s

Gaussian Radial Basis Functions效果通常比较好，因为只有特别近的点才会连接在一起。

- Define the smoothness of the labels on the graph

$$
S=\frac{1}{2} \sum_{i, j} w_{i, j}\left(y^i-y^j\right)^2
$$
For all data (no matter labelled or not)

![](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408200059890.png)
$S=\frac{1}{2} \sum_{i, j} w_{i, j}\left(y^i-y^j\right)^2=\boldsymbol{y}^T L \boldsymbol{y}$
$\mathrm{y}:(\mathrm{R}+\mathrm{U})$-dim vector

$$
y=\left[\cdots y^i \cdots y^j \cdots\right]^T
$$

$\mathrm{L}:(\mathrm{R}+\mathrm{U}) \times(\mathrm{R}+\mathrm{U})$ matrix
Graph Laplacian

$$
L=D-W
$$
![](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408200059911.png)

W是邻接矩阵，D是把邻接矩阵每行或每列的和，加到对角线上。

$L=\sum_{x^r} C\left(y^r, \hat{y}^r\right)+\lambda S$
>S的值，依赖边的权重和标签。
>边的权重取决于特征和选取的计算方法，这里认为是固定的。
>标签取决于模型的预测，也就是模型的参数。
>故可以加入损失函数，使用梯度下降优化。

![](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408200059645.png)
smooth可以在任何地方



