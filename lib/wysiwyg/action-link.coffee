#(c) 2014 Indexia, Inc.

`import {Component, computed, Handlebars} from 'ember';`
`import Modal from '../modal/modal';`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin

Link = Component.extend WithConfigMixin,
    tagName: 'a'
    layoutName: 'em-wysiwyg-action'
    classNameBindings: ['styleClasses', 'activeClasses']
    linkHref: ''
    
    initModal: (->
        container = @get 'container'

        container.register 'view:link-modal-view'+@get('_parentView._uuid'), Modal.extend({
            templateName: 'em-wysiwyg-action-link'
            _parentView: @,
            configName: 'bs'
        })

        @set 'modal', container.lookup('view:link-modal-view'+@get('_parentView._uuid'))
        @get('modal').append()
    ).on('init')

    styleClasses: (->
        @get('config.wysiwyg.actionClasses')?.join(" ")
    ).property()

    activeClasses: (->
        if @get('active')
            @get('config.wysiwyg.actionActiveClasses')?.join(" ")
    ).property 'active'

    selection: null,

    actions:
        addLink: ->
            @get('editor').restoreSelection()
            @get('editor').$().focus()

            if @get 'linkHref'
                document.execCommand 'CreateLink', 0, @get 'linkHref'
            else
                document.execCommand 'unlink', 0

            window.getSelection().extentNode.data = @get 'selection'
            @get('editor').saveSelection()
            @get('wysiwyg').trigger 'update_actions'
            @get('modal').close()

    click: ->
        selection = window.getSelection()
        if selection
            @set 'selection', selection

        @get('modal').open()
        

    wysiwyg: computed.alias 'parentView.wysiwyg'
    editor: computed.alias 'wysiwyg.editor'
    
    listenToUpdate: (->
        @get('wysiwyg').on('update_actions', =>
            container = @get('editor.selectionRange').commonAncestorContainer
            container = container.parentNode if container.nodeType == 3
            if container.nodeName is "A" 
                @set('linkHref', Ember.$(container).attr('href'))
                @set 'active', true
            else 
                @set 'linkHref', ''
                @set 'active', false
        )
    ).on('init'),

    onDelete: (->
        console.log @get('modal')
        window.mm = @get 'modal'
        @get('modal').remove()
    ).on('willDestroyElement')

`export default Link;`
