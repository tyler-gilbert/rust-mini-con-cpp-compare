## Meta-Programming: Generics, Templates, and Macros

### ❓ Generics

```c++
//c++
//generic struct
template<typename Type> struct Foo {
  Type member_of_type;
};

struct Bar {
  //generic function
  template<typename Type> auto do_something(Type a) -> Type {
    return a;
  }
};
```

```rust
//rust
//generic struct
struct<Type> Foo {
  member_of_type: Type
}

//generic function
fn do_something<Type>(Type a) -> Type {
  return a;
}
```


---

### ❓ C++20 Concepts vs Rust Bounds


```c++
//c++
template <typename Type> 
requires std::integral<Type> //ensure T matches %d formatting
auto printer(Type t) -> void {
  printf("%d", t);
}
```

```rust
//rust

//T must implement the Display trait
fn printer<Type: Display>(t: Type) {
    println!("{}", t);
}
```


---

### ❌ Meta-Programming and Macros

It is hard to draw parallels between meta-programming (code that generates code) in C++ and Rust. Rust macros are used for meta-programming. They are used more like C++ template `consteval`/`constexpr` meta-programming than C++ preprocessor macros. While C++ pre-processor macros are discouraged, Rust macros are an integral part of the language.

Rust macros use rust code (compiled and executed at compile-time) that parses macro tokens and generate rust code which is then compiled and executed at run-time.

```rust
//rust

fn main(){
  println!("{} {}", "hello", "world");
}
```

In rust, the `println!()` macro has rust code that parses everything inside the `()` and then generates the rust implementation to achieve the desired operation. The code that parses and generates is also fully-fledged rust code that is compiled and executed at compile time.
