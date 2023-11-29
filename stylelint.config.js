module.exports = {
  root: true,
  extends: ["stylelint-config-standard", "stylelint-config-clean-order"],
  plugins: ["stylelint-prettier"],
  customSyntax: "postcss-html",
  overrides: [
    {
      files: ["**/*.(css|html|vue)"],
      customSyntax: "postcss-html",
    },
    {
      files: ["*.less", "**/*.less"],
      customSyntax: "postcss-less",
      extends: [
        "stylelint-config-standard",
        "stylelint-config-recommended-vue",
      ],
    },
    {
      files: ["*.scss", "**/*.scss"],
      customSyntax: "postcss-scss",
      extends: [
        "stylelint-config-standard-scss",
        "stylelint-config-recommended-vue/scss",
      ],
      rule: {
        "scss/percent-placeholder-pattern": null,
      },
    },
  ],
  rules: {
    "prettier/prettier": true,
    "at-rule-no-unknown": null,
    "no-empty-source": null,
    "unit-no-unknown": null,
    "no-descending-specificity": null,
    "selector-pseudo-class-no-unknown": null,
    "declaration-block-no-duplicate-properties": null,
    "selector-type-no-unknown": null,
    "block-no-empty": null,
    "font-family-no-missing-generic-family-keyword": null,
    "declaration-block-no-shorthand-property-overrides": null,
  },
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts"],
};
