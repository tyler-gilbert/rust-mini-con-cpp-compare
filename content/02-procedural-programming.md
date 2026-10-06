## Procedural Programming

Most procedural programming concepts in Rust are similar to C++. A few concepts differ substantially such as Rust's `match` keyword.


---

### ❓ Flow Control

#### ❓ If/Else

```c++
//c++
auto is_true = true;
if( is_true ){
  //do this
} else {
  //do that
}
```

```rust
//rust
let is_true = true;
if is_true { //parentheses are optional but discouraged
  //do this
} else {
  //do that
}
```

`else if` works the same way in C++ and Rust.


---

#### ✅ Ternary Operator

```c++
//c++
const auto x = true;
const auto y = x ? 5 : 10;
```

```rust
//rust
let x = true;
let y = if x {5} else {10};
```

In Rust, `if` is an expression that evaluates to a value. Notice there are no `;`'s in the branches. Both branches must resolve to the same type (just like C++ ternary).


---

#### ❌ switch vs match

C++ `switch` and Rust `match` are similar conceptually but have distinct implementations.

```c++
//c++
auto x = 5;
auto y = 0;
switch(x){
  case 0:
    y = 0;
    break;
  case 1:
    y = 1;
    break;
  default:
    y = 2;
    break;
}
```

```rust
//rust
let x = 5;
let mut y = 0;
match x {
  0 => y = 0;
  1 => y = 1;
  _ => y = 2; //_ is a catch-all value
};
```

In Rust, the `match` statement can pattern match enums in a way that is unparalleled in C++.

```rust
let x = Some(5); //is a std::Option
match x {
  Some(value) => println!("Has value {}", value),
  None => println!("doesn't have a value")
};
```


---

#### ❓ Loops

##### ❓ For Loops

```c++
//c++
for(int i=0; i < 10; ++i){
  //do something (10x)
}

const auto list = {0,1,2,3,4};
for(const auto & value: list){
  //do something with each `value`
}
//list is still valid
```

```rust
//rust
for i in 0..10 { //use _ if i is not used
  //do something (10x)
}

let list = [0,1,2,3,4];
for value in &list { //borrow list
  //do something with each `value`
}
//borrow is returned
for value in list { //consume list
  //do something with each `value`
}
//at this point list has been consumed and cannot be used
```


---

##### ❓ While Loops

```c++
//c++
while(true){
  //forever
}

auto dont_stop = true;
while(dont_stop){
  dont_stop = false;
}
```

```rust
//rust
//this is a warning in rust - use a `loop`
while true {
  //forever
}

let mut dont_stop = true;
while dont_stop == true {
  dont_stop = false;
}
```


---

##### ❌ Loops

Rust has a `loop` keyword that loops forever without an explicit `break`s. Rust also supports named `break`'s with nested loops.

```rust
//rust
loop {
  //forever loop
}
```


---

### ✅ Functions

```c++
//c++
int function(int x){
  return x;
}
//with trailing return type (looks more like Rust)
auto function(int x) -> int {
  return x;
}

//callsite
function(5);
```

```rust
//rust
fn function(x: i32) -> i32 {
  return x;
}

//rust lines without a semicolon are an implicit return
fn function(x: i32) -> i32 {
  x // same as return x;
}

//callsite
function(5);
```


---

#### ❌ Default Arguments

```c++
//c++
auto do_something(int x = 2) -> int {
  return x*2;
}

//callsite
do_something(10); //or
do_something();
```

Rust does not support default arguments. 

> There are techniques using `Option` or `impl Default` that achieve similar behavior.


---

### ❓ Lambas

C++ lambdas are called closures in Rust.

```c++
//c++
const auto x = 5;
//captured variables `&x` are explicit
auto lambda = [&x](int y){
  return x + y;
};

//callsite
const auto sum = lamdba(5);
```

```rust
//rust
let x = 5;
//captured values, `x` in this case, are automatically 
//borrowed until closure's last use
let closure = |y: i32| -> i32 { x + y };

//callsite
let sum = closure(5);
```


---

#### ❓ Immediately called Lambda

In C++, I like to declare and immediately call a lambda to do complex logic in an isolated scope and return a `const` value from it.

```c++
//c++
const auto list = [&](){
  auto result = std::vector<std::string>{};
  for(int i=0; i < 10; i++){
    result.push_back(std::string{"hello"});
  }
  return result;
}();
```

In Rust, a scope is an expression. So there is no need for a closure to do the same thing.

```rust
//rust
let list = {
  let mut result: Vec<String> = Vec::new();
  for _ in 0..10 {
    result.push(String::from("hello"));
  }
  result
};
```
