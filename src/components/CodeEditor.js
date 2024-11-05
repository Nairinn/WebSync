import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

function CodeEditor({ username }) {
  const editorRef = useRef(null);
  const monacoEditorRef = useRef(null);
  const stompClient = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      monacoEditorRef.current = monaco.editor.create(editorRef.current, {
        value: '// Start coding here...',
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true,
      });

      // Set up WebSocket connection
      const socket = new SockJS('http://localhost:8080/websync-websocket');
      stompClient.current = Stomp.over(socket);

      stompClient.current.connect({}, () => {
        stompClient.current.subscribe('/topic/code', (message) => {
          const codeUpdate = JSON.parse(message.body);
          if (codeUpdate.sender !== username) {
            const position = monacoEditorRef.current.getPosition();
            monacoEditorRef.current.setValue(codeUpdate.content);
            monacoEditorRef.current.setPosition(position);
          }
        });
      });

      // Send code updates
      monacoEditorRef.current.onDidChangeModelContent(() => {
        if (stompClient.current) {
          stompClient.current.send('/app/code', {}, JSON.stringify({
            sender: username,
            content: monacoEditorRef.current.getValue(),
            type: 'CODE',
          }));
        }
      });
    }

    return () => {
      if (monacoEditorRef.current) {
        monacoEditorRef.current.dispose();
      }
      if (stompClient.current) {
        stompClient.current.disconnect();
      }
    };
  }, [username]);

  return <div ref={editorRef} style={{ width: '100%', height: '100%' }} />;
}

export default CodeEditor;