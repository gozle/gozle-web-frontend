export interface AppTheme {
  palette: {
    background: { contrast: string; pageBlock: string };
    main: { dark: string; default: string };
    search: {
      src: string;
      src_hover: string;
      title: string;
      title_hover: string;
    };
  };
}
