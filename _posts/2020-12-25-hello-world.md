# Hello, world

This is a paragraph.

This is another paragraph.

## Codes

```rust
fn fibonacci(n: u32) -> u32 {
    let mut a = 0;
    let mut b = 1;

    for _ in 0..n {
        let c = a + b;

        a = b;
        b = c;
    }

    a
}
```

Inline code: `let c = a + b;`.

## Lists

1. First
   1. Apple
   2. Orange
   3. Banana
2. Second
   1. Bart
   2. Lisa
   3. Maggie

- Item 1
- Item 2
  - Sub item 1
  - Sub item 2
- Item 3
  - Sub item 3
  - Sub item 4

## Table

| Key | Value | Description |
| --- | ----- | ----------- |
| x   | 3     | Left        |
| y   | 6     | Right       |
| z   | 9     | Result      |

## Block quotations

Normal text.

> Quoted text.
>
> > Nested block quotations.
>
> Tables in block quotations:
>
> | Key | Value | Description |
> | --- | ----- | ----------- |
> | x   | 3     | Left        |
> | y   | 6     | Right       |
> | z   | 9     | Result      |

End of quotations.

## Links

- [GitHub](https://github.com/)
- [Google](https://google.com/)
- [Hacker News](https://news.ycombinator.com/)

## Head 2

Text.

### Head 3

Text.

#### Head 4

Text.

##### Head 5

Text.

###### Head 6

Text.
