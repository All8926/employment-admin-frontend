# 使用官方的 Node 镜像作为基础镜像
FROM node:18.15.0 AS builder
 
# 设置工作目录
WORKDIR /app
 
# 将项目文件复制到工作目录
COPY . .
# 安装 npm 并安装项目依赖
RUN npm install 
 
# 构建前端应用
RUN npm run dev
 