# Paginator

This plugin allows to create paginated documents in joplin.

![image](https://user-images.githubusercontent.com/36504423/236614509-e878452f-fcd4-4eba-822c-02a80135c887.png)

![image](https://user-images.githubusercontent.com/36504423/236638021-5858bf8a-c275-42de-8789-377df6629106.png)


# Usage

The paginator works with content between `\pdf` and `\endpdf`. Use `\column` and `\page` for column break and page break, respectively. Paragraphs automatically flow from one column to another, but page breaks can only be inserted manually. Page numbers are inserted automatically and displayed in TOC.

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

### Hyphenation

Automatic hyphenation does not work in joplin, but it works when exporting to an html file and opening it with a web browser (tested in vivaldi). For hyphenation to work, attribute `lang` must be set in the `html` element. Currently the plugin sets `lang="en"` with no option to use a different language. **ToDo**: add config option to choose `lang` value.
