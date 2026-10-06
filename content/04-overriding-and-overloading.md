## Overriding and Overloading

C++ uses polymorphism more liberally than Rust.


---

### ❌ Function Overloading

```c++
//c++
struct Foo {
  int bar();
  int bar() const; //unique by const
  int bar(int value); //unique by parameter
  int rbar() &&; //unique by rvalue
  int rbar() &; //unique by lvalue
};
```

```rust
//rust
impl Foo {
  //functions can't be overloaded (need unique names)
  fn bar(){}
  fn bar_const(){}
  fn bar_int(value: i32){}
}
```


---

### ✅ Operator Overloading

```c++
//c++
struct X {
  int width; //could assign defaults
  int height;
  X operator+(const X & rhs) const {
    return X{width+rhs.width, height+rhs.height};
  }

};

//callsite
const auto x = X{5,5} + X{10,10};
```

```rust
//rust
struct X {
  width: i32,
  height: i32
}

impl std::ops::Add for X {
  fn add(&self, rhs: &X) -> Self {
    return X{ width: self.width + rhs.width,
      height: self.height + rhs.height};
  }
}

//callsite
let x = X{width:5, height:5} + X{width:10, height:10};
```


---

### ❓ Function Overriding

```c++
//c++
struct Foo {
  void do_something(){
    printf("foo something\n");
  }
}

struct Bar: public Foo {
  //overrides Foo's default implementation
  void do_something(){
    printf("bar something\n");
  }
}
```

```rust
//rust
trait Foo {
  fn do_something(&self){
    println!("foo something");
  }
}
struct Bar;

impl Foo for Bar {
  //overrides Foo's default implementation
  fn do_something(&self){
      println!("bar something");
  }
}
```
