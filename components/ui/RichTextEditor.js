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
        const notecardId = window.location.pathname.split("/")[2];

        if (!quillContainer.current || quillContainer.current.editor) {
            return;
        }

        Quill.register('modules/cursors', QuillCursors);
        const noteId = window.location.pathname.split("/")[2];

        const ydoc = new Y.Doc();
        const provider = new WebsocketProvider('ws://localhost:5555', noteId, ydoc);

        const editor = new Quill(quillContainer.current, {
            theme: 'snow',
            modules: {
                cursors: true,
                toolbar: true
            }
        });

        const tokenCookie = document.cookie
            .split(";")
            .find((c) => c.trim().startsWith("token="))
            .split("=")[1];

        let socket = new WebSocket(`ws://localhost:8887?token=${encodeURIComponent(tokenCookie)}`);

        socket.onopen = () => {
            console.log('WebSocket is connected.');
        };

        socket.onerror = (error) => {
            console.error('WebSocket encountered an error:', error);
        };

        socket.onmessage = (event) => {
            console.log('WebSocket received a message:', event.data);
        };

        const encoder = new TextEncoder();

        ydoc.on('update', async () => {
            console.log(socket.readyState)
            if (socket.readyState === WebSocket.OPEN) {
                const update = encoder.encode(ydoc.getText('quill').toJSON());
                console.log(update)
                console.log('Sending update:', JSON.stringify(
                    {
                        type: 'update',
                        token: tokenCookie,
                        data: update,
                        notecardId: notecardId
                    }
                ));
                socket.send(JSON.stringify({
                    type: 'update',
                    token: tokenCookie,
                    data: update,
                    notecardId: notecardId
                }));
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