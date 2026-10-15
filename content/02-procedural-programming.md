## Procedural Programming

Most procedural programming concepts are similar in Rust and C++.

```cpp
// C++
if (ready) { run(); }
```

```rust
// rust
if ready { run(); }
```

--

### <i class="bi bi-circle" role="img" aria-label="No overlap"></i> Exceptions

C++ has exceptions.

Rust has `panic!()`

### Don't Panic!

--

### <i class="bi bi-circle-half" role="img" aria-label="Partial overlap"></i> Flow Control

`if`/`else` is very similar.

```cpp
// C++
if (is_ready) { result = 1; }
```

```rust
// rust
let result = if is_ready { 1 } else { 0 };
// warning on () around if condition
let result = if (is_ready) { 1 } else { 0 };
```

--

#### <i class="bi bi-circle-fill" role="img" aria-label="Full overlap"></i> Ternary operator and `if` expressions

C++ ternary operator. 

```cpp
const auto x = true;
const auto y = x ? 5 : 10;
```

Rust `if` as an expression.
- Both branches MUST evaluate to the same type

```rust
let x = true;
// notice the semicolon placement
let y = if x { 5 } else { 10 };
```


--

#### <i class="bi bi-circle" role="img" aria-label="No overlap"></i> `switch` vs. `match`

C++ `switch`.

```cpp
auto x = 5;
auto y = 0;
switch (x) {
  case 0: y = 0; break;
  case 1: y = 1; break;
  default: y = 2; break;
}
```

Rust `match`

```rust
let x = 5;
let y = match x {
  0 => 0,
  1 => 1,
  _ => 2, // catch-all pattern
};
```

--

Rust destructures types while matching:

```rust
let x = Some(5); // Option<i32>
match x {
  Some(value) => println!("Has value {}", value),
  None => println!("Doesn't have a value"),
}
```

This is one of Rust's superpowers.

--

#### <i class="bi bi-circle-half" role="img" aria-label="Partial overlap"></i> For loops

C++ index-based loops and range-based `for`. 

```cpp
for (int i = 0; i < 10; ++i) {
  // do something (10 times)
}
```

Rust's `for` iterates over a range or collection.

```rust
for i in 0..10 { // 0 through 9
  // do something (10 times)
}
```

--

C++ range-based iteration commonly borrows each element by reference.

```cpp
const auto list = {0, 1, 2, 3, 4};
for (const auto& value : list) {}
// list remains available
```

Rust makes borrowing or consuming the collection explicit:

```rust
let list = [0, 1, 2, 3, 4];
for value in &list { // borrow the elements
}
let words = vec![String::from("one"), String::from("two")];
for word in words { // consume the vector
}
// words can no longer be used
```

Rust iterators are another superpower.

--

#### <i class="bi bi-circle-half" role="img" aria-label="Partial overlap"></i> While loops

C++ forever loop

```cpp
// c++
while (true) {
  // repeat forever
}
```

Rust forever loop (warns on `while true`)

```rust
// rust
loop {
  // repeat forever
}
```

--

A conditional loop looks similar in both languages:

```cpp
// C++
auto dont_stop = true;
while (dont_stop) {
  dont_stop = false;
}
```

```rust
// rust
let mut dont_stop = true;
while dont_stop {
  dont_stop = false;
}
```

--

#### <i class="bi bi-circle" role="img" aria-label="No overlap"></i> Rust `loop`

Rust's `loop` runs indefinitely unless it reaches a `break`. Labeled loops allow a `break` or `continue` to target an outer loop:

```rust
'outer: loop {
  loop {
    break 'outer;
  }
}
```

---

### <i class="bi bi-circle-fill" role="img" aria-label="Full overlap"></i> Functions

Functions are similar.

```cpp
// C++
int identity(int x) {
  return x;
}
auto identity(int x) -> int { // modern rust look-alike
    return x;
}
```
```rust
// rust
fn identity(x: i32) -> i32 {
  x // final expression - no semicolon
}
fn identity(x: i32) -> i32 { // equivalent to above
  return x; // explicit return
}
```

--

#### <i class="bi bi-circle" role="img" aria-label="No overlap"></i> Default arguments

C++ has default values for parameters.

```cpp
auto do_something(int x = 2) -> int {
  return x * 2;
}
do_something(10);
do_something(); // uses 2
```

Rust does not.

```rust
fn do_something(x: i32) -> i32 {
  x * 2
}
do_something(10);
// do_something(); // requires an argument
```

---

### <i class="bi bi-circle-half" role="img" aria-label="Partial overlap"></i> Lambdas and closures

C++ has lambdas.

```cpp
auto x = 5;
auto lambda = [&x](int y) { return x + y; };
```

Rust has closures.

```rust
let x = 5;
let closure = |y: i32| x + y;
```

--

#### Capturing values

C++ captures values.

```cpp
const auto x = 5;
auto lambda = [&x](int y) {
  return x + y;
};
const auto sum = lambda(5);
```

Rust captures values.

```rust
let x = 5;
let closure = |y: i32| x + y;
let sum = closure(5);
```
