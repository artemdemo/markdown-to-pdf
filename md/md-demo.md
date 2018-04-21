Demo file for markdown-to-pdf
====================

# Span Elements

These elements occur within a line of text.  So, for example font changes or links.

 
## Emphasis

Markdown treats * (asterisk) and _ (underscores) as emphasis markers. 

*single asterisks*

_single underscores_

**double asterisks**

__double underscores__

## Strikethrough

Bitbucket's Markdown parser supports strikethrough by wrapping text in `~~`:

~~text that has been struckthrough~~

## Preformatted code

To indicate a span of code, wrap it with `` ` `` (backtick). Unlike a pre-formatted code block, a code span indicates code within a normal paragraph. For example:

Use the `printf()` function.

To include a literal backtick character within a code span, you can use multiple backticks as the opening and closing delimiters:

``There is a literal backtick (`) here.``	

## Images

Markdown uses an image syntax that is intended to resemble the syntax for links, allowing for two styles: inline and reference. Images appear like this:

![Alt text](./md-exmpl.png)


## Headings
You can create Atx-style headings by prefixing with a # (hash mark)

# Heading 1 markup
# 
## Heading 2 markup
## 
### Heading 3 markup
### 
#### Heading 4 markup
#### 
##### Heading 5 markup
##### 
###### Heading 6 markup
###### 


## PARAGRAPHS and BLOCKQUOTES

A paragraph is one or more consecutive lines of text separated by one or more
blank lines. A blank line contains nothing but spaces or tabs. Do not indent
normal paragraphs with spaces or tabs. New lines/carriage returns within paragraphs require two spaces at the end of the preceding line.

This is one paragraph.

This is a second.

Markdown uses email-style > (greater than) characters for blockquoting. If youâ€™re familiar with quoting passages of text in an email message, then you know how to create a blockquote in Markdown. It looks best if you hard wrap the text and put a > before every line:

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> 
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.
	
Blockquotes can be nested (i.e. a blockquote-in-a-blockquote):

> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.

Blockquotes can contain other Markdown elements, including headers, lists, and code blocks:

> ## This is a header.
> 
> 1.   This is the first list item.
> 2.   This is the second list item.
> 
> Here's some example code:
> 
>     return shell_exec("echo $input | $markdown_script");

## Lists

Markdown supports ordered (numbered) and unordered (bulleted) lists.  List markers typically start at the left margin, but may be indented by up to three spaces. List markers must be followed by one or more spaces or a tab.

Form bulleted lists with any of * (asterisk), + (plus), or - (dash). You can one or any or mix of these to form a list:

* Red 
+ Green 
- Blue
	
Ordered lists require a numeric character followed by a . (period).

1. Item one
1. Item two 
1. Item three
		
Lists can be embedded in lists. List items may consist of multiple paragraphs. Each subsequent paragraph in a list item must be indented by either 4 spaces or one tab:

* Red 
+ Green 
	* dark  green 
	* lime	
- Blue		
	1. Item one
		1. subitem 1 
		1. subitem 2
	1. Item two 
	
	    This is is a first paragraph. 
	    
	    * Green 
		* Blue
	    
	    This is a second paragraph.
	    
	1. Item three

You can also embed blockquotes in a list.

* Green
> What is this?  It is embedded blockquote.  Mix 'em and match 'em.
* Blue
* Red


You can also embed code blocks in a list.

* Green

    Try this code:

        This is an embedded code block.

    Then this:

        More code!

* Blue
* Red


## Tables

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell
		
You can only put simple lines in a table.

You can specify alignment for each column by adding colons to separator lines. A colon at the left of the separator line, left-aligns the column. A colon on the right, right-aligns the column. Add colons to both sides to center the column is center-aligned.

Right     | Left   | Center 
---------:| :----- |:-----:
Computer  |  $1600 | one
Phone     |    $12 | three
Pipe      |     $1 | eleven

You can apply inline formatting (span-level changes such as fonts or links) to the content of each cell using regular Markdown syntax:

| Function name | Description                    |
| ------------- | ------------------------------ |
| `help()`      | Display the __help__ window.   |
| `destroy()`   | **Destroy your computer!**     |


## Code and Syntax highlighting

Pre-formatted code blocks are used for writing about programming or markup source code. Rather than forming normal paragraphs, the code block linesare interpreted literally.  Markdown wraps a code block in both `<pre>` and `<code>` tags.

To produce a code block in Markdown, indent every line of the block by at least 4 spaces or 1 tab. For :

This is a normal paragraph:

```
This is a code block.
```