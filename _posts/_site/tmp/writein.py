# -*- coding:utf-8 -*-
'''
实现思路：
1. 获取所有文件名；
2. 根据文件名，挨个读取文档，把对应格式写进去；
3. 挨个修改文件名；


对应格式：
---
layout:     post
title:      。。。
subtitle:   。。。
date:       。。。
author:     王钰博
header-img: img/190211_snow_3.jpg
catalog: true
tags:
   
---
'''

from sys import argv
import os

intro = '--- \nlayout:     post \ntitle:      。。。 \nsubtitle:   。。。\ndate:       。。。\nauthor:     王钰博 \nheader-img: img/190211_snow_3.jpg\n catalog: true\ntags:\n--- \n'

# 读取当前目录下所有文件名
filepath = './'

fNameList = os.listdir(filepath)

# 有多少文件 
n_fNameList = [len(fNameList)]

# 挨个读取文件，并将文件中原内容读取为old，先移动索引到文件头部，写入新数据，然后再写入原数据
for fname in fNameList:
    target = open(fname, 'r+')
    old = target.read()
    target.seek(0)
    target.write(intro) 
    target.write(old)
    target.close()





 

