"use client";

const FloatingTriangle = () => {
    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" style={{ animationDuration: "25s" }}>
                <div 
                    style={{
                        width: 0,
                        height: 0,
                        borderLeft: "800px solid transparent",
                        borderRight: "800px solid transparent",
                        borderBottom: "1000px solid #00ACDB",
                        opacity: 0.25,
                    }}
                />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" style={{ animationDuration: "35s", animationDirection: "reverse" }}>
                <div 
                    style={{
                        width: 0,
                        height: 0,
                        borderLeft: "700px solid transparent",
                        borderRight: "550px solid transparent",
                        borderBottom: "920px solid #00FFDD",
                        opacity: 0.2,
                    }}
                />
            </div>
        </div>
    );
};
export default FloatingTriangle;
