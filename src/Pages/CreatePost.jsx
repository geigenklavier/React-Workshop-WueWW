import React from "react";
import { Redirect } from "react-router";

function useFormFieldState(defaultValue) {
  const [state, setState] = React.useState(defaultValue);
  function onChange(event) {
    setState(event.target.value);
  }
  return [state, onChange];
}

function savePost(author, title, text) {
  return fetch(
    "https://firestore.googleapis.com/v1/projects/reactworkshop-13106/databases/(default)/documents/Post",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fields: {
          author: { stringValue: author },
          title: { stringValue: title },
          text: { stringValue: text }
        }
      })
    }
  );
}

export function CreatePost() {
  const [author, onAuthorChange] = useFormFieldState("Lukas");
  const [title, onTitleChange] = useFormFieldState("");
  const [text, onTextChange] = useFormFieldState("");

  const [status, setStatus] = React.useState("none");

  function onSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    savePost(author, title, text)
      .then(function() {
        setStatus("done");
      })
      .catch(function() {
        setStatus("error");
      });
  }

  if (status === "error") {
    return <div>There was an error</div>;
  }

  if (status === "done") {
    return <Redirect to="/posts" />;
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Autor: <input type="text" value={author} onChange={onAuthorChange} />
      </label>
      <br />
      <label>
        Titel: <input type="text" value={title} onChange={onTitleChange} />
      </label>
      <br />
      <label>
        Inhalt: <textarea value={text} onChange={onTextChange} />
      </label>
      <br />
      <button disabled={status === "sending"}>Fertig</button>
    </form>
  );
}
