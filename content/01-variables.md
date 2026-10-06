## Variables

### ❌ Naming Conventions

Rust specifies `snake_case` for variable and function names. It specifies `UpperCamelCase` for custom types and `UPPER_CASE` for constant values. The Rust compiler issues warnings if the case conventions are not followed. While most projects follow similar conventions, C++ does not specify case conventions.


---

### ✅ Primitive Types

| C++ | Rust | Size (C++/Rust) | 
|-----|------|------|
| `size_t` | `isize` | cpu specific |
| `ssize_t` | `usize` | cpu specific |
| `uint8_t` | `u8` | 8-bit |
| `int8_t` | `i8` | 8-bit |
| `uint16_t` | `u16` | 16-bit |
| `int16_t` | `i16` | 16-bit |
| `uint32_t` | `u32` | 32-bit |
| `int32_t` | `i32` | 32-bit |
| `uint64_t` | `u64` | 64-bit |
| `int64_t` | `i64` | 64-bit |
| `uint128_t` | `u128` | 128-bit |
| `int128_t` | `i128` | 128-bit |
| `const char *` | `&str` | varies |
| `float` | `f32` | 32-bit |
| `double` | `f64` | 64-bit |
| `bool` | `bool` | varies/1 Byte |
| `char` | `char` | 8-bit/32-bit |


---

#### ✅ Literals

| C++ | Rust | Type | 
|-----|------|------|
| `5'000` | `5_000` | Decimal |
| `0xff` | `0xff` | Hexadecimal |
| `O777` | `0o777` | Octal |
| `0b1111'0000` | `0b1111_0000` | Binary |
| `'A'` | `'A'` | Byte |
| `1.0f` | `1.0_f32` | single-precision floating point |
| `1.0` | `1.0` | double-precision floating point |

With Rust you can suffix a literal with an underscore-primitive type:

```rust
//rust
let x = 5_u64;
```


---

#### ❌ User-Defined Literals

```c++
//c++
auto operator"" _milliseconds(unsigned long long int value) -> long long int {
  return value;
}

const auto value = 5_milliseconds;
```

In Rust, you can have user-defined literals only within macros. Doing so is non-trivial but the call site could look something like this:

```rust
//rust
//can do this
let duration = chrono!(5milliseconds);
//can't do this
let other_duration = 5milliseconds;
```


---

### ❓ Compound Data Types

#### ❌ Enums

```c++
//c++
enum class Color {
  red, green, blue
};
```

```rust
//rust
enum Color {
  Red, Green, Blue
}
```

An `enum` in Rust can also be used similarly to `std::variant`.

```c++
using Option = std::variant<bool, int>;

const auto option = Option{5};
const auto nothing = Option{false};
```

```rust
//rust
enum Option {
  None,
  Some(i32)
}

//usage
let option = Option::Some(5);
let nothing = Option::None;
```

> Rust `std::Option` is used like C++'s `std::optional`. Some aspects of Rust `std::Option` are built into the language to streamline error handling using the `?` operator.


---

#### ❓ Arrays

```c++
//c++
char x[5]; //may be uninitialized

//access
const auto z = x[0] + x[4]; //first and last
const auto ub = x[5]; //undefined behavior
```

```rust
//rust
let x: [i32; 5] = [1,2,3,4,5]; //must be initialized before 1st use
let y = [3; 5]; //y is [3,3,3,3,3];

//access
let z = x[0] + x[4];
let ub = x[5]; //won't compile 
//if a dynamic out-of-range value is used, rust will panic at runtime
```


---

#### ❓ Tuples and Structs

In Rust, tuples are a native type. In C++, they are part of `std::tuple`.

```c++
//c++
auto get_tuple() -> std::tuple<int, int>{
  return std::tuple<int, int>{1, -1};
}
```

```rust
//rust
fn get_tuple() -> (i32, i32) {
    (1, -1)
}
```


---

### ✅ Constness and Mutability

C++ variables are mutable by default while Rust variables are constant by default.

```c++
//c++
const int x = 5;
int y = 10;
```

```rust
//rust
let x: i32 = 5;
let mut y: i32 = 10;
```

