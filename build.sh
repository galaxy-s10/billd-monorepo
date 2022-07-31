#!/usr/bin/env bash
###
# Author: shuisheng
# Email: 2274751790@qq.com
# Github: https://github.com/galaxy-s10
# Date: 2022-01-03 16:12:54
# LastEditTime: 2022-07-31 19:50:13
# Description:
###

# 约定$1为任务名, $2为环境, $3为Jenkins工作区, $4为端口号
JOBNAME=$1 # 注意: JOBNAME=$1,这个等号左右不能有空格！
ENV=$2
WORKSPACE=$3
PORT=$4
PUBLICDIR=/node

echo 删除node_modules:
rm -rf node_modules

echo 查看npm版本:
npm -v

if ! type pnpm >/dev/null 2>&1; then
  echo 'pnpm未安装,先全局安装pnpm'
  npm i pnpm -g
else
  echo 'pnpm已安装'
fi

echo 查看pnpm版本:
pnpm -v

echo 开始安装依赖:
pnpm install

if [ $ENV = 'beta' ]; then
  echo 开始构建测试环境:
elif [ $ENV = 'preview' ]; then
  echo 开始构建预发布环境:
elif [ $ENV = 'prod' ]; then
  echo 开始构建正式环境:
else
  echo 开始构建$ENV环境:
fi

pnpm run doc

echo 将doc移动到项目根目录：
mv doc dist
