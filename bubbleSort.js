class BubbleSort extends Container {
  constructor(container, arr) {
    super(container, arr);
    this.draw();
  }
  sort = async () => {
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr.length - i - 1; j++) {
        this.executions.insert(
          new Function(this.comparing.bind(this), j, j + 1)
        );
        if (this.arr[j + 1] < this.arr[j]) {
          this.executions.insert(new Function(this.swap.bind(this), j, j + 1));
          const temp = this.arr[j + 1];
          this.arr[j + 1] = this.arr[j];
          this.arr[j] = temp;
        } else {
          this.executions.insert(
            new Function(this.doneComparing.bind(this), j, j + 1)
          );
        }
      }
      // $(this.boxes[this.arr.length - 1 - i].dom).addClass("sorted");
    }
  };
}

const container = document.querySelector(".item-container");
bs = new BubbleSort(container, [9, 5, 14, 8, 3, 15, 2]);
bs.sort();

$("#next").click(() => {
  bs.step();
});
