import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));
import svelteParser from 'svelte-eslint-parser';

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: ts.parser,
				project: './tsconfig.json',
				extraFileExtensions: ['.svelte']
			}
		}
	},
	{
		rules: {
			// Disallow 'any' type
			'svelte/sort-attributes': 'warn',
			'svelte/html-quotes': [
				'error',
				{
					prefer: 'single',
					dynamic: {
						quoted: false,
						avoidInvalidUnquotedInHTML: false
					}
				}
			],
			'@typescript-eslint/no-explicit-any': 'error',

			// Prevent unused variables
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_'
				}
			],
			'@typescript-eslint/no-unsafe-declaration-merging': 'error',
			'prefer-template': 'error'
			// "@typescript-eslint/no-unsafe-enum-comparison": "error"
		}
	}
);
