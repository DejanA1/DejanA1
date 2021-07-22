import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(${({ theme }) => theme.colors.bgimage});

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
