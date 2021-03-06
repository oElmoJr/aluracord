//GlobalStyle component
function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        scrollbar-width: none;
      }

      *::-webkit-scrollbar {
        display: none;
      }

      body {
        font-family: "Open Sans", sans-serif;
      }

      /* App fit Height */
      html,
      body,
      #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }

      #__next {
        flex: 1;
      }

      #__next > * {
        flex: 1;
      }

      @keyframes is-rotating {
        to {
          transform: rotate(2turn);
        }
      }

      /* ./App fit Height */
    `}</style>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
