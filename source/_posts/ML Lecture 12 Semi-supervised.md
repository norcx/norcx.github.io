---
title: ML Lecture 12 Semi-supervised
date: 2024--08--20 01:01:52
tags:
  - 炼丹师渡劫飞升攻略
---

- Supervised learning: $\left\{\left(x^r, \hat{y}^r\right)\right\}_{r=1}^R$
    - E.g. $x^r$ : image, $\hat{y}^r$ : class labels
- Semi-supervised learning: $\left\{\left(x^r, \hat{y}^r\right)\right\}_{r=1}^R,\left\{x^u\right\}_{u=R}^{R+U}$
    - A set of unlabeled data, usually $U \gg R$
    - Transductive learning: unlabeled data is the testing data
     - Inductive learning: unlabeled data is not the testing data

> 把没有标签的数据（unlabeled data）也利用起来
> 利用unlabeled data 的feature 
> 把unlabeled data放在测试集？

- Why semi-supervised learning?
    - Collecting data is easy, but collecting "labelled" data is expensive
    - We do semi-supervised learning in our lives
    - 利用没有标签的数据学习
    - 与人类认知行为相似，需要学会没有标签的数据



Why semi-supervised learning helps?
![](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408200058264.png)
灰色的点，是没有标签的数据。这些数据，也包含了一些信息。
![](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408200058724.png)

semi-supervised learning包含一些假设，而这些假设是否符合实际就会影响模型的性能

## Semi-supervised Learning for Generative Model

## Low-density Separation Assumption

### Self Learn
假设数据直接有明显的分界线。
- Given: labelled data set $=\left\{\left(x^r, \hat{y}^r\right)\right\}_{r=1}^R$, unlabeled data set $=\left\{x^u\right\}_{u=l}^{R+U}$
- Repeat: 
    - Train model $f^*$ from labelled data set
    - Apply $f^*$ to the unlabeled data set
        - Obtain $\left\{\left(x^u, y^u\right)\right\}_{u=l}^{R+U}$ Pseudo-label
    - Remove ***a set of*** data from unlabeled data set, and add them into unlabeled data set
        - How to choose the data You can also provide a set remains open weight to each data
        - 如何加入data，有一定开放性

> 回归不能用这一招。 回归用这个方法，如何Remove ***a set of*** data？没有评价方法。如果是线性回归，也不会改变$f^{*}$

神经网络用Soft label没有用
![](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408200058376.png)

### 进阶版 Entropy-based Regularization

> 为什么用熵？概率的和不一定是1

![](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408200059468.png)

>[!question] 为什么这里以损失函数的方式引入熵？
>损失函数是用于计算参数的梯度，并更新参数的。
>影响Entropy函数的参数只有模型的参数，这样设计，不要记录unlabeled data的假的的label。***只需要专注于模型参数的更新***。十分巧妙。


### Outlook: Semi-supervised SVM
![](https://imgnorcx.oss-cn-shanghai.aliyuncs.com/img/202408200059724.png)

> find a boundary

> 穷举

> 每次加入一笔data
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

## Graph-based approach 
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

## Better Representation
Find the latent factors behind the observation

The latent factors (usually simpler)are better representations

找出本质因素

