class SelectionSort extends Container {
  constructor(container, arr) {
    super(container, arr);
    this.draw();
  }
  sort = async (e) => {
    for (let i = 0; i < this.arr.length; i++) {
      let index = i;
      for (let j = i; j < this.arr.length; j++) {
        if (this.arr[j] < this.arr[index]) {
          index = j;
        }
      }
      const temp = this.arr[i];
      this.arr[i] = this.arr[index];
      this.arr[index] = temp;
      this.executions.insert(new Function(this.comparing.bind(this), i, index));
      if (i != index) {
        this.executions.insert(new Function(this.swap.bind(this), i, index));
      } else {
        this.executions.insert(
          new Function(this.doneComparing.bind(this), i, index)
        );
      }
    }
  };
}

ss = new SelectionSort($(".item-container"), [4, 3, 7, 1, 10,6, 2, 9,1]);
ss.sort()
$("#next").click(() => {
  ss.step();
});