export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-pxtorem': {
               rootValue: 16, // 设计稿的基准值，通常为 16
               propList: ['*'], // 可以转化的属性，* 表示所有属性
               unitPrecision: 5, // 转换后保留的小数位数
           },
  },
};