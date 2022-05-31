import "./styles.css";
import ExampleTheme from "./themes/ExampleTheme";
import LexicalComposer from "@lexical/react/LexicalComposer";
import RichTextPlugin from "@lexical/react/LexicalRichTextPlugin";
import ContentEditable from "@lexical/react/LexicalContentEditable";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import AutoFocusPlugin from "@lexical/react/LexicalAutoFocusPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {ListItemNode, ListNode} from "@lexical/list";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import LinkPlugin from "@lexical/react/LexicalLinkPlugin";
import ListPlugin from "@lexical/react/LexicalListPlugin";
import LexicalMarkdownShortcutPlugin from "@lexical/react/LexicalMarkdownShortcutPlugin";
import {$convertToMarkdownString, TRANSFORMERS} from "@lexical/markdown";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";

function Placeholder() {
    return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
    // The editor theme
    theme: ExampleTheme,
    // Handling of errors during update
    onError(error: any) {
        throw error;
    },
    // Any custom nodes go here
    nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode
    ]
};

function MyFunPlugin() {
    const [editor] = useLexicalComposerContext()

    // editor.update(() => {
    //     const tmp = $generateHtmlFromNodes(editor)
    //     // const root = $getRoot()
    //
    //     console.log(tmp)
    // })

    // editor.update(() => {
    //     const tmp = $convertToMarkdownString(TRANSFORMERS);
    //     console.log("OLOLO:")
    //     console.log(tmp)
    // });


    editor.registerUpdateListener(({editorState}) => {
        // const tmp = $convertToMarkdownString(TRANSFORMERS);
        console.log("OLOLO:")
        // console.log(tmp)


        editorState.read(() => {
            const tmp = $convertToMarkdownString(TRANSFORMERS)
            // const tmp = $generateHtmlFromNodes(editor)
            console.log(tmp)
        })
    })

    let onClick = () => {


        // editor.parseEditorState()

        let editorState = editor.getEditorState();
        console.log(JSON.stringify(editorState))
    }
    return (
        <button onClick={onClick}>Save as JSON</button>
    )
}

export default function RtfEditor() {
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <MyFunPlugin />
            <div className="editor-container">
                <ToolbarPlugin/>
                <div className="editor-inner">
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="editor-input"/>}
                        placeholder={<Placeholder/>}
                    />
                    <HistoryPlugin/>
                    <TreeViewPlugin/>
                    <AutoFocusPlugin/>
                    <CodeHighlightPlugin/>
                    <ListPlugin/>
                    <LinkPlugin/>
                    <AutoLinkPlugin/>
                    <ListMaxIndentLevelPlugin maxDepth={7}/>
                    <LexicalMarkdownShortcutPlugin transformers={TRANSFORMERS}/>
                </div>
            </div>
        </LexicalComposer>
    );
}
