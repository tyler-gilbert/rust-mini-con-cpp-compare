## Overriding and Overloading

C++ supports overload sets and class-based virtual overriding. Rust uses distinct function names and traits for shared or dynamically dispatched behavior.

--

### <i class="bi bi-circle" role="img" aria-label="No overlap"></i> Function Overloading

C++ has function overloads.

```cpp
int parse(int value);
double parse(double value);
```

Rust does not.

```rust
fn parse_int(value: i32) -> i32 { value }
fn parse_float(value: f64) -> f64 { value }
```

---

### <i class="bi bi-circle-fill" role="img" aria-label="Full overlap"></i> Operator Overloading

C++ operator overloads (define `operator`)

```c++
X sum = X{5, 5} + X{10, 10};
```

Rust operator overloads (`impl` traits)

```rust
let sum = X { width: 5, height: 5 } 
    + X { width: 10, height: 10 };
```

--

#### Implementing `operator+` / `Add`

C++ defines `operator+` as a member here.

```cpp
struct X {
  int width;
  int height;

  X operator+(const X& rhs) const {
    return X{width + rhs.width, height + rhs.height};
  }
};
```

--

The equivalent Rust implementation uses `std::ops::Add` and specifies its output type:

```rust
struct X {
  width: i32,
  height: i32,
}

impl std::ops::Add for X {
  type Output = Self;

  fn add(self, rhs: Self) -> Self::Output {
    Self {
      width: self.width + rhs.width,
      height: self.height + rhs.height,
    }
  }
}
```

---

### <i class="bi bi-circle-half" role="img" aria-label="Partial overlap"></i> Function Overriding

C++ overrides a virtual base-class method.

```cpp
struct Bar : Foo {
  void do_something() override { /* ... */ }
};
```

Rust replaces a trait's default method implementation.

```rust
impl Foo for Bar {
  fn do_something(&self) { /* ... */ }
}
```

--

#### Runtime dispatch

C++ 
- virtual overrides for runtime dispath
- template metaprogramming for static dispatch

```cpp
Bar bar;
Foo& value = bar;
value.do_something();
```

Rust 
- trait objects (`dyn Foo`) for runtime dispatch
- generics for static dispatch

```rust
let bar = Bar;
let value: &dyn Foo = &bar;
value.do_something();
```
