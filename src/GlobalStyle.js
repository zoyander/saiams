import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
    html {
        --desktop-background: ${props => props.styles.desktopBackground};
        --interact-background: ${props => props.styles.interactBackground};
        --main-font: ${props => props.styles.mainFont};
        --main-text-color: ${props => props.styles.mainTextColor};
        --taskbar-background: ${props => props.styles.taskbarBackground};
        --taskbar-text-color: ${props => props.styles.taskbarTextColor};
        --taskbar-highlight-color: ${props => props.styles.taskbarHighlightColor};
        --main-button-background: ${props => props.styles.mainButtonBackground};
        --main-button-background-hover: ${props => props.styles.mainButtonBackgroundHover};
        --alt-button-background: ${props => props.styles.altButtonBackground};
        --button-text-color: ${props => props.styles.buttonTextColor};
        --main-highlight-background: ${props => props.styles.mainHighlightBackground};
        --alt-highlight-background: ${props => props.styles.altHighlightBackground};
        --highlight-text-color: ${props => props.styles.highlightTextColor};
        --subtitles-background: ${props => props.styles.subtitlesBackground};
        --subtitles-text-color: ${props => props.styles.subtitlesTextColor};
    }
`;
 
export default GlobalStyle;