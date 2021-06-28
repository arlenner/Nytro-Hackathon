import { html } from 'olive-spa'
import { useState } from '../../utils/useState'
import './create.css'

const EditorOutput = (editor) =>
    html()
        .div()
        .class('output-card')
        .nest()
            .h3()
            .text(editor.title)
            .each(editor.components, (hx, comp) =>
                hx
                    .h4()
                    .text(comp.tag.split(/[A-Z]/).join(' '))
                    .div()
                    .class('editor-component')
            )

const ModifyInstantComponent = () =>
    html()

const ModifyPerTurnComponent = () =>
    html()

const ConditionalComponent = () =>
    html()

const AddComponentButton = () => {

    const [numComps, setNumComps] = useState(0)

    return html()
        .button()
        .text('+')
        .class('add-cmp-btn')
        .on('click', hx => {
            if(numComps() >= 3) return
            setNumComps(numComps()+1)
            hx.insertBefore(ComponentContainer())
        })
}
        

const ComponentContainer = () => 
    html()
        .div()
        .class('component-container')
        .nest()
            .p()
            .text('')
            .select()
        

const EditorForm = editor => 
    html()
        .div()
        .class('editor-form').nest()
            //title
            .p()
            .text('TITLE')
            .input()
            .type('text')
            .placeholder('<title>')
            .class('editor-input')
            //img
            .p()
            .text('IMAGE URL')
            .input()
            .type('text')
            .class('editor-input')
            //components
            .div()
            .class('components')
            .nest()
                .p()
                .text('COMPONENTS')
                .concat(AddComponentButton())
                

const EditorDivider = () => 
    html()
        .div()
        .class('editor-divider')

const EditorContainer = (editor) => 
    html()
        .div()
        .class('editor-container')
        .nest()
            .concat(EditorOutput(editor))
            .concat(EditorDivider())
            .concat(EditorForm(editor))
            

export const Create = ({editor}) => 
    html()
        .section()
        .class('outlet-main')
        .nest()
            .concat(EditorContainer(editor))