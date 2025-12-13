const RootLayout=({children}: {children: React.ReactNode})=>{
    return(
        <html lang="en">
            <body className="font-jersey antialiased">{children}</body>
        </html>
    )
}

export default RootLayout;