/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {
    DOMChildConversion,
    DOMConversion,
    DOMConversionFn,
    GridSelection,
    LexicalEditor,
    LexicalNode,
    NodeSelection,
    RangeSelection,
    TextNode,
} from 'lexical';
import {$getRoot, $isElementNode, $isGridSelection, $isRangeSelection, $isTextNode} from 'lexical';

import {$cloneWithProperties,} from '@lexical/selection';

export function $sliceSelectedTextNodeContent(
    selection: RangeSelection | GridSelection | NodeSelection,
    textNode: TextNode,
): LexicalNode {
    if (
        textNode.isSelected() &&
        !textNode.isSegmented() &&
        !textNode.isToken() &&
        ($isRangeSelection(selection) || $isGridSelection(selection))
    ) {
        const anchorNode = selection.anchor.getNode();
        const focusNode = selection.focus.getNode();
        const isAnchor = textNode.is(anchorNode);
        const isFocus = textNode.is(focusNode);

        if (isAnchor || isFocus) {
            const isBackward = selection.isBackward();
            const [anchorOffset, focusOffset] = selection.getCharacterOffsets();
            const isSame = anchorNode.is(focusNode);
            const isFirst = textNode.is(isBackward ? focusNode : anchorNode);
            const isLast = textNode.is(isBackward ? anchorNode : focusNode);
            let startOffset = 0;
            let endOffset = undefined;

            if (isSame) {
                startOffset = anchorOffset > focusOffset ? focusOffset : anchorOffset;
                endOffset = anchorOffset > focusOffset ? anchorOffset : focusOffset;
            } else if (isFirst) {
                const offset = isBackward ? focusOffset : anchorOffset;
                startOffset = offset;
                endOffset = undefined;
            } else if (isLast) {
                const offset = isBackward ? anchorOffset : focusOffset;
                startOffset = 0;
                endOffset = offset;
            }

            textNode.__text = textNode.__text.slice(startOffset, endOffset);
            return textNode;
        }
    }
    return textNode;
}

/**
 * How you parse your html string to get a document is left up to you. In the browser you can use the native
 * DOMParser API to generate a document (see clipboard.ts), but to use in a headless environment you can use JSDom
 * or an equivilant library and pass in the document here.
 */
export function $generateNodesFromDOM(
    editor: LexicalEditor,
    dom: Document,
): Array<LexicalNode> {
    let lexicalNodes: any[] = [];
    const elements: Array<Node> = dom.body ? Array.from(dom.body.childNodes) : [];
    const elementsLength = elements.length;

    for (let i = 0; i < elementsLength; i++) {
        const element = elements[i];

        if (!IGNORE_TAGS.has(element.nodeName)) {
            const lexicalNode = $createNodesFromDOM(element, editor);

            if (lexicalNode !== null) {
                lexicalNodes = lexicalNodes.concat(lexicalNode);
            }
        }
    }

    return lexicalNodes;
}

export function $generateHtmlFromNodes(
    editor: LexicalEditor,
    selection?: RangeSelection | NodeSelection | GridSelection | null,
): string {
    if (document == null || window == null) {
        throw new Error(
            'To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.',
        );
    }

    const container = document.createElement('div');
    const root = $getRoot();
    const topLevelChildren = root.getChildren();

    for (let i = 0; i < topLevelChildren.length; i++) {
        const topLevelNode = topLevelChildren[i];
        // @ts-ignore
        $appendNodesToHTML(editor, selection, topLevelNode, container);
    }

    return container.innerHTML;
}

