import React, { ReactNode } from "react";
import { Toast } from "./Toast";
interface ToastContextProps {
    showToast: (message: string, type: "success" | "warning" | "error" | "info") => void;
}
interface ToastMessage {
    id: number;
    message: string;
    type: "success" | "warning" | "error" | "info";
}
const ToastContext = React.createContext<ToastContextProps | null>(null);

interface ToastProviderProps {
    children: ReactNode;
    duration?: number;
}

export const ToastProvder: React.FC<ToastProviderProps> = ({ children, duration = 1000 }) => {
    const [toast, setToast] = React.useState<ToastMessage[]>([]);

    const showToast = React.useCallback((message: string, type: "success" | "warning" | "error" | "info") => {
        const id = Date.now();
        setToast(prev => [...prev, { id, message, type }]);
    }, []);
    const removeToast = (id: number) => {
        setToast(prev => prev.filter(toast => toast.id !== id))
    }
    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && toast.map((item, index) =>
                <Toast
                    message={item.message}
                    type={item.type}
                    onClose={() => removeToast(item.id)}
                    duration={duration}
                    index={index}
                    key={item.id}
                />
            )}
        </ToastContext.Provider>
    )
}
export const useToast = () => {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;

}
