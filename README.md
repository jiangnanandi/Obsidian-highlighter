# Obsidian-highlighter

![](https://github.com/jiangnanandi/obsidian-highlighter/raw/main/src-img/Title.png)

图片来源：**[Pexels](https://www.pexels.com/zh-cn/photo/6084131/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels)** 上的 **[Keira Burton](https://www.pexels.com/zh-cn/@keira-burton?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels)** 拍摄的图片

Obsidian-highlighter 是一款 Safari 扩展应用，启动「Obsidian-highlighter」插件可直接在 Safari 中对「网页原文」进行「高亮标注」，并且最大限度的保留原文的样式（Header、加粗、斜体、链接甚至层级）。同时提供对 [Obsidian](https://obsidian.md) 友好的 markdown 格式，支持一键将「高亮标注」导入（或者手动粘贴）到 Obsidian 中。

![](https://github.com/jiangnanandi/obsidian-highlighter/raw/main/src-img/Pasted%20image%2020220222135549.png)


对于任何问题、疑问、想法或请求，请使用 GitHub 问题跟踪器：[Submit an Issue](https://github.com/jiangnanandi/obsidian-highlighter/issues/new).。

##  如何使用
查看以下视频可快速上手
- [演示视频1：B 站](https://www.bilibili.com/video/BV13S4y1U7W9)
- [演示视频2：油管](https://www.youtube.com/watch?v=JBYiudo-Mzc)


**注意：本人是基于 Mac Safari 开发和调试，大家可放心使用，如果遇到问题可以通过使用 GitHub 问题追踪器：[Submit an Issue](https://github.com/jiangnanandi/obsidian-highlighter/issues/new).**


#### 激活扩展

![](https://github.com/jiangnanandi/obsidian-highlighter/raw/main/src-img/Pasted%20image%2020220223132758.png)

- 在 Safari 打开网页，按下快捷键 `Alt+X` 或者点击扩展栏右上角的图标，均可激活 Obsidian-highlighter  扩展。
- 激活仅适用于当前打开的 Tab 页面，新建页面要重新激活扩展。
- 扩展应用激活后，再次按下快捷键 `Alt+X` 或点击右上角图标可以「隐藏/显示」右下角窗口（PS：窗口隐藏状态下，扩展应用仍可用）。

#### 高亮标注
![](https://github.com/jiangnanandi/obsidian-highlighter/raw/main/src-img/CleanShot%202022-02-23%20at%2013.46.03.gif)

- 在 Safari 的任何页面中，我们都可以使用 Obsidian-highlighter  扩展进行「高亮标注」。
- **在网页中选中一段文字，并按下快捷键 `CMD+X` 完成「高亮标注」，被标注的文字会显示「黄色底色」。**
- 当完成「高亮标注」后，当前内容会自动保存到「剪贴板」中，同时标注内容也会「展示」在右下角窗口中，方便我们查看样式。（这些样式等同于将来导入到  Obsidian 中的样式）

#### 拷贝标题和URL
![](https://github.com/jiangnanandi/obsidian-highlighter/raw/main/src-img/CleanShot%202022-03-07%20at%2013.15.45.gif)

- 如果只是想要拷贝标题+URL，只需要在激活扩展之后，按下 CMD+X 快捷键即可，此时无需选中任何文字，标题+URL 就会以 Markdown 格式保存到剪贴板。

#### 保持缩进和原始样式
![](https://github.com/jiangnanandi/obsidian-highlighter/blob/main/src-img/CleanShot%202022-02-24%20at%2013.34.47.gif)

- 在进行「高亮标注」按下 `CMD+X` 的时候，Obsidian-highlighter 会自动保持原文中的样式(加粗/URL）以及层级，并按照 Markdown 格式保存。

#### 调整高亮层级
![](https://github.com/jiangnanandi/obsidian-highlighter/raw/main/src-img/CleanShot%202022-03-01%20at%2013.52.00.gif)

- 对于已经进行了「高亮标注」的文本，可以通过将「标注内容」再次选中后，按下 `Alt+A` 进行层级调整。
- **注意，这只会影响被调整的这一行后续高亮标注内容的层级，所以如果需要调整一段内容的层级，应该在这段内容的上一段进行「层级调整」**

#### 移除高亮标注
![](https://github.com/jiangnanandi/obsidian-highlighter/raw/main/src-img/Pasted%20image%2020220302133248.png)

![](https://github.com/jiangnanandi/obsidian-highlighter/raw/main/src-img/CleanShot%202022-03-02%20at%2013.27.14.gif)

共有三种方式移除「高亮标注」
1. 单行移除：选中要移除的「高亮内容」后，再次按下 `Cmd+X`。
2. 整段移除：鼠标选中要移除「高亮标准」任意部分内容，按下 `Alt+Click` （鼠标点击）。
3. 移除所有：按下快捷键 `Alt+Q`。

#### 「双向链接」
![](https://github.com/jiangnanandi/obsidian-highlighter/raw/main/src-img/CleanShot%202022-03-02%20at%2013.42.52.gif)

- 可以对已经进行过「高亮标注」的内容添加「双向链接」。
- 被设置成「双向链接」后，底色变成蓝色
    - 设置单词为「双向链接」：在已经「高亮标注」的段落上，双击，即可选中一个单词，同时单词被设置为「双向链接」
    - 设置一句话为「双向链接」：在已经「高亮标注」的段落上选中一段内容，按下 `Alt+Z`，即可设置为「双向链接」
    - 删除「双向链接」：在「双向链接」上按下 `Alt+Click`（鼠标左键单击），即可删除「双向链接」（蓝色变回黄色）

#### 设置
**修改窗口大小以及设置标题**
![](https://github.com/jiangnanandi/obsidian-highlighter/raw/main/src-img/CleanShot%202022-03-03%20at%2013.34.05.gif)

- 修改窗口大小，保存后窗口尺寸变化
- 修改标题，两种方式：
    - 方式1：直接修改，本次生效
    - 方式2：新建标题样式，保存后可以一直使用

**换行处理**

> 换行指的是「每次」选中一段进行「高亮标注」时，其中如果有换行，将按照如下四种方式进行处理


- 方式1：默认-所有换行都新建子弹笔记，并保持在同一层级
    - 此方式为默认设置，即默认情况下，插件会保存当时选中内容的层级，并按照「子弹笔记」的方式进行保留
    ![](https://github.com/jiangnanandi/obsidian-highlighter/raw/main/src-img/CleanShot%202022-03-03%20at%2013.55.07.gif)
- 方式2：每个换行都处于第一段的下一级
    - 此方式会每一次「高亮标注」的内容中的换行都放到第一行的下边。
    ![](https://github.com/jiangnanandi/obsidian-highlighter/raw/main/src-img/CleanShot%202022-03-04%20at%2013.13.58.gif)
- 方式3：每个换行都按「软换行」处理
    - 即每个换行都保留，但是并不按照「子弹笔记」方式保留缩进。
    ![](https://github.com/jiangnanandi/obsidian-highlighter/raw/main/src-img/CleanShot%202022-03-04%20at%2013.23.21.gif)
- 方式4：用空格替代换行
    - 顾名思义，将所有换行替换为「空格」。
#### 导入到 Obsidian 
![](https://github.com/jiangnanandi/obsidian-highlighter/blob/main/src-img/CleanShot%202022-03-04%20at%2013.47.44.gif)

- 在设置中可以通过配置「库名」和「路径」，支持一键导入到 Obsidian 
- 「库名」就是 Obsidian 的仓库名称，默认值是 `personal`，**正常情况下，你需要改成自己的「库名」**，否则会遇到如下报错
![[Pasted image 20220304135423.png]]
- 「路径」就是指我们需要导入到 Obsidian 中的路径，默认导入到 `highlight/` 下。

## Release Notes
v1.1

第一版发布到 App Store，并确保所有基础功能可用：
- 快速启动：支持快捷键和菜单栏两种方式。
- 高亮标注：可以保持原文中的样式以及层级，并自动保存到剪贴板，方便粘贴。
- 调整层级：支持快捷键调整层级，以满足各种需求。
- 移除高亮：支持三种移除方式，方便快捷，并支持一键清除。
- 双向链接：支持快捷键和双击两种方式添加「双向链接」，并支持移除。
- 导入 Obsidian：根据配置好的「仓库名称」和「导入路径」，一键将「高亮标注」内容导入到指定的笔记中。

## 如何开始
在 Mac App Store 搜索「obsidian-highlighter」安装后即可使用。
[下载地址](https://apps.apple.com/app/obsidian-highlighter/id1613923144)

## 最后

当前扩展的灵感和源代码均来自 Chrome 浏览器插件 [roam-highlighter](https://github.com/GitMurf/roam-highlighter)，我在用它搭配  Obsidian 对文章摘录的时候非常方便，并在多篇文章中分享了使用方法：
- 《[玩转 Obsidian 01：用 Obsidian 打造「知识循环」利器](https://sspai.com/post/62414)》
- 《[玩转 Obsidian 05：如何进行阅读及摘要](https://sspai.com/post/68492)》

在 Mac OS  升级到 Monterey 后 Safari 浏览器终于获得了重大提升，在使用了一段时间后就变成了我的「主力浏览器」，但是唯一的阻碍就是「如何快速高亮标注文章」，于是就将 Chrome 插件「roam-highlighter」迁移到 Safari 中也就是「Obsidian-highlighter」，迁移过程中也发现了一些 Bug 和使用上的问题，后续我会继续维护并修复相关问题。

感谢大家支持，并欢迎大家上报问题 [Submit an Issue](https://github.com/jiangnanandi/obsidian-highlighter/issues/new)。

----
个人一直在维护《玩转 Obsidian》系列文章，并持续更新，对 Obsidian 软件感兴趣可以在以下渠道找到相关文章：
- [少数派专栏 - 知识管理之术](https://sspai.com/my/column/263/post)
- [闲者时间博客](https://xzsj.vip)
- [闲者时间 Medium](https://xzsj.icu)

玩转 Obsidian 系列目前包括文章：
- 《[玩转 Obsidian 01：用 Obsidian 打造「知识循环」利器](https://sspai.com/post/62414)》
- 《[玩转 Obsidian 02：基础设置篇](https://sspai.com/post/63481)》
- 《[玩转 Obsidian 03：如何记录「间歇式日记」](https://sspai.com/post/63674)》
- 《[玩转 Obsidian 04：为什么推荐使用 Obsidian 做知识管理](https://sspai.com/post/67339)》
- 《[玩转 Obsidian 05：如何进行阅读及摘要](https://sspai.com/post/68492)》
- 《[玩转 Obsidian 06：如何用渐进式总结笔记，把知识交给未来的自己](https://sspai.com/post/69025)》
- 《[玩转 Obsidian 07 ：自动化「间歇式日记」](https://sspai.com/post/69982)》

可以在 [Twitter](https://twitter.com/xianzheshijian)、[Telegram](https://t.me/xztime) 、[instagram](https://instagram.com/shopkeeper.wang) 等渠道关注我，获取更多有意思的讯息。
