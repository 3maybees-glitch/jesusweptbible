import nextConfig from "eslint-config-next"

const config = [
  {
    ignores: ["public/**", "scripts/**", "genesis-data.json"],
  },
  ...nextConfig,
  {
    rules: {
      // Pre-existing v0/shadcn patterns; tighten in a follow-up pass.
      "react/no-unescaped-entities": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "@next/next/no-img-element": "warn",
      "import/no-anonymous-default-export": "off",
    },
  },
]

export default config
