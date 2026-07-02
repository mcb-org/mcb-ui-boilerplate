import type { FC, ReactNode } from "react";

const LoginFormShell: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <section className="flex w-full items-center justify-center bg-white/78 px-4 py-5 backdrop-blur sm:px-6 lg:w-[50%] lg:px-7 lg:py-7">
      <div className="w-full max-w-[520px] rounded-[28px] border border-white/70 bg-white/92 p-5 shadow-[0_24px_70px_rgba(76,29,149,0.12)] sm:p-6 lg:p-7">
        {children}
      </div>
    </section>
  );
};

export default LoginFormShell;
