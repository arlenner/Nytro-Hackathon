import { html } from 'olive-spa'
import './create.css'

const EditorOutput = (editor) =>
    html()
        .div().class('output-card').open()
            .h3().text(editor.title)
            .each(editor.components, (hx, comp) =>
                hx.h4().text(comp.tag.split(/[A-Z]/).join(' '))
                    .div().class('editor-component')
            )

const EditorContainer = (editor) => 
    html()
        .div().class('editor')
            

export const Create = ({editor}) => 
    html()
        .section().class('outlet-main').open()
            .h2().text('this is the Create component')