import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import boundaries from 'eslint-plugin-boundaries'
import nextPlugin from '@next/eslint-plugin-next'

export default tseslint.config(
  {
    // design-handoff/ is a static reference bundle from Claude Design (the
    // mockup export), not application code we author or lint — see
    // design-handoff/README.md.
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'src/payload-types.ts',
      'design-handoff/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    plugins: { boundaries },
    settings: {
      // eslint-plugin-boundaries resolves import specifiers via
      // eslint-module-utils/resolve, which doesn't understand extensionless
      // imports on its own — without a resolver, every dependency resolves
      // to null and the rule below silently never fires. Using the plain
      // `node` resolver (pure JS, no native binary) rather than
      // `eslint-import-resolver-typescript`: the latter depends on
      // `unrs-resolver`'s native binding, which fails to load on at least
      // one Windows dev machine in this project (missing VC++ runtime,
      // most likely) — not worth the fragility for what this rule needs.
      // Trade-off: this resolves relative imports (what actually matters
      // for catching an accidental `billing-adapter/adapters/**` import)
      // but not the `@/*` alias — revisit if that gap turns out to matter.
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      'boundaries/elements': [
        {
          type: 'billing-adapter-ports',
          pattern: 'src/billing-adapter/ports/**',
        },
        {
          type: 'billing-adapter-internals',
          pattern: 'src/billing-adapter/adapters/**',
        },
        {
          type: 'app',
          pattern: 'src/**',
        },
      ],
    },
    rules: {
      // Constitution Principle I: nothing outside billing-adapter may import
      // billing-adapter/adapters/** directly — only ports/** is a public
      // surface. This turns the rule into a lint failure, not a convention.
      'boundaries/dependencies': [
        'error',
        {
          default: 'allow',
          policies: [
            {
              from: { element: { types: 'app' } },
              disallow: { to: { element: { types: 'billing-adapter-internals' } } },
              message:
                'Only billing-adapter/ports/** may be imported outside billing-adapter — see constitution Principle I.',
            },
          ],
        },
      ],
    },
  },
  {
    // billing-adapter's own adapters are allowed to import each other and
    // their own internals; the policy above only restricts the *rest of the
    // app* from reaching in.
    files: ['src/billing-adapter/**/*.ts'],
    rules: {
      'boundaries/dependencies': 'off',
    },
  },
)
