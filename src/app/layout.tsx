import { Toaster } from "react-hot-toast";

const RootLayout=({children}: {children: React.ReactNode})=>{
    return(
        <html lang="en">
            <body className="font-jersey antialiased">
                {children}
                <Toaster 
                    position="bottom-right"
                    toastOptions={{
                        style: {
                            background: "#100F0F",
                            color: "#02E7FC"
                        },
                    }}
                />
            </body>
            
        </html>
    )
}

export default RootLayout;