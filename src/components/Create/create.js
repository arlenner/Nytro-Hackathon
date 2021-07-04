import { html } from 'olive-spa'
import { useState } from '../../utils/useState'
import { CreateDispatcher, ADD_COMPONENT, ADD_SUCCESS } from './create-dispatcher'
import './create.css'

const EditorOutput = () =>
    html()
        .div()
        .class('output-card')
        .nest()
            .h3()
            .text("editor.title")
            // .each(editor.components, (hx, comp) =>
            //     hx
            //         .h4()
            //         .text(comp.tag.split(/[A-Z]/).join(' '))
            //         .div()
            //         .class('editor-component')
            // )

const ModifyInstantComponent = () =>
    html()

const ModifyPerTurnComponent = () =>
    html()

const ConditionalComponent = () =>
    html()

const AddComponentButton = () => {

    //const [numComps, setNumComps] = useState(0)

    return html()
        .button()
        .use(CreateDispatcher)
        .text('+')
        .class('add-cmp-btn')
        .on('click', hx => hx.dispatch(ADD_COMPONENT, CreateDispatcher.state()))
        .subscribe({
            [ADD_SUCCESS]: hx => hx.concat(ComponentContainer())
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
        

const EditorForm = () => 
    html()
        .div()
        .class('editor-form').nest()
            //title
            .p()
            .text('TITLE')
            .input()
            .typeAttr('text')
            .placeholderAttr('<title>')
            .class('editor-input')
            //img
            .p()
            .text('IMAGE URL')
            .input()
            .typeAttr('text')
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

const EditorContainer = () => 
    html()
        .div()
        .class('editor-container')
        .nest()
            .concat(EditorOutput())
            .concat(EditorDivider())
            .concat(EditorForm())
            

export const Create = () => 
    html()
        .section()
        .class('outlet-main')
        .nest()
            .concat(EditorContainer())
    