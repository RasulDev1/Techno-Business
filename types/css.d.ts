import "react";

// CSS-переменные в style={{ "--h": "48%" }}
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
