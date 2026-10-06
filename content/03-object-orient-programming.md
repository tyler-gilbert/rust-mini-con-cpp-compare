## Object Orient Programming

### ❌ Classes and Structs

> The primary difference between a C++ `class` and a `struct` is the `class` members are `private` by default and `struct` members are `public`. When comparing to Rust, we will just consider the C++ `struct`.

```c++
//c++
struct X {
  int width;
  int height;
}; //trailing ;

//or a tuple
using T = std::tuple<int, int>;
```

```rust
//rust
struct X {
  width: i32,
  height: i64, //this trailing comma is optional
} //no trailing ;

//struct can be a tuple
struct T(i32, i64)
```


---

#### ❓ Member Functions/Methods

```c++
//c++
struct Foo {
  int value;
  void set_value(int num){
    value = num;
  }
};

auto foo = Foo{10};
foo.set_value(5);
```

```rust
//rust
struct Foo {
  value: i32
}

//implementation is always separate from the data
//with no forward declarations required
impl Foo {
  fn set_value(&mut self, num: i32){
    self.value = num;
  }
}

let mut foo = Foo{value: 10};
foo.set_value(5);
```


---

#### ❌ Constructors

C++ gives a ton of flexibility in how to construct objects. Rust has exactly one way to construct an object. However, both languages support factory functions for combining logic with instantiation.

```c++
//c++
struct X {
  int width; //could assign defaults
  int height;
  X(int w, int h){ //could do an init-list here
    //do some magic
  }
  //or with a factory function
  static X create_x(int w, int h){
    //do some magic
    return X(w,h);
  }
};
```

```rust
//rust
struct X {
  width: i32,
  height: i64, //this trailing comma is optional
} //no trailing ;

impl X {
  fn create(w: i32, h: i64) -> Self {
    //do some magic
    //this is the ONLY way to officially construct X
    return X{width: w, height: h};
  }
}

//callsite
let x0 = X{width:10, height:20};
let x1 = X::create(5,10);
```


---

#### ❓ Destructors

> ❓ C++ destructors have a lot more to worry about than Rust because of the way inheritance and copy/move semantics are implemented in C++.

```c++
//c++
struct X {
  int width; //could assign defaults
  int height;
  ~X(){
    //called when the instance goes out of scope
    //take care to properly handle copy/move semantics and inheritance
  }

};
```

```rust
//rust
struct X {
  width: i32,
  height: i32
}

impl Drop for X {
  fn drop(&self){
    //called when the instance is dropped
    //only called once per value
    //not called on borrow or ownership transfer
  }
}
```


---

#### ❓ Access Modifiers

```c++
//c++
struct Foo {
public: //this is the default for struct
  int public_value;
protected:
  int protected_value;
private:
  int private_value;
}
```

```rust
//rust
struct Foo {
  pub public_value: i32,
  //no equivalent for protected
  private_value: i32
}
```

> In Rust, everything in the same module of the same crate can access private values. In C++, only the members of the same type can access private values.


---

#### ❌ Inheritance

```c++
struct Foo {
  int foo;
  int get_foo() const {
    return foo;
  }
};

struct Bar : public Foo {
  int bar;
  int get_bar() const {
    return bar;
  }
};

auto bar = Bar{};
bar.get_foo();
bar.get_bar();
```

Rust uses "Traits" to define interfaces. A `struct` can implement multiple traits. "Traits" allow
- constants
- functions
- types

They do not allow data members. To do approximately the above in Rust:

```rust
//rust
trait Foo {
  fn get_foo() -> i32;
}

trait Bar {
  fn get_bar() -> i32;
}

struct FooBar {
  foo: i32,
  bar: i32
}

impl Foo for FooBar {
  fn get_foo(&self) -> i32 {
    return self.foo;
  }
}

impl Bar for FooBar {
  fn get_bar(&self) -> i32 {
    return self.bar;
  }
}

let foobar = FooBar{foo: 5, bar: 10};
let _foo = foobar.get_foo();
let _bar = foobar.get_bar();
```


---

#### ❓ Virtual Functions

```c++
//c++
struct Foo {
  virtual int pure_vitual() = 0;
  virtual int virtual_with_default(){
    return 0;
  }
}

struct Bar: public Foo {
  int pure_virtual() override (){
    return 1;
  }
  int virtual_with_default() override (){
    return 1;
  }
}
```


```rust
//rust
trait Foo {
  fn pure_virtual() -> i32;
  fn virtual_with_default() -> i32 {
    return 0;
  }
}

struct Bar;

impl Foo for Bar {
  fn pure_virtual() -> i32 {
    return 1;
  }
  //omit to use Foo's default implementation
  fn virtual_with_default() -> i32 {
    return 1;
  }
}
```
