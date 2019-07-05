# -*- coding:utf-8 -*-
'''
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

intro = '--- \nlayout:     post \ntitle:     \nsubtitle:  \ndate:       \nauthor:     王钰博 \nheader-img: img/190211_snow_3.jpg\ncatalog: true\ntags:\n--- \n'

# 读取当前目录下所有文件名
filepath = './'

fNameList = os.listdir(filepath)

# 有多少文件 
n_fNameList = [len(fNameList)]

# 挨个读取文件，并将文件中原内容读取为old,再只取其中十行之后的内容；再索引到文件头部，写入新数据，然后再写入原数据
for fname in fNameList:
    with open(fname, 'r') as target:
        target = open(fname, 'r+')
        old = target.readlines()
        old = old[10:len(old)]
        #print 'this is ' + ''.join(old)
        #old = ''.join(old)
        target.seek(0)
        target.write(intro)
        #target.write(intro+''.join(old)) 
        
    target.close()