In Rust, variables are dropped after the last use. This means a variable can be re-declared in the same scope. 

```rust
//rust
//this compiles and is valid rust
let x = 10;
let mut x = x; //x is now mutable
```


---

### ✅ `auto` vs. inference

The `auto` keyword in C++ was introduced to enable backward compatible type inference. Rust comes with built-in type inference.

```c++
//c++
const int w = 5;
const auto x = 5;
int y = 10;
auto z = 10;
```

```rust
//rust
let w: i32 = 5;
let x = 5;
let mut y: i32 = 10;
let mut z = 10;
```


---

### ✅ Casting

C++ includes many implicit type-casts. In Rust, type-casting is always explicit.

```c++
//c++
const double x = 1;  //implicit conversion from int to double
const auto y = static_cast<double>(1); //C++11
```

> There are many ways to cast in C++. I can't cover them all here.

```rust
//rust
let x: f64 = 5; //won't compile - no implicit conversion
let y = 5 as f64; //cast using as
```


---

### ❌ Copy and Move Semantics

Copy and move semantics between C++ and Rust concerning are very different. To summarize:

- C++ copies variables by default. If a `class`/`struct` has implemented move semantics, the value is sometimes moved.
- Rust moves (transfers ownership) by default. Custom types can implement `Copy` (implicit) and `Clone` (explicit) copy semantics.

Rust primitive types implement `Copy` and `Clone` such that primitives are copied by default (just like in C++).

```c++
//c++
const auto x = 5;
const auto y = x; //y holds a copy of 5
printf("x%d\n", x);
printf("y%d\n", y);
```

```rust
let x = 5;
let y = x; //y holds a copy of 5
//for these we assume `impl fmt::Display for X`
println!("x{}", x); 
println!("y{}", y);
```

> See Also [References vs Borrowing](#references-vs-borrowing).


---

#### ❌ Copying and Moving Compound Types

For non-primitives, C++'s default mode is to copy variables whereas Rust's default is to move (or transfer ownership).  For example:

```c++
//c++
struct X {
  int value;
};
auto x = X{5};
auto y = std::move(x); //y holds a copy of x (default move is to copy)
printf("x%d\n", x); //C++ specifies a valid but unspecified state for x
printf("y%d\n", y);
```

```rust
struct X(i32);
let x = X(5);
let y = x; //y now owns '5' and x is now invalid
//for these we assume `impl fmt::Display for X`
println!("x{}", x); // This is a compiler error because x is moved
println!("y{}", y);
```

In Rust, you can override the default behavior by implementing `Clone` or `Copy` for a custom type. The mechanics are similar to custom move/copy assign/construct operators in C++.

```c++
struct X {
  int value;
  X(const X&a){
    //magic here
  }
  X& operator=(const X&a){
    //magic here
    return *this;
  }
  X(const X&&a){
    //magic here
  }
  X& operator=(const X&&a){
    //magic here
    return *this;
  }
};
```

```rust
struct X(i32);
impl Copy for X {
  fn copy(self: &Self) -> Self {
    //magic here
  }
}
```

> `self: &Self` can be written:
> - `&self`: reading
> - `mut self`: mutating
> - `self`: consuming

Or you can use the default `Copy`:

```rust
#[derive(Copy)]
struct X(i32);
let x = X(5);
let y = x; //y gets a copy of X
//for these we assume `impl fmt::Display for X`
println!("x{}", x); // This compiles now
println!("y{}", y);
```


---

#### ❌ References vs Borrowing

C++ references and Rust borrows are very different but use similar syntax.

```c++
//c++
auto x = 5;
auto & y = x; //y refers to x
```

In C++, `y` is a pointer to `x`. If `x` changes, `y` will reflect that change. If `x` goes out of scope, `y` will be a dangling reference (undefined behavior).


```rust
//rust
let mut x = 5;
let y = &x; //y borrows x's value
x = 10; //won't compile, because x is "borrowed"
println!("y{}", y);
x = 20; //will compile, borrow ends after last use
```

In Rust, `&` is a borrow. The borrower takes ownership of the underlying data and limits what the original variable can do.

> The above is a simplification of Rust ownership. [Read more in the Rust book](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)