function $appendNodesToHTML(
    editor: LexicalEditor,
    selection: RangeSelection | NodeSelection | GridSelection | null,
    currentNode: LexicalNode,
    parentElement: HTMLElement | DocumentFragment,
): boolean {
    let shouldInclude = selection != null ? currentNode.isSelected() : true;
    const shouldExclude =
        $isElementNode(currentNode) && currentNode.excludeFromCopy('html');
    let clone = $cloneWithProperties<LexicalNode>(currentNode);
    clone =
        $isTextNode(clone) && selection != null
            ? $sliceSelectedTextNodeContent(selection, clone)
            : clone;
    const children = $isElementNode(clone) ? clone.getChildren() : [];
    const {element, after} = clone.exportDOM(editor);

    if (!element) {
        return false;
    }

    const fragment = new DocumentFragment();

    for (let i = 0; i < children.length; i++) {
        const childNode = children[i];
        const shouldIncludeChild = $appendNodesToHTML(
            editor,
            selection,
            childNode,
            fragment,
        );

        if (
            !shouldInclude &&
            $isElementNode(currentNode) &&
            shouldIncludeChild &&
            // @ts-ignore
            currentNode.extractWithChild(childNode, selection, 'html')
        ) {
            shouldInclude = true;
        }
    }

    if (shouldInclude && !shouldExclude) {
        element.append(fragment);
        parentElement.append(element);

        if (after) {
            const newElement = after.call(clone, element);
            if (newElement) element.replaceWith(newElement);
        }
    } else {
        parentElement.append(fragment);
    }

    return shouldInclude;
}

function getConversionFunction(
    domNode: Node,
    editor: LexicalEditor,
): DOMConversionFn | null {
    const {nodeName} = domNode;

    const cachedConversions = editor._htmlConversions.get(nodeName.toLowerCase());

    let currentConversion: DOMConversion | null = null;

    if (cachedConversions !== undefined) {
        cachedConversions.forEach((cachedConversion) => {
            const domConversion = cachedConversion(domNode);

            if (domConversion !== null) {
                if (
                    currentConversion === null ||
                    currentConversion.priority < domConversion.priority
                ) {
                    currentConversion = domConversion;
                }
            }
        });
    }

    // @ts-ignore
    return currentConversion !== null ? currentConversion.conversion : null;
}

const IGNORE_TAGS = new Set(['STYLE']);

function $createNodesFromDOM(
    node: Node,
    editor: LexicalEditor,
    forChildMap: Map<string, DOMChildConversion> = new Map(),
    parentLexicalNode?: LexicalNode | null | undefined,
): Array<LexicalNode> {
    let lexicalNodes: Array<LexicalNode> = [];

    if (IGNORE_TAGS.has(node.nodeName)) {
        return lexicalNodes;
    }

    let currentLexicalNode = null;
    const transformFunction = getConversionFunction(node, editor);
    const transformOutput = transformFunction ? transformFunction(node) : null;
    let postTransform = null;

    if (transformOutput !== null) {
        postTransform = transformOutput.after;
        currentLexicalNode = transformOutput.node;

        if (currentLexicalNode !== null) {
            // @ts-ignore
            for (const [, forChildFunction] of forChildMap) {
                currentLexicalNode = forChildFunction(
                    currentLexicalNode,
                    parentLexicalNode,
                );

                if (!currentLexicalNode) {
                    break;
                }
            }

            if (currentLexicalNode) {
                lexicalNodes.push(currentLexicalNode);
            }
        }

        if (transformOutput.forChild != null) {
            forChildMap.set(node.nodeName, transformOutput.forChild);
        }
    }

    // If the DOM node doesn't have a transformer, we don't know what
    // to do with it but we still need to process any childNodes.
    const children = node.childNodes;
    let childLexicalNodes = [];

    for (let i = 0; i < children.length; i++) {
        childLexicalNodes.push(
            ...$createNodesFromDOM(
                children[i],
                editor,
                new Map(forChildMap),
                currentLexicalNode,
            ),
        );
    }

    if (postTransform != null) {
        childLexicalNodes = postTransform(childLexicalNodes);
    }

    if (currentLexicalNode == null) {
        // If it hasn't been converted to a LexicalNode, we hoist its children
        // up to the same level as it.
        lexicalNodes = lexicalNodes.concat(childLexicalNodes);
    } else {
        if ($isElementNode(currentLexicalNode)) {
            // If the current node is a ElementNode after conversion,
            // we can append all the children to it.
            currentLexicalNode.append(...childLexicalNodes);
        }
    }

    return lexicalNodes;
}