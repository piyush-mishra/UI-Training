function User(name,salary){
  this.name= name;
  this.salary=salary;
  this.age=0;
  this.getName = function(){
    return this.name;
  }
  let base = 100;
  function calculatebonus(){
    return salary * base + 10;
  }

  this.calculateHike = function(){
    return calculatebonus();
  }
}
User.prototype.year = 2023;
User.prototype.getAge = function(){
    return this.age; 
}
User.prototype.setAge = function(newAge){
    this.age= newAge;
}

let user1 = new User('tom',123);
user1.setAge(25);
console.log(user1.getName());
console.log(user1.calculateHike());
console.log(user1);