const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

module.exports = {
  resolve: {
    extensions: ['.js','.vue'],
    // 경로 별칭 : 상대경로를 변수에 담아 사용하는 원리 이를 통해 상대경로를 마치 절대 경로처럼 사용할 수 있게 하여 용이하다.
    alias: {
      '~' : path.resolve(__dirname, 'src'),
      'assets' : path.resolve(__dirname, 'src/assets')
    }
  },
	//파일을 읽어들이기 시작하는 진입점 설정으로 주로 parcel의 parcel index.html과 유사하다.
	//parcel과는 다르게 index.html이 아닌 js 파일을 진입점으로 하는 차이가 있다.
	entry: './src/main.js',

  // 결과물(번들)을 반환하는 설정
	output: {
    //nodeJS 에서 요구하는 절대 경로가 필요.
    // path: path.resolve(__dirname, 'dist'),

    // filename: 'main.js',
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.s?css$/, // 파일의 이름이 .scss 또는 .css 로 끝나는 것을 찾는 정규식
        use: [
          'vue-style-loader',
          'style-loader', // 해석된 css를 html의 <style>에 추가해주는 패키지
          'css-loader', // css 파일을 불러오며 해석하는 첫번째로 사용되는 패키지
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: 'file-loader'
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from : 'static' }
      ]
    }),
    new VueLoaderPlugin()
  ],

  devServer: {
    host: 'localhost'
  }
}