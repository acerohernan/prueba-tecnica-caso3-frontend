module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/strict-type-checked",
		"plugin:react-hooks/recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:storybook/recommended",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh"],
	rules: {
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
		"@typescript-eslint/no-non-null-assertion": 0,
		"@typescript-eslint/no-unsafe-assignment": 0,
		"@typescript-eslint/restrict-template-expressions": 0,
		"react-refresh/only-export-components": 0,
	},
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: ["./tsconfig.json", "./tsconfig.node.json", "./tsconfig.app.json"],
		tsconfigRootDir: __dirname,
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};
