import { createTheme, alpha, responsiveFontSizes } from "@mui/material/styles";
import { DateFormatEnum } from "constants/DateContants";

export const lightTheme = customizeComponents({});
export const darkTheme = customizeComponents({ palette: { mode: "dark" } });

/**
 *
 * @param {import("@mui/material").Theme} theme
 */
export function customizeComponents(theme) {
  return responsiveFontSizes(
    createTheme({
      ...theme,
      palette: {
        ...theme.palette,
        primary: {
          lighter: "#C1F6C15E",
          // main: "#006600",
          main: "#A2241A",
        },

        secondary: {
          main: "#000051",
          dark: "#FAFAFA",
        },
      },

      breakpoints: {
        values: {
          xs: 0,
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280,
          "2xl": 1536,
        },
      },
      typography: {
        // fontFamily: ["Merriweather", "serif"].join(),
        fontFamily: ["Roboto", "sans-serif"].join(),
        fontSize: 12,
        color: "#000051",
        button: {
          textTransform: "none",
          // width: "8rem",
          // height: "3rem",
        },
        allVariants: {
          // fontWeight: 500,
        },
      },
      components: {
        MuiContainer: {
          defaultProps: {
            maxWidth: "xl",
          },
        },
        MuiIcon: {
          defaultProps: {
            baseClassName: "material-symbols-outlined",
          },
        },
        MuiDatePicker: {
          defaultProps: {
            inputFormat: DateFormatEnum.FORMAT,
          },
        },
        MuiDesktopDatePicker: {
          defaultProps: {
            inputFormat: DateFormatEnum.FORMAT,
          },
        },
        MuiMobileDatePicker: {
          defaultProps: {
            inputFormat: DateFormatEnum.FORMAT,
          },
        },
        MuiTabs: {
          defaultProps: {
            variant: "scrollable",
            scrollButtons: "auto",
            allowScrollButtonsMobile: true,
          },
        },
        MuiLoadingButton: {
          defaultProps: {
            variant: "contained",
          },
        },
        MuiButton: {
          defaultProps: {
            // disableElevation: true,
            variant: "contained",
            color: "primary",
            rounded: "circular",
          },
          variants: [
            {
              props: { rounded: "default" },
              // style: () => ({ borderRadius: 16 }),
            },
            {
              props: { rounded: "square" },
              style: () => ({ borderRadius: 0 }),
            },
            {
              props: { rounded: "circular" },
              style: () => ({ borderRadius: 24 }),
            },
            // {
            //   props: { size: "large" },
            //   style: () => ({ padding: "14px 22px" }),
            // },
            // {
            //   props: { size: "medium" },
            //   style: () => ({ padding: "10px 16px" }),
            // },
          ],
          styleOverrides: {
            root: ({ theme, ownerState }) => {
              return {
                ...(!isNaN(Number(ownerState.rounded))
                  ? { borderRadius: Number(ownerState.rounded) }
                  : {}),
                ...(ownerState.variant === "soft"
                  ? {
                      color:
                        theme.palette[ownerState.color]?.main ||
                        theme.palette.grey[500],
                      backgroundColor: alpha(
                        theme.palette[ownerState.color]?.main ||
                          theme.palette.grey[500],
                        0.2
                      ),
                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette[ownerState.color]?.main ||
                            theme.palette.grey[500],
                          0.3
                        ),
                      },
                    }
                  : {}),
              };
            },
          },
        },
        MuiChip: {
          defaultProps: { variant: "soft" },
          styleOverrides: {
            root: ({ theme, ownerState }) => {
              if (ownerState.variant !== "soft") return {};
              return {
                color:
                  theme.palette[ownerState.color]?.main ||
                  theme.palette.grey[500],
                backgroundColor: alpha(
                  theme.palette[ownerState.color]?.main ||
                    theme.palette.grey[500],
                  0.2
                ),
              };
            },
          },
        },
        MuiIconButton: {
          defaultProps: {},
          styleOverrides: {
            root: ({ theme, ownerState }) => {
              return {
                ...(!isNaN(Number(ownerState.rounded))
                  ? { borderRadius: Number(ownerState.rounded) }
                  : {
                      borderRadius: { square: 0, default: 8 }[
                        ownerState.rounded
                      ],
                    }),
                ...(ownerState.variant === "contained"
                  ? {
                      color:
                        theme.palette[ownerState.color]?.contrastText ||
                        theme.palette.text.primary,
                      backgroundColor:
                        theme.palette[ownerState.color]?.main ||
                        theme.palette.grey[500],
                      "&:hover": {
                        backgroundColor:
                          theme.palette[ownerState.color]?.dark ||
                          theme.palette.grey[700],
                      },
                    }
                  : {}),
                ...(ownerState.variant === "soft"
                  ? {
                      color:
                        theme.palette[ownerState.color]?.main ||
                        theme.palette.grey[500],
                      backgroundColor: alpha(
                        theme.palette[ownerState.color]?.main ||
                          theme.palette.grey[500],
                        0.2
                      ),
                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette[ownerState.color]?.main ||
                            theme.palette.grey[500],
                          0.3
                        ),
                      },
                    }
                  : {}),
                ...(ownerState.variant === "outlined"
                  ? {
                      border: `1px solid ${
                        theme.palette[ownerState.color]?.main ||
                        theme.palette.divider
                      }`,
                    }
                  : {}),
              };
            },
          },
        },
        MuiInputBase: {
          styleOverrides: {
            root: ({ theme, ownerState }) => ({
              "&.MuiInputBase-formControl": {
                borderRadius: 24,
                backgroundColor:'white'
              },
            }),
          },
        },

        MuiPaper: {
          defaultProps: {
            elevation: 0,
            borderRadius: "default",
          },
          variants: [
            {
              props: { borderRadius: "default" },
              style: () => ({}),
            },
            {
              props: { borderRadius: "square" },
              style: () => ({ borderRadius: 0 }),
            },
            {
              props: { borderRadius: "circular" },
              style: () => ({ borderRadius: 24 }),
            },
          ],
        },
        MuiDialog: {
          defaultProps: {
            maxWidth: "sm",
          },
        },
        MuiDialogTitle: {
          styleOverrides: {
            root: ({ theme }) => ({
              ...theme.typography.h5,
              fontWeight: "bold",
            }),
          },
        },
      },
    })
  );
}
