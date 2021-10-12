module.exports = {
	lintOnSave: false,
	devServer: {
		overlay: false,
		port: process.env.VUE_APP_PORT || 3000,
		compress: true,
		disableHostCheck: true,
		/* Local 에서만 사용가능한 proxy 설정 */
		/* 배포시 nginx 서버에서 직접 proxy 설정을 해줘야함 */
		/* nginx proxy 설정 위치 /etc/nginx/conf.d/default.conf */
		proxy: {
			'/trace': {
				target: 'https://service.epost.go.kr',
				changeOrigin: true,
			},
			'/news': {
				target: 'https://api.hnpwa.com/v0',
				changeOrigin: true,
			},
		},
		// proxy: 'https://service.epost.go.kr/',
	},
	transpileDependencies: ['vuetify'],
	runtimeCompiler: true,
	// cache busting
	// 배포시 js 이름변환
	// configureWebpack: config => {
	// 	if (
	// 		process.env.NODE_ENV === 'production' ||
	// 		process.env.NODE_ENV === 'development'
	// 	) {
	// 		config.output.filename = 'js/[name].[hash].js';
	// 		config.output.chunkFilename = 'js/[name].[hash].js';
	// 	}
	// },
	 publicPath: '/',
};
