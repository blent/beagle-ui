module.exports = {
    loader: require.resolve('postcss-loader'),
    options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('autoprefixer')({
                browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
            }),
            require('postcss-import'),
            require('postcss-each'),
            require('postcss-mixins'),
            require('postcss-nested'),
            require('postcss-simple-vars'),
            require('css-mqpacker'),
        ],
    },
};
