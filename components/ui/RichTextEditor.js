"use client";

import "quill/dist/quill.snow.css";

import React, {useEffect, useRef} from 'react';
import * as Y from 'yjs';
import '../../styles/quillEditorStyles.css'
import {WebsocketProvider} from "y-websocket";
import {QuillBinding} from "y-quill";
import Quill from "quill";
import QuillCursors from 'quill-cursors';

function RichTextEditor() {
    const quillContainer = useRef(null);

    useEffect(() => {
        if (!quillContainer.current || quillContainer.current.editor) {
            return;
        }

        Quill.register('modules/cursors', QuillCursors);

        const ydoc = new Y.Doc();
        const provider = new WebsocketProvider('ws://localhost:5555', 'quill-demo', ydoc);

        const editor = new Quill(quillContainer.current, {
            theme: 'snow',
            modules: {
                cursors: true,
                toolbar: true
            }
        });


        quillContainer.current.editor = editor;

        provider.on('status', (event) => {
            if (event.status === 'connected') {
                const binding = new QuillBinding(ydoc.getText('quill'), editor, provider.awareness);
            }
        });
    }, []);

    return (
        <div ref={quillContainer} style={{ height: '500px' }} />
    );
}

export default RichTextEditor;