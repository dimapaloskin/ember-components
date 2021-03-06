define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var ArrayProxy = __dependency1__.ArrayProxy;
    var run = __dependency1__.run;


    /**
     * A confirmation modal with 'Yes' & 'No' buttons
     * When 'no' is pressed the modal is just closed.
     * When 'yes' is pressed an action bound to the action on the controller set in the `confirm` property is invoked, 
     * giving the controller a chance to decide whether to close the modal or not.
     *
     * @class ModalConfirm
     */
    var ModalConfirm;

    ModalConfirm = Component.extend({
      layoutName: 'em-modal-confirm',

      /**
       * Bound to the action on the controller to be invoked when the 'yes' button is pressed.
       * @property confirm
       * @public
       */
      confirm: "confirm",

      /**
       * The default title of the modal if not set otherwise.
       *
       * @property title
       * @public
       */
      title: 'Please confirm',

      /**
       * The default message of the modal if not set otherwise.
       *
       * @property message
       * @public
       */
      message: 'Please press Yes to confirm the operation.',
      actions: {

        /**
         * Invoked when the user clicks the "Yes" button, triggers an action on the controller.
         * 
         * @method confirmPressed
         * @private
         */
        confirmPressed: function() {
          return this.sendAction('confirm');
        }
      }
    });

    __exports__["default"] = ModalConfirm;
  });