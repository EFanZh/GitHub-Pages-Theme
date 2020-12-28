# Hello, world

This is a paragraph.

This is another paragraph.

- *Italic*.
- **Bold**.
- ***Bold and Italic***.
- ~~Strikethrough~~.

After list.

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

Text before table.

| Key | Value | Description |
| --- | ----- | ----------- |
| x   | 3     | Left        |
| y   | 6     | Right       |
| z   | 9     | Result      |

Text after table.

| x     | y    |
| ----- | ---- |
| 10000 | 30   |
| 1000  | 200  |
| 100   | 1000 |

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

## Heading 2

Text.

### Heading 3

Text.

#### Heading 4

Text.

##### Heading 5

Text.

###### Heading 6

Text.
