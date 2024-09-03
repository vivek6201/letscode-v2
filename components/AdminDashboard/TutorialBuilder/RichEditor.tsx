"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TipTapUnderline from "@tiptap/extension-underline";
import TipTapLink from "@tiptap/extension-link";
import TipTapHighlight from "@tiptap/extension-highlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TipTapYoutube from "@tiptap/extension-youtube";
import { all, createLowlight } from "lowlight";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import CharacterCount from "@tiptap/extension-character-count";
import FontFamily from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import FileHandler from "@tiptap-pro/extension-file-handler";
import Image from "@tiptap/extension-image";

import {
  AlignLeft,
  Bold,
  ChevronDown,
  Code,
  Italic,
  Link,
  List,
  ListOrdered,
  MessageSquareQuote,
  Pen,
  Strikethrough,
  SubscriptIcon,
  SuperscriptIcon,
  Underline,
  Youtube,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HexColorPicker } from "react-colorful";
import CustomIcon from "@/components/ui/custom-icon";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Combobox } from "@/components/ui/combobox";

const fonts = [
  {
    value: "Arial",
    label: "Arial",
  },
  {
    value: "Inter",
    label: "Inter",
  },
  {
    value: "Comic Sans MS, Comic Sans",
    label: "Comic Sans",
  },
  {
    value: "Monospace",
    label: "monospace",
  },
  {
    value: "cursive",
    label: "cursive",
  },
];

