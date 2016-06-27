function getEditor(textareaId) {
        var delay;
        var editor;
        var textarea = document.getElementById(textareaId);

        if (textarea) {
            editor = CodeMirror.fromTextArea(textarea, {
            lineNumbers: true,
            lineWrapping: true,
            matchBrackets: true,
            styleActiveLine: true,
            styleSelectedText: true
        })
        };
        
        return {
            bindPreview: function (preview) {
                if (editor) {
                    editor.on("change", function () {
                    clearTimeout(delay);
                    delay = setTimeout(preview.update, 300, editor);
                });
                    setTimeout(preview.update, 100, editor);
                }
            },
            setSize: function (width, height) {
                if (editor) {
                    editor.setSize(width, height);
                }
            }
        }
}
    
function getPreview(previewFrameId) {
        var previewFrame = document.getElementById(previewFrameId);
        var update = function(editor) {
            var preview = previewFrame.contentDocument ||                       previewFrame.contentWindow.document;
            preview.open();
            preview.write(editor.getValue());
            preview.close();
        }
        
        return {
            update: update,
            setHeight: function(height) {
                if (previewFrame) {
                    previewFrame.height=height;
                }
            }
        }
}

function editorPreviewSideBySide(editorId, editorWidthInPer, editorHeight, previewId) {
    var editor = getEditor(editorId);
    editor.setSize(editorWidthInPer, editorHeight);
    var preview = getPreview(previewId);
    preview.setHeight(editorHeight+"px");
    editor.bindPreview(preview);
}