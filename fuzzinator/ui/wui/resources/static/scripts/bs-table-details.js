/*
 * Copyright (c) 2019 Tamas Keri.
 * Copyright (c) 2019 Renata Hodovan, Akos Kiss.
 *
 * Licensed under the BSD 3-Clause License
 * <LICENSE.rst or https://opensource.org/licenses/BSD-3-Clause>.
 * This file may not be copied, modified, or distributed except
 * according to those terms.
 */

(function ($) {
  'use strict';

  var BootstrapTable = $.fn.bootstrapTable.Constructor;
  var _initBody = BootstrapTable.prototype.initBody;
  var _init = BootstrapTable.prototype.init;
  var utils = $.fn.bootstrapTable.utils;

  // Extend init method with initiating a member to keep track of the opened rows.
  BootstrapTable.prototype.init = function () {
    this.options.openRows = [];
    _init.apply(this, Array.prototype.slice.apply(arguments));
  };

  // Extend initBody to automatically open the detail view of a rows if it was saved as open.
  BootstrapTable.prototype.initBody = function (fixedScroll) {
    _initBody.apply(this, [fixedScroll]);
    var that = this;
    var data = this.getData();

    for (var openIndex of this.options.openRows) {
      var $this = this.$body.find(`> tr[data-index=${openIndex}] > td > .detail-icon`);
      var $tr = $this.parent().parent();
      var index = $tr.data('index');
      var row = data[index];

      $this.find('i').attr('class', `${that.options.iconsPrefix} ${that.options.icons.detailClose}`);
      var colSpan = $tr.find('td').length;
      $tr.after(`<tr class="detail-view"><td colspan="${colSpan}"></td></tr>`);
      var $element = $tr.next().find('td');
      var content = utils.calculateObjectValue(that.options, that.options.detailFormatter, [index, row, $element], '');
      if ($element.length === 1) {
        $element.append(content);
      }
    }
  };
})(jQuery);