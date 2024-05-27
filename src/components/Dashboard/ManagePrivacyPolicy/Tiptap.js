import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect } from "react";
import Toolbar from "./Toolbar";

const Tiptap = ({ onChange, content }) => {
  const handleChange = useCallback(
    (newContent) => {
      onChange(newContent);
    },
    [onChange]
  );
  console.log(content);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "editor",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  // Update editor content when content prop changes
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <div className='w-full mt-2'>
      <Toolbar editor={editor} content={content} setLink={setLink} />
      {editor && (
        <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
      )}
    </div>
  );
};

export default Tiptap;
