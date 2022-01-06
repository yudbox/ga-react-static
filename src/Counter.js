import React from "react";
import { useTheme, useThemeUpdate } from "./context/ThemeContext";

export const Counter = () => {
    const theme = useTheme()
    const themeUpdate = useThemeUpdate()
    return (
        <div>
            {theme}
        </div>
    )
}