// App.jsx / App.tsx

import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CKEditorComponent = ({ onChange }) => {
  return (
    <div className="App">
      <CKEditor
        editor={ClassicEditor}
        config={{
          // removePlugins: [ 'Paragraph' ],
          removePlugins: [
            "Link",
            "CKFinder",
            "Image",
            "Media",
            "EasyImage",
            "MediaEmbed",
          ],
          // toolbar: [ 'bold', 'italic', '|', 'undo', 'redo' ]
          // toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'TableSelection', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo'],
          // toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'tables', 'numberedList', 'blockQuote' ],
          heading: {
            options: [
              {
                model: "paragraph",
                title: "Paragraph",
                class: "ck-heading_paragraph",
              },
              {
                model: "heading1",
                view: "h1",
                title: "Heading 1",
                class: "ck-heading_heading1",
              },
              {
                model: "heading2",
                view: "h2",
                title: "Heading 2",
                class: "ck-heading_heading2",
              },
            ],
          },
        //   height:['560px']
        }}
        data=""
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          onChange(event, editor.getData());
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default CKEditorComponent;
