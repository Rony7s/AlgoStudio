class Function {
  constructor(fn, ...params) {
    this.fn = fn;
    this.params = params;
  }
  run = () => {
    this.fn(...this.params);
  };
}

class ExecutionList {
  executionList = [];

  insert = (fn) => {
    this.executionList.push(fn);
  };

  get = () => {
    console.log(this.executionList);
  };
}

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

class Container {
  constructor(container, arr) {
    this.container = container;
    this.arr = arr;
    this.boxes = [];
    this.executions = new ExecutionList();
    this.delay = (ms) => new Promise((res) => setTimeout(res, ms));
  }
  currentStep = 0;
  step() {
    if (this.currentStep < this.executions.executionList.length) {
      this.executions.executionList[this.currentStep].run();
      this.currentStep++;
    } else {
      alert("Sorted");
    }
  }
  draw() {
    if (this.container.children) {
      $(this.container).empty();
    }
    for (let i = 0; i < this.arr.length; i++) {
      const b = new Box(this.arr[i]);
      $(this.container).append(b.dom);
      const max = Math.max(...this.arr);
      b.dom.style.height = `${b.value * (200 / max)}px`;
      this.boxes.push(b);
    }
  }
  comparing(idx1, idx2) {
    const elem1 = this.boxes[idx1].dom;
    const elem2 = this.boxes[idx2].dom;
    $(".log").html(`<p>comparing ${elem1.innerText}, ${elem2.innerText}</p>`);

    elem1.classList.add("comparing");
    elem2.classList.add("comparing");
  }
  doneComparing(idx1, idx2) {
    const elem1 = this.boxes[idx1].dom;
    const elem2 = this.boxes[idx2].dom;
    elem1.classList.remove("comparing");
    elem2.classList.remove("comparing");
  }

  async swap(idx1, idx2, e) {
    const elem1 = this.boxes[idx1].dom;
    const elem2 = this.boxes[idx2].dom;
    $(".log").html(`<p>swapping ${elem1.innerText}, ${elem2.innerText}</p>`);
    const elem1Left = elem1.offsetLeft;
    const elem2Left = elem2.offsetLeft;
    elem1.style.transform = `translate3d(${
      (elem2Left - elem1Left) / 2
    }px, 0px, 0px)`;
    elem2.style.transform = `translate3d(${
      -(elem2Left - elem1Left) / 2
    }px, 0px, 0px)`;

    await this.delay(300);
    const tempHeight = elem1.offsetHeight;
    elem1.style.height = `${elem2.offsetHeight}px`;
    elem2.style.height = `${tempHeight}px`;
    elem2.style.transform = "translate3d(0px, 0px, 0px)";
    elem1.style.transform = "translate3d(0px, 0px, 0px)";
    elem1.classList.remove("processing");
    elem2.classList.remove("processing");
    const tempVal = elem1.innerText;
    elem1.innerText = elem2.innerText;
    elem2.innerText = tempVal;
    elem1.classList.remove("comparing");
    elem2.classList.remove("comparing");
  }
}
