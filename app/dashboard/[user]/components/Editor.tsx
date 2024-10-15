//Editor.jsx

'use client';
import EditorJS from "@editorjs/editorjs";
import classes from '../../../../styles/editorjs.module.css';
import { useEffect, useRef } from "react";
import { EDITOR_CONFIG } from "../../../../editor.config"

//@ts-ignore
const Editor = ({ value, onChange, holder }) => {

    const ref = useRef();

    useEffect(() => {

        if (!ref.current) {
            const editor = new EditorJS({
                holder: holder,
                //@ts-ignore
                tools: EDITOR_CONFIG,
                placeholder: 'Ecrire le contenu de votre article',
                data: value,
                async onChange(api, event) {
                    const data = await api.saver.save();
                    onChange(data);
                },
                i18n: {
                    //@ts-ignore
                    toolNames: {
                        Hyperlink: 'Link'
                    },
                    tools: {
                        hyperlink: {
                            Save: 'Salvar',
                            'Select target': 'Seleziona destinazione',
                            'Select rel': 'Wählen rel'
                        }
                    }
                }
            })
            //@ts-ignore
            ref.current = editor;
        }

        return () => {
            //@ts-ignore
            if (ref.current && ref.current.destroy) {
                //@ts-ignore
                ref.current.destroy();
            }
        };
    }, []);


    return (
        //@ts-ignore
        <div id={holder} className={classes.editorjs} py={4} border={'1px solid rgb(190, 195, 224, 0.4)'} borderRadius={6} />
    )
}


export default Editor;