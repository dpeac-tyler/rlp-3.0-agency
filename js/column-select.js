/**
 * Customizable-columns select — shared by every table that has one.
 * Markup contract (see queues.html / search.html for reference):
 *   <div class="multiselect table-controls__column-select">
 *     <button class="multiselect-trigger" id="...">
 *       <span class="multiselect-trigger-text"></span>
 *       <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
 *     </button>
 *     <div class="multiselect-panel" id="..." hidden>
 *       <input type="text" class="multiselect-filter" id="..." placeholder="Filter columns…">
 *       <label class="multiselect-option"><input type="checkbox" class="column-checkbox" data-column="N" checked><span>Label</span></label>
 *       ...
 *     </div>
 *   </div>
 *
 * Usage:
 *   initColumnSelect({ triggerId: '...', panelId: '...', filterId: '...', tableId: '...' });
 *
 * `data-column` is the header/cell index within the target table (0-based) —
 * any column that should always stay visible (Controls, a row-select column) is
 * simply left out of the checkbox list.
 */
(function () {
  'use strict';

  window.initColumnSelect = function (opts) {
    var trigger = document.getElementById(opts.triggerId);
    var panel = document.getElementById(opts.panelId);
    var filterInput = opts.filterId ? document.getElementById(opts.filterId) : null;
    var table = document.getElementById(opts.tableId);
    if (!trigger || !panel || !table) return;

    var triggerText = trigger.querySelector('.multiselect-trigger-text');
    var checkboxes = panel.querySelectorAll('.column-checkbox');
    var options = panel.querySelectorAll('.multiselect-option');

    function updateTriggerText() {
      var total = checkboxes.length;
      var selected = Array.prototype.filter.call(checkboxes, function (cb) { return cb.checked; }).length;
      if (selected === total) triggerText.textContent = 'All Columns';
      else if (selected === 0) triggerText.textContent = 'No Columns';
      else triggerText.textContent = selected + ' of ' + total + ' Columns';
    }

    function setColumnVisibility(columnIndex, isChecked) {
      var headers = table.querySelectorAll('thead th');
      if (headers[columnIndex]) headers[columnIndex].style.display = isChecked ? '' : 'none';

      table.querySelectorAll('tbody tr').forEach(function (row) {
        var cells = row.querySelectorAll('td');
        if (cells[columnIndex]) cells[columnIndex].style.display = isChecked ? '' : 'none';
      });
    }

    // Apply each checkbox's default checked state on load (columns that start off stay hidden)
    checkboxes.forEach(function (checkbox) {
      setColumnVisibility(parseInt(checkbox.dataset.column, 10), checkbox.checked);
    });
    updateTriggerText();

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
      if (!expanded && filterInput) {
        filterInput.value = '';
        options.forEach(function (option) { option.style.display = ''; });
        filterInput.focus();
      }
    });

    panel.addEventListener('click', function (e) { e.stopPropagation(); });

    document.addEventListener('click', function (e) {
      if (!trigger.contains(e.target) && !panel.contains(e.target)) {
        trigger.setAttribute('aria-expanded', 'false');
        panel.hidden = true;
      }
    });

    if (filterInput) {
      filterInput.addEventListener('input', function () {
        var query = this.value.trim().toLowerCase();
        options.forEach(function (option) {
          var label = option.querySelector('span').textContent.toLowerCase();
          option.style.display = label.indexOf(query) === -1 ? 'none' : '';
        });
      });
    }

    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener('change', function () {
        setColumnVisibility(parseInt(this.dataset.column, 10), this.checked);
        updateTriggerText();
      });
    });
  };
})();
