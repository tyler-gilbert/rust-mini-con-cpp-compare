## Object-Oriented Programming

### <i class="bi bi-circle" role="img" aria-label="No overlap"></i> Classes and Structs

C++ is object oriented.

```cpp
struct Point {
  int x;
  int y;
};
```

Rust is not (for the most part).

```rust
struct Point {
  x: i32,
  y: i32,
}
```

--

#### <i class="bi bi-circle-half" role="img" aria-label="Partial overlap"></i> Member functions and methods

C++ methods are declared inside a class or struct. 

```cpp
struct Foo {
  int value;
  void set_value(int num) {
    value = num;
  }
};

auto foo = Foo{10};
foo.set_value(5);
```

--

Rust uses an `impl` block.

```rust
struct Foo {
  value: i32,
}

impl Foo {
  fn set_value(&mut self, num: i32) {
    self.value = num;
  }
}

let mut foo = Foo { value: 10 };
foo.set_value(5);
```

--

#### <i class="bi bi-circle" role="img" aria-label="No overlap"></i> Constructors

C++ constructors/overloads/factory functions. 

```cpp
struct Size {
  int width;
  int height;

  Size(int w, int h) : width(w), height(h) {}
  static Size create(int w, int h) { return Size(w, h); }
};
```

--

Rust has `new()` convention

```rust
struct Size {
  width: i32,
  height: i32,
}
impl Size {
  fn new(width: i32, height: i32) -> Self {
    Self { width: width, height: height }
    // if member names match input names use:
    // Self { width, height }
  }
}
let direct = Size { width: 10, height: 20 };
let via_factory = Size::create(5, 10);
```

--

#### <i class="bi bi-circle-half" role="img" aria-label="Partial overlap"></i> Destructors and `Drop`

C++ destructors

```cpp
struct X {
  ~X() {
    // release resources owned by X
  }
};
```

Rust's `Drop` trait

```rust
struct X;

impl Drop for X {
  fn drop(&mut self) {
    // release resources owned by X
  }
}
```

--

#### <i class="bi bi-circle-half" role="img" aria-label="Partial overlap"></i> Access modifiers and visibility

C++ has `public`, `protected`, and `private`.

```cpp
struct Foo {
public:
  int public_value;
protected:
  int protected_value;
private:
  int private_value;
};
```

Rust has `pub`

```rust
pub struct Foo {
  pub public_value: i32,
  private_value: i32,
}
```

--

### <i class="bi bi-circle-half" role="img" aria-label="Partial overlap"></i> Inheritance and Polymorphism

C++ struct/class inheritance.

```cpp
struct Bar : Foo {
  int bar;
};
```

Rust has no inheritance.

```rust
struct Bar {
  foo: Foo,
  bar: i32,
}
```

--

#### <i class="bi bi-circle-half" role="img" aria-label="Partial overlap"></i> Inheritance and traits

A C++ derived type inherits data and methods 

```cpp
struct Foo {
  int foo;
  int get_foo() const { return foo; }
};

struct Bar : Foo {
  int bar;
  int get_bar() const { return bar; }
};

Bar value{};
value.get_foo();
value.get_bar();
```

--

Rust traits describe shared behavior

```rust
trait HasFoo { fn get_foo(&self) -> i32; }
trait HasBar { fn get_bar(&self) -> i32; }
struct FooBar {
  foo: i32,
  bar: i32,
}
impl HasFoo for FooBar { 
    fn get_foo(&self) -> i32 { self.foo } 
}
impl HasBar for FooBar { 
    fn get_bar(&self) -> i32 { self.bar } 
}
let value = FooBar { foo: 5, bar: 10 };
value.get_foo(); value.get_bar();
```

--

#### <i class="bi bi-circle-half" role="img" aria-label="Partial overlap"></i> Virtual functions and trait dispatch

C++ virtual functions use runtime dispatch (vtable)

```cpp
struct Foo {
  virtual int pure_virtual() = 0;
  virtual int with_default() { return 0; }
  virtual ~Foo() = default;
};

struct Bar : Foo {
  int pure_virtual() override { return 1; }
  int with_default() override { return 1; }
};

Bar bar;
Foo& value = bar;
value.pure_virtual();
```

--

Rust dynamic trait objects provide runtime dispatch.

```rust
trait Foo {
  fn pure_virtual(&self) -> i32;
  fn with_default(&self) -> i32 { 0 }
}
struct Bar;
impl Foo for Bar {
  fn pure_virtual(&self) -> i32 { 1 }
  fn with_default(&self) -> i32 { 1 }
}
let bar = Bar;
let value: &dyn Foo = &bar;
value.pure_virtual();
```

A Trait Object is the only part of Rust that is "Object" oriented.
