---
title: Markdown Showcase
description: A showcase of all possible markdown tags and text.
---

# Markdown Showcase

This document provides a comprehensive showcase of various Markdown syntaxes, including standard Markdown, GitHub Flavored Markdown (GFM), and Obsidian-specific features.

## Standard Markdown

### Headings

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

### Text Formatting

_This text is italic._
_This text is also italic._

**This text is bold.**
**This text is also bold.**

**_This text is bold and italic._**
**_This text is also bold and italic._**

~~This text is strikethrough.~~

This is `inline code`.

```javascript
// This is a code block.
function greet(name) {
	return `Hello, ${name}!`;
}
```

### Lists

**Unordered List:**

- Item 1
- Item 2
  - Nested Item 2.1
  - Nested Item 2.2
- Item 3

**Ordered List:**

1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item

### Links

[This is a link to Google](https://www.google.com).

[This link has a title](https://www.google.com "Google's Homepage").

Reference-style link:
[Google][1]
[1]: https://www.google.com

### Images

![This is alt text for an image](/favicon.png 'This is a title for the image')

### Blockquotes

> This is a blockquote.
>
> > This is a nested blockquote.

### Horizontal Rule

---

## GitHub Flavored Markdown (GFM)

### Task Lists

- [x] Completed task
- [ ] Incomplete task
  - [ ] Nested incomplete task

### Tables

| Header 1   |   Header 2   |    Header 3 |
| :--------- | :----------: | ----------: |
| Align Left | Align Center | Align Right |
| Cell 1     |    Cell 2    |      Cell 3 |
| Cell 4     |    Cell 5    |      Cell 6 |

### Footnotes

Here is a sentence with a footnote. [^1]

[^1]: This is the footnote.

### Syntax Highlighting

```python
def hello_world():
    print("Hello, world!")
```

## Obsidian Markdown

### WikiLinks (Internal Links)

This is a link to another note: [[Sample Note]].

You can also link to headings: [[Sample Note#Heading]].

And you can use an alias: [[Sample Note|This is an alias]].

### Tags

This is a tag: #demotag
You can have #nested/tags too.

### Highlighting

==This text is highlighted.==

### Callouts / Admonitions

:::important
content
:::

> [!note]
> This is a note callout.

> [!tip]
> This is a tip callout.

> [!info]
> This is an info callout.

> [!warning]
> This is a warning callout.

> [!danger]
> This is a danger callout.

> [!bug]
> This is a bug callout.

> [!example]
> This is an example callout.

> [!quote]
> This is a quote callout.

### Embeds / Transclusions

Embed an entire note:
![[Sample Note]]

Embed a specific section of a note:
![[Sample Note#Heading]]

### Comments

This is a regular sentence. %%This is a comment and will not be rendered.%% This part is visible again.
