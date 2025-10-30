import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/use-auth";
import { nodeServerApi } from "@/lib/axiosInstance";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const LoginPage = () => {
  const { setAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    await nodeServerApi
      .post("signin", {
        data: { email, password },
      })
      .then((res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem('session', JSON.stringify(res))
        
        setAuthenticated?.(res.user);
        toast.success("Đăng nhập thành công", {});
        navigate("/");
      })
      .catch(() => {
        toast.error("Đăng nhập không thành công", {
          description: "Email hoặc password sai",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <form onSubmit={handleSubmit} className="max-w-[400px] space-y-4">
        <h1 className="font-semibold text-xl text-center">
          Chào mừng trở lại youtube-clone
        </h1>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button disabled={isLoading} className="w-full">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
