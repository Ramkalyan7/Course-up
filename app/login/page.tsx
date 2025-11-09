import LoginForm from "@/components/auth/LoginForm";
import { isAuthenticated } from "@/lib/session/serverSession";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const IsLoggedIn = await isAuthenticated();

  if (IsLoggedIn) {
    redirect("/searchcourses");
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
