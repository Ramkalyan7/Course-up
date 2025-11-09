import RegisterForm from "@/components/auth/RegisterForm";
import { isAuthenticated } from "@/lib/session/serverSession";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const IsLoggedIn = await isAuthenticated();

  if (IsLoggedIn) {
    redirect("/searchcourses");
  }

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
