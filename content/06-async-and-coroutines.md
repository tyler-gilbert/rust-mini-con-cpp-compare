## Async and Coroutines

C++20 coroutines

```cpp
task<int> load() {
  int value = co_await read();
  co_return value;
}
```

Rust `async`/`await`

```rust
async fn load() -> i32 {
  let value = read().await;
  value
}
```
