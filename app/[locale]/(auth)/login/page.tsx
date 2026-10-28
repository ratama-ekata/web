import { Metadata } from "next";
import { LoginView } from "@/components/auth/login-view";
import { MuiThemeProvider } from "@/components/theme/mui-theme-provider";

export const metadata: Metadata = {
  title: "Officer Sign In | Ratamaekata Portal",
  description: "Secure login portal for authorized government officials and administrators.",
};

export default function LoginPage() {
  return (
    <MuiThemeProvider>
      <LoginView />
    </MuiThemeProvider>
  );
}
