
function init() {

  class Box {
    constructor(wrapper) {
      this.wrapper = wrapper;
      this.table = wrapper.getElementsByClassName('main-table')[0];
      this.addColBtn = wrapper.getElementsByClassName('add-col')[0];
      this.addRowBtn = wrapper.getElementsByClassName('add-row')[0];
      this.remRowBtn = this.wrapper.getElementsByClassName('del-btn2')[0];
      this.remColBtn = this.wrapper.getElementsByClassName('del-btn1')[0];
      this.addColBtn.addEventListener('click', this.addCol);
      this.addRowBtn.addEventListener('click', this.addRow);
      this.table.addEventListener('mouseover', this.getHoveredItemCoords);
      this.remRowBtn.addEventListener('click', this.removeRow);
      this.remColBtn.addEventListener('click', this.removeCol);
      this.wrapper.addEventListener('mouseout', this.hideRemoveBtn);
      this.colIndex = null;
      this.rowIndex = null;
    };

    addCol = () => {
      Array
        .from(this.table.rows)
        .forEach(row => row.insertCell(-1));
    };

    addRow = () => {
      const newRow = this.table.insertRow(-1);
      Array
        .from(this.table.rows[0].cells)
        .forEach(cell => newRow.insertCell(cell));
    };

    getHoveredItemCoords = ({ target }) => {
      this.remColBtn.classList.add('visible');
      this.remRowBtn.classList.add('visible');
      const coords = target.getBoundingClientRect();
      if (target.tagName === 'TD') {
        this.colIndex = target.cellIndex;
        this.rowIndex = target.parentNode.rowIndex;
        this.remColBtn.style.left = coords.left + target.clientWidth / 2 - this.remColBtn.clientWidth / 2  + pageXOffset + 'px';
        this.remRowBtn.style.top = coords.top + target.clientHeight / 2 - this.remRowBtn.clientHeight / 2 + pageYOffset + 'px';
      }
      this.checkHide();
    };

    hideRemoveBtn = ({ target, relatedTarget }) => {
      if (relatedTarget !== this.remRowBtn && relatedTarget !== this.remColBtn) {
        this.remRowBtn.classList.remove('visible');
        this.remColBtn.classList.remove('visible');
      }
    };

    removeRow = () => {
      if (this.table.rows.length === 1) return;
      this.table.deleteRow(this.rowIndex);
      this.checkHide();
    };

    removeCol = () => {
      if (this.table.rows[0].cells.length === 1) return;
      Array
        .from(this.table.rows)
        .forEach(row => row.deleteCell(this.colIndex));
      this.checkHide();
    };

    checkHide = () => {
        const rows = this.table.rows;
        if (rows[0].cells.length === 1) this.remColBtn.classList.remove('visible');
        if (rows.length === 1) this.remRowBtn.classList.remove('visible');
    }
  }

  Array.from(document.getElementsByClassName('wrapper')).map(elem => new Box(elem));
}
document.addEventListener('DOMContentLoaded', init);
