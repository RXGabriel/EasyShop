import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);

  function onSubmit() {}

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Faça login na sua conta
        </h1>

        <p className="mt-2">
          Não tem uma conta?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Cadastrar
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}
export default AuthLogin;
