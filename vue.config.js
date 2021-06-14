module.exports = {
	lintOnSave: true,
	devServer: {
		overlay: false,
		port: process.env.VUE_APP_PORT || 3000,
		proxy: 'https://service.epost.go.kr/',
	},
	transpileDependencies: ['vuetify'],
	runtimeCompiler: true,
	// publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
};
