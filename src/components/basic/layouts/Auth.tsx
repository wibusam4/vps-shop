import Link from "next/link";
import Google from "../icon/Google";

interface AuthProps {
  children: React.ReactNode;
  isLogin: boolean;
}

const Auth: React.FC<AuthProps> = ({ children, isLogin }) => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex max-w-3xl items-center rounded-2xl bg-gray-100 p-5 shadow-lg">
        <div className="px-8 md:w-1/2 md:px-16">
          <h2 className="text-2xl font-bold text-[#002D74]">
            {isLogin ? "Đăng Nhập" : "Đăng Kí"}
          </h2>
          <p className="mt-4 text-xs text-[#002D74]">
            {isLogin
              ? "Đăng nhập đi, nếu bạn đã là thành viên"
              : "Đăng kí đi, nếu bạn chưa là thành viên"}
          </p>
          {children}
          <div className="mt-6 grid grid-cols-3 items-center text-base-content">
            <hr className="border-base-content" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-base-content" />
          </div>

          <button className="btn-outline btn-ghost btn mt-5 flex w-full items-center justify-center  duration-300 hover:scale-105">
            <Google />
            {isLogin ? "Login with Google" : "Register with Google"}
          </button>

          <div className="border-b border-[#002D74] py-4 text-sm text-[#002D74]">
            {isLogin ? <a href="#">Quên mật khẩu?</a> : ""}
          </div>

          <div className="mt-3 flex items-center justify-between text-sm text-[#002D74]">
            <p>{isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}</p>
            <Link
              href={`/auth/${isLogin ? "register" : "login"}`}
              className="btn-outline btn-accent btn-sm btn duration-300 hover:scale-110"
            >
              {isLogin ? "Đăng kí" : "Đăng nhập"}
            </Link>
          </div>
        </div>
        <div className="hidden w-1/2 md:block">
          <img
            src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
            className="rounded-2xl"
            alt="Phone image"
          />
        </div>
      </div>
    </section>
  );
};

export default Auth;
