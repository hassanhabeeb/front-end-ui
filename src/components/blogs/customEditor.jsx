
"use client"
// Ck Editor
import { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  ClassicEditor,     
  Autosave,
  Bold,  
  Underline,
  Essentials,  
  Heading,  
  Italic,  
  Paragraph,  
  TextTransformation,
  Undo,
  List,  
  Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,	
  Alignment,
  Image,
  ImageUpload,
  Link,
  Base64UploadAdapter,
  ImageStyle,
  ImageResize,
  ImageToolbar,
  ImageCaption,
  LinkImage,
  Font
} from "ckeditor5";

const CustomEditor = ({editorRef, disabled, initialData, onChange}) => {
  const editorContainerRef = useRef();  
  const [isLayoutReady, setIsLayoutReady]=useState(false);
  const [content, setContent]= useState(""); // for description  
  
   // Setting layout for Ckeditor
   useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  // Editor configuration for description
  const ckeditorConfig = {
    // ... (keep plugins and toolbar as is, or use ...ckeditorConfig if possible, but here we are replacing the whole component logic usually? No, I should use replace_file_content carefully)
    // Actually, I can't easily reference local "ckeditorConfig" variable content if I replace the whole function.
    // I will try to target specific blocks.
    plugins: [      
      Autosave,
      Bold,
      Underline,
      Essentials,
      Heading,
      Italic,
      Paragraph,      
      List,      
      TextTransformation,
      Alignment,
      Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
      Undo,
      Image,
      ImageUpload,
      Link,
      Base64UploadAdapter,
      ImageStyle,
      ImageResize,
      ImageToolbar,
      ImageCaption,
      LinkImage,
      Font
    ],
    toolbar: {
      items: [
        "undo",
        "redo",
        "heading",
        "bold",
        'underline',
        "italic",
        "|",
        "bulletedList", 
        "numberedList"   ,
        "|",
        "alignment",
        "|",
        "link",
        "uploadImage",
        "|",
        "fontColor",
        "fontBackgroundColor"
      ],
      shouldNotGroupWhenFull: false,
    },
    image: {
      resizeOptions: [
        {
          name: 'resizeImage:original',
          label: 'Original',
          value: null
        },
        {
          name: 'resizeImage:50',
          label: '50%',
          value: '50'
        },
        {
          name: 'resizeImage:75',
          label: '75%',
          value: '75'
        }
      ],
      resizeUnit: '%',
      toolbar: [
        'imageStyle:alignLeft',
        'imageStyle:alignCenter',
        'imageStyle:alignRight',
        '|',
        'resizeImage'
      ],
      styles: ['alignLeft', 'alignCenter', 'alignRight']
    },
    link: {
      decorators: {
        openInNewTab: {
          mode: 'manual', // or 'automatic'
          label: 'Open in a new tab',
          attributes: {
            target: '_blank',
            rel: 'noopener noreferrer'
          }
        }
      }
    },
    alignment: {
      options: [ 'left', 'right', 'center', 'justify' ]
    },
    list: {
        properties: {
            styles: true,
            startIndex: true,
            reversed: true
        }
      },    
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
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    menuBar: {
      isVisible: true,
    },
    table: {
			contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
		}
  }
  // Editor configuration for description
  const editorConfig={    
    ...ckeditorConfig,
    placeholder: "Description",
  };

  return (
    <div>
         <div
            className="editor-container editor-container_classic-editor mb-4"
            ref={editorContainerRef}
        >
            <div className="editor-container__editor">
                <div ref={editorRef}>
                {isLayoutReady&&(
                    <CKEditor                    
                      editor={ClassicEditor}
                      config={editorConfig}
                      data={initialData || content || ""}
                      onReady={(editor) => {
                          if (editorRef) {
                              editorRef.current=editor
                          }
                      }}                                              
                      disabled={disabled || false}
                      onChange={(event, editor) => {
                        if (onChange) {
                            onChange(editor.getData());
                        }
                      }}
                    />
                )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CustomEditor