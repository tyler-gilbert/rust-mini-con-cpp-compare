## Meta-Programming: Generics, Templates, and Macros

--

### <i class="bi bi-circle-half" role="img" aria-label="Partial overlap"></i> Generics

C++ templates:

```cpp
template <typename T>
T identity(T value) { return value; }
```

Rust generics: 

```rust
fn identity<T>(value: T) -> T { value }
```

--

#### Generic types and functions

```cpp
// C++
template <typename Type>
struct Foo {
  Type member_of_type;
};

struct Bar {
  template <typename Type>
  Type do_something(Type value) {
    return value;
  }
};
```

```rust
// rust
struct Foo<Type> {
  member_of_type: Type,
}

fn do_something<Type>(value: Type) -> Type {
  value
}
```

--

#### Using generic items


```cpp
// C++
auto result = do_something<int>(5);
// if compiler can infer
auto result = do_something(5);
```

```rust
// rust turbofish syntax ::<T>
let result = do_something::<i32>(5);
// if compiler can infer
let result = do_something(5);
```

---

### <i class="bi bi-circle-half" role="img" aria-label="Partial overlap"></i> C++20 Concepts vs. Rust Bounds

C++ concepts:

```cpp
template <std::integral T>
void printer(T value) { /* ... */ }
```

Rust trait bounds:

```rust
fn printer<T: std::fmt::Display>(value: T) { /* ... */ }
```

--

### <i class="bi bi-circle" role="img" aria-label="No overlap"></i> Meta-Programming and Macros

C++ macros (taboo)

```cpp
#define square(x) ((x) * (x))
auto result = square(5);
```

Rust macros (idiomatic)

```rust
macro_rules! square {
  ($x:expr) => { ($x) * ($x) };
}
let result = square!(5);
```

--

#### Declarative macros

`macro_rules!` is a more powerful version of `#define`

```rust
macro_rules! greet {
  ($name:expr) => {
    println!("Hello, {}!", $name);
  };
}

greet!("Rust");

// std println macro with formatting
println!("{} {}", "hello", "world");
```

--

#### Procedural macros

```rust
#derive[Clone, Copy, Serialize, Deserialize, Debug]
struct Point {
    x: i32,
    y: i32
}
```

Implemented as procedural macros. Full access to the abstract syntax tree. A huge pain to author these.
