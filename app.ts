// DECORATORS

function logged(constructorFunc: Function) {
  console.log(constructorFunc);
}

@logged
class Person {
  constructor() {
    console.log("Hey");
  }
}

// Factory
function logging(val:boolean):any {
  return val ? logged : null;
}

@logging(true)
class Car { }

// Advanced
function printable(constructorFunc: Function) {
  constructorFunc.prototype.print = function() {
    console.log(this);
  }
}

@logging(true)
@printable
class Plant {
  name = "The Green";
}
const plant = new Plant();

(<any>plant).print();

// Method Decorator
function editable(val:boolean) {
  return function(target:any, propName:string, descriptor:PropertyDescriptor) {
    descriptor.writable = val;
  }
}

// Property Decorator
function overwritable(val:boolean) {
  return function(target:any, propName:string):any {
    const newDescriptor:PropertyDescriptor = {
      writable:val
    }
    return newDescriptor;
  }
}

class Project {
  @overwritable(true)
  projectName:string;
  constructor(name:string) {
    this.projectName = name;
  }

  @editable(true)
  calcBudget() {
    console.log(1000);
  }
}

const project = new Project("Super Project");
project.calcBudget();
project.calcBudget = function() {
  console.log(2000);
}
project.calcBudget();
console.log(project);

// Parameter Decorator
function printInfo(target:any, methodName:string, paramIndex:number) {
  console.log("Target:", target);
  console.log("methodName:", methodName);
  console.log("paramIndex:", paramIndex);
}
class Course {
  name:string;
  constructor(name:string) {
    this.name = name;
  }
  printStudentNumbers(mode:string, @printInfo printAll:boolean) {
    if(printAll) {
      console.log(80000);
    } else {
      console.log(2222);
    }
  }
}

const course = new Course("Super Course");
course.printStudentNumbers("Beast", true);
course.printStudentNumbers("Beast", false);