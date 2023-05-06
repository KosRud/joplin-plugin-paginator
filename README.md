# Paginator

This plugin allows to create paginated documents in joplin.

![image](https://user-images.githubusercontent.com/36504423/236638236-8c030d0b-5d55-4a28-bfad-ace5bd3e68e5.png)

![image](https://user-images.githubusercontent.com/36504423/236614509-e878452f-fcd4-4eba-822c-02a80135c887.png)

# Usage

The paginator works with content between `\pdf` and `\endpdf`. Use `\column` and `\page` for column break and page break, respectively. Paragraphs automatically flow from one column to another, but the page breaks can only be inserted manually. Page numbers are inserted automatically and displayed in TOC. Automatic hyphenation enabled using [hyphen](https://www.npmjs.com/package/hyphen).

To get a pdf, I export the note to an html file, open it in a browser, and then print to pdf. I did not try exporting to pdf directly: it might or might not work.

**Always** put `\page` after `[TOC]`. Having content on the same page as TOC is not supported.

### Example

```md
\pdf

Some text

\column

More text

\page

Text on the second page

\endpdf
```

# Limitations

Hyphenation assumes English language. **ToDo**: config option to select hyphenation language.