const Tiptap = (props: any) => {
  const lowlight = createLowlight(all);
  // Initializes the text editor

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      TipTapUnderline,
      TipTapLink.configure({
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          target: "_blank",
          class: "text-blue-400 cursor-pointer",
        },
        validate: (href) => /^https?:\/\//.test(href),
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TipTapHighlight.configure({ multicolor: true }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "bg-black/30",
        },
      }),
      TipTapYoutube.configure({
        nocookie: true,
      }),
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
      CharacterCount.configure(),
      FontFamily.configure({
        types: ["textStyle"],
      }),
      Placeholder.configure({
        // Use a placeholder:
        placeholder: "Write your content…",
      }),
      Image,
      Superscript,
      Subscript,
      FileHandler.configure({
        allowedMimeTypes: [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
        ],
        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: "image",
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach((file) => {
            if (htmlContent) {
              // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
              // you could extract the pasted file from this url string and upload it to a server for example
              console.log(htmlContent); // eslint-disable-line no-console
              return false;
            }

            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(currentEditor.state.selection.anchor, {
                  type: "image",
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "min-h-[300px] px-2 py-5 outline-none",
      },
    },
    immediatelyRender: false,
    content: props.value,

    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      props.onChange(json);
    },
  });

  const [selectedColor, setSelectedColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#FF0000");
  const [videoFrame, setVideoFrame] = useState({
    width: 640,
    height: 480,
  });
  const [fontStyle, setFontStyle] = useState("Inter");

  useEffect(() => {
    editor?.chain().focus().setFontFamily(fontStyle).run();
  }, [fontStyle, editor]);

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      editor?.commands.setYoutubeVideo({
        src: url,
        width: videoFrame.width,
        height: videoFrame.height,
      });
    }
  };

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-md p-2 w-full flex flex-col">
      {/* editor options */}
      <div className="w-full rounded-lg border p-1 flex gap-4 items-center flex-wrap">
        <Combobox
          list={fonts}
          placeholder="Search Font"
          value={fontStyle}
          setValue={setFontStyle}
        />
        {/* headings */}
        <div className="p-1 border rounded-md flex flex-wrap">
          <ToggleButton
            onClick={() =>
              editor.chain().focus().setHeading({ level: 1 }).run()
            }
            editor={editor}
            mode="heading"
            modeAttr={{ level: 1 }}
          >
            <p>H1</p>
          </ToggleButton>
          <ToggleButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            editor={editor}
            mode="heading"
            modeAttr={{ level: 2 }}
          >
            <p>H2</p>
          </ToggleButton>
          <ToggleButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            editor={editor}
            mode="heading"
            modeAttr={{ level: 3 }}
          >
            <p>H3</p>
          </ToggleButton>
          <ToggleButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            editor={editor}
            mode="heading"
            modeAttr={{ level: 4 }}
          >
            <p>H4</p>
          </ToggleButton>
          <ToggleButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            editor={editor}
            mode="heading"
            modeAttr={{ level: 5 }}
          >
            <p>H5</p>
          </ToggleButton>
          <ToggleButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            editor={editor}
            mode="heading"
            modeAttr={{ level: 6 }}
          >
            <p>H6</p>
          </ToggleButton>
        </div>
        <div className="flex items-center justify-between flex-wrap">
          {/* bold */}
          <ToggleButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            editor={editor}
            mode="bold"
          >
            <CustomIcon iconName={Bold} />
          </ToggleButton>
          {/* italic */}
          <ToggleButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            editor={editor}
            mode="italic"
          >
            <CustomIcon iconName={Italic} />
          </ToggleButton>
          {/* underline */}
          <ToggleButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            editor={editor}
            mode="underline"
          >
            <CustomIcon iconName={Underline} />
          </ToggleButton>
          {/* strike */}
          <ToggleButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            editor={editor}
            mode="strike"
          >
            <CustomIcon iconName={Strikethrough} />
          </ToggleButton>
          {/* codeblock */}
          <ToggleButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            editor={editor}
            mode="codeBlock"
          >
            <CustomIcon iconName={Code} />
          </ToggleButton>
          {/* subscript */}
          <ToggleButton
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            editor={editor}
            mode="subscript"
          >
            <CustomIcon iconName={SubscriptIcon} />
          </ToggleButton>
          {/* superscript */}
          <ToggleButton
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            editor={editor}
            mode="superscript"
          >
            <CustomIcon iconName={SuperscriptIcon} />
          </ToggleButton>
        </div>

        <div className="flex gap-1 flex-wrap">
          {/* listItem */}
          <div className="flex items-center gap-1 border rounded-md px-1">
            <ToggleButton
              mode="bulletList"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              editor={editor}
            >
              <CustomIcon iconName={List} />
            </ToggleButton>
            <ToggleButton
              mode="orderedList"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              editor={editor}
            >
              <CustomIcon iconName={ListOrdered} />
            </ToggleButton>
          </div>
          {/* highlighter */}
          <div className="flex items-center border rounded-md p-1">
            <ToggleButton
              editor={editor}
              mode="highlight"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHighlight({ color: selectedColor })
                  .run()
              }
            >
              <span className="flex flex-col">
                <span className="font-mono text-base">A</span>
                <span
                  className={`w-4 h-1`}
                  style={{ backgroundColor: selectedColor }}
                />
              </span>
            </ToggleButton>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant={"ghost"} size={"sm"} type="button">
                  <ChevronDown size={10} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <HexColorPicker
                    color={selectedColor}
                    onChange={setSelectedColor}
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* text color */}
          <div className="flex items-center border rounded-md p-1">
            <ToggleButton
              editor={editor}
              mode="textStyle"
              modeAttr={{ color: textColor }}
              onClick={() => editor.chain().focus().setColor(textColor).run()}
            >
              <span className="flex flex-col gap-1">
                <span className="font-mono text-base">
                  <CustomIcon iconName={Pen} />
                </span>
                <span
                  className={`w-4 h-1`}
                  style={{ backgroundColor: textColor }}
                />
              </span>
            </ToggleButton>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant={"ghost"} size={"sm"} type="button">
                  <ChevronDown size={10} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <HexColorPicker
                    color={editor.getAttributes("textStyle").color}
                    onChange={(color) => {
                      setTextColor(color);
                      editor.chain().focus().setColor(color).run();
                    }}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    type="button"
                    onClick={() => editor.chain().focus().unsetColor().run()}
                    className="w-full"
                  >
                    Reset Color
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex gap-2">
          {/* text align */}
          <ToggleButton
            editor={editor}
            mode={""}
            modeAttr={{ textAlign: "left" }}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <CustomIcon iconName={AlignLeft} />
          </ToggleButton>
          <ToggleButton
            editor={editor}
            mode={""}
            modeAttr={{ textAlign: "center" }}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <CustomIcon iconName={AlignLeft} />
          </ToggleButton>
          <ToggleButton
            editor={editor}
            mode={""}
            modeAttr={{ textAlign: "right" }}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <CustomIcon iconName={AlignLeft} />
          </ToggleButton>
        </div>

        <div className="flex gap-2 items-center">
          {/* youtube video embed */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant={"ghost"} type="button" size={"icon"}>
                <CustomIcon iconName={Youtube} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-[200px]">
              <DropdownMenuItem className="flex gap-3">
                <Input
                  onChange={(e) =>
                    setVideoFrame({
                      ...videoFrame,
                      width: Number(e.target.value),
                    })
                  }
                  value={videoFrame.width}
                  placeholder="Width"
                />
                <Input
                  onChange={(e) =>
                    setVideoFrame({
                      ...videoFrame,
                      height: Number(e.target.value),
                    })
                  }
                  value={videoFrame.height}
                  placeholder="Height"
                />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  type="button"
                  className="w-full"
                  onClick={addYoutubeVideo}
                >
                  Add URL
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* link */}
          <ToggleButton mode="link" onClick={setLink} editor={editor}>
            <CustomIcon iconName={Link} />
          </ToggleButton>

          {/* blockqoute */}
          <ToggleButton
            mode="blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            editor={editor}
          >
            <CustomIcon iconName={MessageSquareQuote} />
          </ToggleButton>
        </div>
      </div>

      {/* editor */}
      <EditorContent
        editor={editor}
        className="prose dark:prose-invert w-full"
      />
      <Separator />
      <div className="flex gap-2 justify-end pt-2 items-end opacity-50 text-sm">
        <p>{editor.storage.characterCount.characters()} Characters</p>|
        <p>{editor.storage.characterCount.words()} words</p>
      </div>
    </div>
  );
};

export default Tiptap;

const ToggleButton = ({
  children,
  editor,
  mode,
  modeAttr,
  onClick,
}: {
  children: React.JSX.Element;
  editor: Editor;
  mode: string;
  modeAttr?: object;
  onClick: () => void;
}) => {
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      type="button"
      className={
        editor.isActive(mode, modeAttr) ? "dark:bg-neutral-800 bg-gray-300" : ""
      }
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
