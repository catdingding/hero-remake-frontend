const theme_css_settings = {
  dark: {
    "--el-color-white": "#36393f",
    "--el-fill-color-blank": "#36393f",
    "--el-fill-color-light": "#454950",
    "--el-color-black": "#000000",
    "--el-text-color-primary": "#faffff",
    "--el-text-color-regular": "#faffff",
    "--el-text-color-secondary": "#faffff",
    "--el-text-color-placeholder": "#faffff",
    "--el-bg-color": "#36393f",
    "--el-border-color-base": "#dcdfe6",
    "--el-border-color-light": "#e4e7ed",
    "--el-border-color-lighter": "#ebeef5",
    "--el-border-color-extra-light": "#f2f6fc",
    "--text-color-primary-light-bg": "#303133",
    "--text-color-secondary-light-bg": "#606266",
  },
  light: {
    "--el-color-white": "#ffffff",
    "--el-fill-color-blank": "#ffffff",
    "--el-fill-color-light": "#f5f7fa",
    "--el-color-black": "#000000",
    "--el-color-primary": "#409eff",
    "--el-text-color-primary": "#303133",
    "--el-text-color-regular": "#606266",
    "--el-text-color-secondary": "#909399",
    "--el-text-color-placeholder": "#c0c4cc",
    "--el-bg-color": "#f5f7fa",
    "--el-border-color-base": "#dcdfe6",
    "--el-border-color-light": "#e4e7ed",
    "--el-border-color-lighter": "#ebeef5",
    "--el-border-color-extra-light": "#f2f6fc",
    "--text-color-primary-light-bg": "var(--text-color-primary)",
    "--text-color-secondary-light-bg": "var(--text-color-secondary)",
  },
};

export function apply_config(config) {
  if (config.background) {
    document.body.style["background-color"] = null;
    document.body.style["background"] = config.background;
  } else if (config.background === "") {
    document.body.style["background"] = null;
    document.body.style["background-color"] = "var(--color-white)";
  }
  if (config.theme) {
    for (const [key, value] of Object.entries(theme_css_settings[config.theme])) {
      document.documentElement.style.setProperty(key, value);
    }
  }
}
