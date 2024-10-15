import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Embed from "@editorjs/embed";
import InlineCode from "@editorjs/inline-code";
import Hyperlink from "editorjs-hyperlink";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import Image from '@editorjs/image';

const EDITOR_CONFIG = {

    code: Code,

    header: {
        class: Header,
        config: {
            placeholder: 'Enter a Heading',
            levels: [2, 3, 4], //configure heading tags (e.g. h1,h2,h3 etc) to be shown in editorjs component
            defaultLevel: 2
        }
    },

    hyperlink: {
        class: Hyperlink,
        config: {
            shortcut: 'CMD+L',
            target: '_blank',
            rel: 'nofollow',
            availableTargets: ['_blank', '_self'],
            availableRels: ['author', 'noreferrer'],
            validate: false,
        }
    },

    paragraph: {
        class: Paragraph,
        inlineToolbar: true
    },

    image: {
        class: Image,
        config: {
            // endpoints : {
            //     byFile : "http://localhost:8787/image/uploadFile"
            // },
            // field : 'images',
            uploader: {
                uploadByFile: async (file) => { //this function will be triggered when image gets selected
                    const bodyContent = new FormData()
                    bodyContent.append('images', file)
                    const request = await fetch("http://localhost:8787/image/uploadFile", {
                        method : 'POST', 
                        body : bodyContent
                    })
                    
                    if(request.ok){
                        const result = await request.json()
                        console.log(result)
                        return result
                    }
                }
            }
        }

    },

    checklist: CheckList,

    embed: Embed,

    inlineCode: InlineCode,

    list: {
        class: List,
        inlineToolbar: true
    },

    quote: Quote
}

export { EDITOR_CONFIG }
