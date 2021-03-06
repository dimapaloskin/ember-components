"use strict";
var Component = require("ember").Component;
var ArrayProxy = require("ember").ArrayProxy;
var run = require("ember").run;
var View = require("ember").View;
var Modal = require("./modal")["default"] || require("./modal");
var ModalToggler, StyleBindingsMixin, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;

StyleBindingsMixin = Em.Eu.StyleBindingsMixin;


/**
 * `{{em-modal-toggler}}` component.
 *
 * A component to toggle the visibility of a modal
 *
 * @class ModalToggler
 * @event on-toggle triggered when the toggler is clicked before changing the visibility of the modal
 *   @param toggler Toggler - This instance of the toggler
 * @public
 */

ModalToggler = Component.extend(WithConfigMixin, StyleBindingsMixin, {
  tagName: 'button',
  classNameBindings: ['styleClasses'],

  /**
   * The CSS classes that will be attached to the DOM element of the modal
   * Classes should be configured externally by using the `config` object.
   *
   * @property styleClasses
   * @private
   * @type String
   */
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.modal.togglerClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),

  /**
   * Toggle the visibility of the modal that this toggler controls.
   *
   * @method toggleVisibility
   * @private
   */
  toggleVisibility: (function() {
    this.sendAction('on-toggle', this);
    return this.get('modal').toggleVisibility();
  }).on('click'),

  /**
   * Find the modal view and set it as a `modal` property
   * A toggler can live as a descendant (not neccessarily a direct one) of a modal or outside of the modal chain
   * TODO: Assert modal existance
   * @method modalAsProperty
   */
  modalAsProperty: (function() {
    var modalAsAncestor;
    modalAsAncestor = this.nearestOfType(Modal);
    if (modalAsAncestor) {
      return this.set('modal', modalAsAncestor);
    } else {
      return run.schedule('afterRender', this, function() {
        return this.set('modal', View.views[this.get('modal-id')]);
      });
    }
  }).on('willInsertElement')
});

exports["default"] = ModalToggler;