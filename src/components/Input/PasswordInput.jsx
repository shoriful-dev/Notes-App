import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

const PasswordInput = ({ value, onChange, placeholder }) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    return (
        <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Lock className="h-4 w-4" />
            </div>
            <input
                value={value}
                onChange={onChange}
                type={isShowPassword ? "text" : "password"}
                placeholder={placeholder || "Password"}
                className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-12 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
            />

            {isShowPassword ? (
                <Eye
                    size={20}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-600 cursor-pointer hover:text-blue-700 transition-colors"
                    onClick={() => toggleShowPassword()}
                />
            ) : (
                <EyeOff
                    size={20}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 cursor-pointer hover:text-slate-400 transition-colors"
                    onClick={() => toggleShowPassword()}
                />
            )}
        </div>
    );
};

export default PasswordInput;
