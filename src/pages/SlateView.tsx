import React, { useState, useMemo } from 'react'
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'
import { Transforms, createEditor, Descendant } from 'slate'
import {
    Slate,
    Editable,
    useSlateStatic,
    useSelected,
    useFocused,
    withReact,
} from 'slate-react'
import { withHistory } from 'slate-history'
import { css } from '@emotion/css'

import { Button, Icon } from '../components/components'
import { CustomEditor, ImageElement} from './custom-types'

const ImagesExample = () => {
    const [value, setValue] = useState<Descendant[]>(initialValue)
    const editor = useMemo(
        () => withImages(withHistory(withReact(createEditor()))),
        []
    )

    return (
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
            <InsertImageButton/>
            <Editable
                renderElement={props => <Element {...props} />}
                placeholder="Enter some text..."
            />
        </Slate>
    )
}

const withImages = (editor: CustomEditor) => {
    const { insertData, isVoid } = editor

    editor.isVoid = element => {
        return element.type === 'image' ? true : isVoid(element)
    }

    editor.insertData = data => {
        const text = data.getData('text/plain')
        const { files } = data

        if (files && files.length > 0) {
            // @ts-ignore
            for (const file of files) {
                const reader = new FileReader()
                const [mime] = file.type.split('/')

                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result as string
                        insertImage(editor, url)
                    })

                    reader.readAsDataURL(file)
                }
            }
        } else if (isImageUrl(text)) {
            insertImage(editor, text)
        } else {
            insertData(data)
        }
    }

    return editor
}

const insertImage = (editor: CustomEditor, url: string) => {
    const text = { text: '' }
    const image: ImageElement = { type: 'image', url, children: [text] }
    Transforms.insertNodes(editor, image)
}

const Element = (props: JSX.IntrinsicAttributes & { attributes: any; children: any; element: any }) => {
    const { attributes, children, element } = props

    switch (element.type) {
        case 'image':
            return <Image {...props} />
        default:
            return <p {...attributes}>{children}</p>
    }
}

// @ts-ignore
const Image = ({ attributes, children, element }) => {
    const selected = useSelected()
    const focused = useFocused()
    return (
        <div {...attributes}>
            <div contentEditable={false}>
                <img
                    src={element.url}
                    className={css`
            display: block;
            max-width: 100%;
            max-height: 20em;
            box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
          `}
                />
            </div>
            {children}
        </div>
    )
}

const InsertImageButton = () => {
    const editor = useSlateStatic()
    return (
        <Button
            onMouseDown={(event: { preventDefault: () => void }) => {
                event.preventDefault()
                const url = window.prompt('Enter the URL of the image:')
                if (url && !isImageUrl(url)) {
                    alert('URL is not an image')
                    return
                }
                insertImage(editor, url!)
            }}
        >
            <Icon>image</Icon>
        </Button>
    )
}

const isImageUrl = (url: string) => {
    if (!url) return false
    if (!isUrl(url)) return false
    const ext = new URL(url).pathname.split('.').pop()
    return imageExtensions.includes(ext!)
}

const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [
            {
                text:
                    'In addition to nodes that contain editable text, you can also create other types of nodes, like images or videos.',
            },
        ],
    },
    {
        type: 'image',
        url: 'https://source.unsplash.com/kFrdX5IeQzI',
        children: [{ text: '' }],
    },
    {
        type: 'paragraph',
        children: [
            {
                text:
                    'This example shows images in action. It features two ways to add images. You can either add an image via the toolbar icon above, or if you want in on a little secret, copy an image URL to your clipboard and paste it anywhere in the editor!',
            },
        ],
    },
]

export default ImagesExample