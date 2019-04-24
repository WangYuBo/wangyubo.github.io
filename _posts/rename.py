# -*- coding:utf-8 -*-

# 1. 批量重命名文件
# 将 '180204-filename.md' 改为 '2018-02-04-filename.md'
# 也就是说，只提取文件名六个字符，将前两个字符添加'20',后四个字符从中间分开，再与后面的字符组合即可；

# 算法：

# 读取所有文件名，存储在数组fNams中；
# 读取每个文件名fname，读取前两个字符f2,在f2前添加'20',为new_f2;读取第三到六个字符f36,从中间分割为f3,f6;读取第七个及以后字符f7;最后拼接newf2/f3/f6/f7,并存储在new_fName;
#从new_fName中读取文件名，并重命名之前文件；

from sys import argv

import os

filePath = './'

fNameList = os.listdir(filePath)
n_fNameList = [len(fNameList)]

for fname in fNameList:
    f2 = fname[0:4]  # 年份
    f3 = fname[4:6] # 月份
    f6 = fname[6:8] # 获取日期中天
    flast = fname[8:len(fname)] # 最后几位字符
    n_fname = f2+ '-'+ f3+ '-'+ f6+ '-'+ flast
    #n_fNameList.append(n_fname)
    os.rename(fname, n_fname)




# 2. 批量在文件前写入以下格式：

'''
---
layout:     post
title:      
subtitle:   
date:       
author:     慕广陵
header-img: img/post-bg-ios9-web.jpg
catalog: true
tags:
    - 
    - 
--- 

'''                         
