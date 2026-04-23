import { useEffect, useState } from "react";

const LazyRender: React.FC<{
    children: React.ReactNode;
    delay: number;
}> = ({ children, delay }) => {
    const [render, setRender] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setRender(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return render ? <>{children}</> : null;
};

export default LazyRender;