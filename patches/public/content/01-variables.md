## Variables

### <i class="bi bi-circle" role="img" aria-label="No overlap"></i> Naming Conventions

C++ does not prescribe style.

Rust does.

```rust
fn snake_case(){}
struct MyTypeName {}
let MY_CONSTANT_VALUE: i32 = 5;
```

---

### <i class="bi bi-circle-fill" role="img" aria-label="Full overlap"></i> Primitive Types

Fixed-width numeric types are very similar.

```cpp
std::size_t count = 5;
std::ssize_t count = 5;
```

```rust
let count: usize = 5;
let count: isize = 5;
```

--

#### Common Types

| C++ / Rust | C++/Rust |
|----------|--------------|
| `int8_t` / `i8` |  `uint8_t` / `u8` |
| `int16_t` / `i16` | `unt16_t` / `u16`  |
| `int32_t` / `i32` |  `uint32_t` / `u32`  |
| `int64_t` / `i64` | `uint64_t` / `u64` |
| `int128_t`* / `i128` | `uint128_t`* / `u128` |
| `ssize_t` / `isize` | `size_t` / `usize`  |
| `float` / `f32`| `double` / `f64` |

--

#### Literal syntax

| C++ | Rust |
|-----|------|
| `5'000` | `5_000` |
| `0xff` | `0xff` |
| `0777` | `0o777` |
| `0b1111'0000` | `0b1111_0000` |
| `1.0f` | `1.0_f32` |
| `'A'` | `'A'` |

--

#### Literal Suffixes

C++

```cpp
const auto x = 5ULL;
const auto size = 5Z;
```

Rust

```rust
let x = 5_u64;
let size = 5_usize;
```

--

#### User-defined literals

C++ supports user-defined literal suffixes:

```cpp
auto operator"" _milliseconds(unsigned long long value) -> long long {
  return value;
}

const auto value = 5_milliseconds;
```

Rust requires macros for a similar effect.

```rust
let duration = chrono!(5 milliseconds);
// A custom suffix such as this is not valid ordinary Rust syntax:
// let duration = 5_milliseconds;
```

---

### <i class="bi bi-circle-half" role="img" aria-label="Partial overlap"></i> Compound Data Types

C++ struct/class:

```cpp
struct Point { int x; int y; };
class PointClass { int x; int y; }
```

Rust struct:

```rust
struct Point { pub x: i32, pub y: i32 }
struct PointClass { x: i32, y: i32 }
```

--

#### Enums and variants

C++:

```cpp
enum class Color {
  red, green, blue
};
```

Rust:

```rust
enum Color {
  Red, Green, Blue
}
```

--

C++ Variant:

```cpp
using Value = std::variant<bool, int>;

Value option = 5;
Value nothing = false;
```

Rust Enum:

```rust
enum Value {
  None,
  Some(i32),
}

let option = Value::Some(5);
let nothing = Value::None;
```

--

#### Arrays

```cpp
// C++
int x[5] = {1, 2, 3, 4, 5};
const auto first_and_last = x[0] + x[4];
const auto out_of_bounds = x[5]; // undefined behavior
```

```rust
// rust
let x: [i32; 5] = [1, 2, 3, 4, 5];
let repeated = [3; 5]; // [3, 3, 3, 3, 3]
let first_and_last = x[0] + x[4];
// let out_of_bounds = x[5]; // rejected for a constant index
```

--

#### Tuples and structs


C++ `std::tuple`:

```cpp
// C++
auto get_tuple() -> std::tuple<int, int> {
  return {1, -1};
}
```

Rust tuples:

```rust
// rust
fn get_tuple() -> (i32, i32) {
    (1, -1)
}
```

---

### <i class="bi bi-circle-fill" role="img" aria-label="Full overlap"></i> Constness and Mutability

C++ variables are mutable by default; 

```cpp
// C++
const int x = 5;
int y = 10;
```

Rust variables are immutable by default.

```rust
// rust
let x: i32 = 5;
let mut y: i32 = 10;
```

---

### <i class="bi bi-circle-fill" role="img" aria-label="Full overlap"></i> `auto` vs. inference

C++ uses `auto`.

```cpp
// C++
auto count = 5;
```

Rust infers binding type.

```rust
// rust
let count = 5;
```

--

#### Explicit vs Implicit types


```cpp
// C++
const int w = 5; //explicit 
const auto x = 5; //implicit 
int y = 10; //explicit 
auto z = 10; //implicit 
```

```rust
// rust
let w: i32 = 5; //explicit
let x = 5; //implicit 
let mut y: i32 = 10; //explicit 
let mut z = 10; //implicit
```

---

### <i class="bi bi-circle-fill" role="img" aria-label="Full overlap"></i> Casting

C++ allows implicit conversions

```cpp
double x = 1; // implicit conversion from int to double
```

Rust requires explicit conversions

```rust
let y = 1 as f64; // explicit cast
```

--

#### Casting details

C++ explicit casting:

```cpp
auto y = static_cast<double>(1);
```

A Rust type annotation != implicit cast:

```rust
// let x: f64 = 5; // does not compile
let x: f64 = 5 as f64;
```

---

### <i class="bi bi-circle" role="img" aria-label="No overlap"></i> Copy and Move Semantics

C++ => copy be default

```cpp
struct MyStruct { int x; };
MyStruct my_struct_x{};
MyStruct my_struct_y = my_struct_x; //copied
```

Rust => move by default

```rust
struct MyStruct { x: i32 };
let my_struct_x = MyStruct{ x: 0 };
MyStruct my_struct_y = my_struct_x; // moved
```

--

#### Copying primitive values

C++ primitive value copy.

```cpp
// C++
const auto x = 5;
const auto y = x;
std::printf("x%d\n", x);
std::printf("y%d\n", y);
```

Rust's primitive types implement `Copy` and `Clone`

```rust
// rust
let x = 5;
let y = x;
println!("x{}", x);
println!("y{}", y);
```

--

#### Moving compound values

C++ move behavior is type specific

```cpp
#include <string>
#include <utility>

std::string x = "hello";
auto y = std::move(x);
// x is valid but its value is unspecified
```

Assigning a Rust value transfers ownership. 

```rust
// rust
let x = String::from("hello");
let y = x; // x can no longer be used
```

--

#### Custom copy behavior

C++ copy/move constructors/assignment operators.

```cpp
struct X {
  X(const X& other) { /* copy */ }
  X(X&& other) { /* move */ }
};
```

 Rust `Clone`/`Copy` (traits)

```rust
#[derive(Clone, Copy)]
struct X(i32);

let x = X(5);
let y = x; // copies X; x remains usable
let y = x.clone(); // copy is implicit, clone is not
```

--

#### <i class="bi bi-circle" role="img" aria-label="No overlap"></i> References vs Borrowing

C++ references.

```cpp
auto x = 5;
auto& y = x;
```

Rust borrows.

```rust
let x = 5;
let y = &x;
```

They are not the same at all. [Read more in the Rust book](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html).

--

#### Borrowing and mutation

Rust allows:
- single mutable borrow OR
- many non-mutable borrows

```rust
let mut x = 5;
let y = &x;
// x = 10; // rejected while y is used below
println!("y{}", y);
x = 20; // allowed after y's last use
```
