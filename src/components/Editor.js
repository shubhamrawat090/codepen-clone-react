import React, { useState } from "react";

import AceEditor from "react-ace";

// to be able to use modes for html, css and javascript type codeeditors
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";

// importing the dark theme
import "ace-builds/src-noconflict/theme-twilight";

import "ace-builds/src-noconflict/ext-language_tools";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";

const Editor = (props) => {
  const { displayName, language, value, onChange } = props;

  const [open, setOpen] = useState(true);

  function handleChange(value) {
    onChange(value);
  }

  return (
    <div className={`editor-container ${open ? "" : "collapsed"}`}>
      <div className="editor-title">
        {displayName}
        <button
          type="button"
          className="expand-collapse-btn"
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>

      <AceEditor
        mode={language}
        theme="twilight"
        name={displayName}
        value={value}
        onChange={handleChange}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
        style={{ width: "100%" }} // remove fixed width
        className="code-mirror-wrapper"
      ></AceEditor>
    </div>
  );
};

export default Editor;
