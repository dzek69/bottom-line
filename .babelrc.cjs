const env = process.env.NODE_ENV || "production";

const config = {
    presets: [
        [
            "@babel/env",
            {
                "targets": {
                    "browsers": [
                        "> 3%"
                    ]
                },
                "useBuiltIns": "entry",
                "corejs": 2
            }
        ]
    ],
    plugins: [
        env === "testing" ? "rewire" : null,
        ["module-extension", { mjs: "" }]
    ].filter(Boolean),
};

module.exports = config;
