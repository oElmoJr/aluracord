import Head from "next/head";

function IndexPage() {
  return (
    <Head>
      <title>AluraCord | Chat</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
}

export default function ChatPage() {
  return (
    <>
      <IndexPage />
      <div>
        <h1>Hello World!!!</h1>
      </div>
    </>
  );
}
