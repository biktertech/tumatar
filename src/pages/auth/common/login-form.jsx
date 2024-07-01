import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Checkbox from "@/components/ui/Checkbox";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../../api/user";
const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const onSubmit = (data) => {
    loginUser(data).then((resp) => {
      console.log("result", resp);
      if (resp?.response?.status === 401) {
        toast.error(resp?.response?.data?.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      } 

      if (resp?.status === 201){
        window.localStorage.setItem("isAuth", true);
        window.localStorage.setItem("token", resp?.data?.access_token);
  
        window.location.href = "/course/list";
  
        toast.success("User login successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="email"
        label="email"
        type="email"
           placeholder=" Enter your email"
        register={register}
        error={errors.email}
      />
      <Textinput
        name="password"
        label="password"
        type="password"
        register={register}
        error={errors.password}
          placeholder=" Enter your password"
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link>
      </div>

      <button className="btn btn-dark block w-full text-center">Sign in</button>
    </form>
  );
};

export default LoginForm;
