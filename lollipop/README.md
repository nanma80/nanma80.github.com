Twistypuzzles.com:

Lollipop: a Complex 2D puzzle

Recently I made a "complex" 2D puzzle that can be played on webpage, called Lollipop. It can be found here:

http://nanma80.github.com/lollipop

The shape of the puzzle is a disk. Take the simpliest version with 3 axes for example. The outmost ring never flips. Each piece in second ring can be turned by only one axis. Each piece in the third ring in the third ring can be turned by two axes. The inner most ring, the core, can be turned by all three axes. 

The puzzle with four axes is more complicated. For example, there is a ring where the pieces can be turned by opposite axes, and another ring where the pieces can be turned by three out of four axes. 

The point is, for ANY subset of axes, the piece turned by and only by them can be found here. In a sense, this is the most "complete" puzzle with this number of axis in a 2D plane. All pieces are arranged by "type" into different rings.

It supports a batch input through a textbox. For complicated puzzles this is indeed necessary.

This puzzle is obviously inspired by the Complex 3x3x3 puzzle proposed by Matt Galla, Carl Hoff, Andreas Nortmann, et al. I especially thank Matt for inspiring discussions. I'm looking forward to meeting you again to talk about puzzles!

---------------
MC4D:

Lollipop: a Complex 2D puzzle

Recently I made a "complex" 2D puzzle that can be played on webpage, called Lollipop. It can be found here:

http://nanma80.github.com/lollipop

The shape of the puzzle is a disk. Take the simpliest version with 3 axes for example. The outmost ring never flips. Each piece in second ring can be turned by only one axis. Each piece in the third ring in the third ring can be turned by two axes. The inner most ring, the core, can be turned by all three axes. 

The puzzle with four axes is more complicated. For example, there is a ring where the pieces can be turned by opposite axes, and another ring where the pieces can be turned by three out of four axes. 

The point is, for ANY subset of axes, the piece turned by and only by them can be found here. In a sense, this is the most "complete" puzzle with this number of axis in a 2D plane. All pieces are arranged by "type" into different rings.

It supports a batch input through a textbox. For complicated puzzles this is indeed necessary.

This puzzle is obviously inspired by the Complex 3x3x3 puzzle proposed by Matt Galla, Carl Hoff, Andreas Nortmann, et al on twistypuzzles.com. I especially thank Matt for inspiring discussions. I'm looking forward to meeting you again to talk about puzzles!

Nan

----------------
中文

"复杂"二维魔方: "棒棒糖"

最近我做了一个"复杂"二维魔方，取名叫"棒棒糖"。可以在一个网页上玩:

http://nanma80.github.com/lollipop

这个魔方的形状是一个圆盘。以最简单的三轴版本为例，最外面的圆环永远不动；第二个圆环可以被一个轴转动；第三个圆环被两个轴转动；最靠里的小圆盘可以被所有三个轴转动。

四轴版本更复杂一些。例如，有一个圆环可以被相对的两个轴转动，另有一个圆环被相邻的两个轴转动，还有一个圆环被三个轴转动，等等。

要点就是，对于各个轴的 任何 一个子集，包括空集和全集，都有那么一个块可以被这些轴转动，并且只被这些轴转动。某种意义上讲，这个魔方包括了这几个轴所能产生的所有可能的块。各个块是按照"类型"分布于不同圆环的。

可以从文本框输入公式。轴多的情况下，好像必须得这样才有希望解开。


三轴的版本比较容易，四轴的就复杂一点。五轴及其以上的就非得仔细研究不可了。大家可以来试试能解到什么程度。

这个魔方的三维版本，叫做 Complex 3x3x3 "复杂"三阶，是twistypuzzles论坛上 Matt Galla, Carl Hoff, Andreas Nortmann 等人提出的。"复杂"三阶是普通三阶魔方的一个扩展。对于任何上下左右前后六个轴的子集，都能找到一块，被这个子集转动。

跟前一阵的"反射魔方"一样，这个是用 html5 canvas 编的。别用 IE < 8 的版本用。推荐用 Chrome 或者 Firefox 之类的玩。