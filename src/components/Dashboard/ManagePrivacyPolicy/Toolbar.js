"use client";

import {
  Bold,
  Code,
  Heading2,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";

const Toolbar = ({ editor, content, setLink }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className='toolbar_container'>
      <div className='toolbar_item'>
        <button
          onClick={setLink}
          className={`toolbar_item_btn ${
            editor.isActive("link") ? "active_b" : ""
          }`}>
          <Link2 />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={`toolbar_item_btn ${
            editor.isActive("bold") ? "active_b" : ""
          }`}>
          <Bold className='' />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={`toolbar_item_btn ${
            editor.isActive("italic") ? "active_b" : ""
          }`}>
          <Italic />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={`toolbar_item_btn ${
            editor.isActive("underline") ? "active_b" : ""
          }`}>
          <Underline />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={`toolbar_item_btn ${
            editor.isActive("strike") ? "active_b" : ""
          }`}>
          <Strikethrough />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={`toolbar_item_btn ${
            editor.isActive("heading") ? "active_b" : ""
          }`}>
          <Heading2 />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={`toolbar_item_btn ${
            editor.isActive("bulletList") ? "active_b" : ""
          }`}>
          <List />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={`toolbar_item_btn ${
            editor.isActive("orderedList") ? "active_b" : ""
          }`}>
          <ListOrdered />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={`toolbar_item_btn ${
            editor.isActive("blockquote") ? "active_b" : ""
          }`}>
          <Quote />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={`toolbar_item_btn ${
            editor.isActive("code") ? "active_b" : ""
          }`}>
          <Code />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={`toolbar_item_btn ${
            editor.isActive("undo") ? "active_b" : ""
          }`}>
          <Undo />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={`toolbar_item_btn ${
            editor.isActive("redo") ? "active_b" : ""
          }`}>
          <Redo className='w-5 h-5' />
        </button>
      </div>
      {/* {content && (
        <button
          type='submit'
          className='px-4 bg-sky-700 text-white py-2 rounded-md'>
          Add
        </button>
      )} */}
    </div>
  );
};

export default Toolbar;
