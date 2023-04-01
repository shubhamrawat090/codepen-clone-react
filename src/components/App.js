import React, { useState, useEffect } from "react";
import Editor from "./Editor";
// custom hook for storing changes in localStorage to make them persist on refreshing
import useLocalStorage from "../hooks/useLocalStorage";

function App() {
  // sandbox="allow-scripts" -
  //      used for security
  //      when we run codepen application it won't be able to access any documents cookies or anything

  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [javascript, setJavascript] = useLocalStorage("js", "");

  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${javascript}</script>
      </html>
    `);
    }, 250);

    // cleaner function -> if we keep changing our html, css, js code
    // it will clear the previous timeout and create a new timeout of
    // 250ms from the time we stopped coding
    return () => clearTimeout(timeout);
  }, [html, css, javascript]);

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language={"html"}
          displayName={"HTML"}
          value={html}
          onChange={setHtml}
        />
        <Editor
          language={"css"}
          displayName={"CSS"}
          value={css}
          onChange={setCss}
        />
        <Editor
          language={"javascript"}
          displayName={"JavaScript"}
          value={javascript}
          onChange={setJavascript}
        />
      </div>
      
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          ref={(el) => el && el.setAttribute("frameBorder", 0)}
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
