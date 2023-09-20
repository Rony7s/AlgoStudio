class Box {
    constructor(value) {
      this.pos = 0;
      this.value = value;
      this.dom = this.createDom();
    }
    createDom() {
      const div = document.createElement("div");
      div.className = "box";
      div.innerText = this.value;
      return div;
    }
  }
  
  const container = document.querySelector(".container_Animation");
  class Container {
    constructor(elem, arr) {
      this.container = elem;
      this.arr = arr;
      this.boxes = [];
      this.delay = (ms) => new Promise((res) => setTimeout(res, ms));
    }
    draw() {
      if (this.container.children) {
        $(this.container).empty();
        //   for (const child of this.container.children) {
        //     child.remove();
        //   }
      }
      for (let i = 0; i < this.arr.length; i++) {
        const b = new Box(this.arr[i]);
        $(this.container).append(b.dom);
        const max = Math.max(...this.arr);
        console.log(max);
        b.dom.style.height = `${b.value * (200 / max)}px`;
        b.dom.style.left = `${i * ($(b.dom).width() + 8)}px`;
        b.dom.style.bottom = `${0}px`;
        b.pos = i * ($(b.dom).width() + 8);
        this.boxes.push(b);
      }
    }
  
    swap(idx1, idx2) {
      const left = this.boxes[idx1];
      const right = this.boxes[idx2];
      // before swap
      const temp = this.boxes[idx1];
      this.boxes[idx1] = this.boxes[idx2];
      this.boxes[idx2] = temp;
      // console.log(left);
      left.pos += (idx2 - idx1) * ($(left.dom).outerWidth() + 8);
      $(left.dom).animate({
        left: `${left.pos}px`,
      });
      right.pos -= (idx2 - idx1) * ($(right.dom).outerWidth() + 8);
      $(right.dom).animate({
        left: `${right.pos}px`,
      });
      //swap finished
    }
    check(idx1, idx2) {
      $(this.boxes[idx1].dom).addClass("check");
      $(this.boxes[idx2].dom).addClass("check");
    }
    x = 0;
    sort = async () => {
      for (let i = 0; i < this.arr.length; i++) {
        for (let j = 0; j < this.arr.length - i - 1; j++) {
          this.check(j, j + 1);
          if (this.arr[j + 1] < this.arr[j]) {
            await this.delay(500);
            this.swap(j, j + 1);
            const temp = this.arr[j + 1];
            this.arr[j + 1] = this.arr[j];
            this.arr[j] = temp;
          }
          await this.delay(500);
          $(this.boxes[j].dom).removeClass("check");
          $(this.boxes[j + 1].dom).removeClass("check");
        }
        $(this.boxes[this.arr.length - 1 - i].dom).addClass("sorted");
      }
      console.log("Finished");
    };
  }
  c = new Container(container, [5, 2, 9, 1, 5, 8, 3, 7, 6, 4]);
  c.draw();
  $("#swap").click(() => {
    c.sort();
  });
  
  $("#reset").click(() => {
    $(".box").remove();
    c = new Container(container, [5, 2, 9, 1, 5, 8, 3, 7, 6, 4]);
    //   c.boxes = [];
    c.draw();
  });
  
  class SelectionSort extends Container {
    sort = async () => {
      for (let i = 0; i < this.arr.length; i++) {
        let index = i;
        console.log(this.arr[index]);
        for (let j = i; j < this.arr.length; j++) {
          if (this.arr[j] < this.arr[index]) {
            index = j;
          }
        }
        const temp = this.arr[i];
        this.arr[i] = this.arr[index];
        this.arr[index] = temp;
        this.check(i, index);
        await this.delay(500);
        if (i != index) {
          this.swap(i, index);
          await this.delay(500);
        }
        $(this.boxes[i].dom).removeClass("check");
        $(this.boxes[index].dom).removeClass("check");
        console.log("sorted", this.arr[i]);
        $(this.boxes[i].dom).addClass("sorted");
        await this.delay(1000);
      }
    };
  }
  
  s = new SelectionSort(
    document.querySelector(".boxes"),
    [1, 3, 10, 9, 8, 7, 6, 5, 4]
  );
  
  s.draw();
  
  $("#swap2").click(() => {
    s.sort();
  });
  
  $("#reset2").click(() => {
    $(".container2 >.box").remove();
    s = new SelectionSort(
      document.querySelector(".boxes"),
      [1, 3, 10, 9, 8, 7, 6, 5, 4]
    );
    //   c.boxes = [];
    s.draw();
  });
  
  $(window).on("resize", function () {
    //   s = new SelectionSort(
    //     document.querySelector(".boxes"),
    //     [1, 3, 10, 9, 8, 7, 6, 5, 4]
    //   );
    s.boxes = [];
    s.draw();
    c.boxes = [];
    c.draw();
  });
  