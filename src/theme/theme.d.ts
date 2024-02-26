/* eslint-disable no-unused-vars */

export declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    signup: true;
    detailCard: true;
    onboarding: true;
  }
}
export declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    signup: true;
    detailCard: true;
  }
}

export declare module '@mui/material/Card' {
  interface CardPropsVariantOverrides {
    signup: true;
    detailCard: true;
  }
}

export declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    underline: true;
    primary: true;
    secondary: true;
  }
}

export declare module '@mui/material/Divider' {
  interface DividerPropsVariantOverrides {
    primary: true;
  }
}

export declare module '@mui/material/styles' {
  interface TypographyVariants {
    subtitle3: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    subtitle3?: React.CSSProperties;
  }
}

export declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    subtitle3: true;
  }
}
