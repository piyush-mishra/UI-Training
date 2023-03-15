function BankAccount(balence){
  this.balence = balence;

}

let balence = new BankAccount(2000);
console.log(` Balaence is : ${balence}`);

function User(name, salary) { 
    // private property let base = 100; 
    this.salary = salary; 
    this.age = 0; 
    // private Methods 
    let hike = function (){
      console.log(salary); 
      console.log(salary * base + 10); 
    } //public
    this.logHike = function(){ 
      hike(); 
    } 
    this.name = name;
    this.salary = salary; 
    this.getName = function(){ return this.name; } 
    this.calculateHike = function(){ return calculatebonus() }}
  User.prototype.getAge = function(){ return this.age;}
  User.prototype.setAge = function(newAge)
  { this.age = newAge;}
  User.prototype.year = 2024;
  // no copy of props/methods in instance. We are linking prototype// instance
  let user1 = new User('tom', 123); 
  let user2 = new User('John', 3456); 
  user1.logHike();