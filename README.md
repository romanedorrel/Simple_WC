# Simple_WC

A simplified implementation of the Unix wc (word count) command written in Node.js.
This project supports counting bytes, lines, words, and characters from files or standard input.

Features

-c → count bytes
-l → count lines
-w → count words
-m → count characters (locale-dependent, Unicode-aware)
Default (no option) → outputs lines, words, bytes (like GNU wc)
Works with both files and stdin

Usage

Run on a file
node ccwc.js -c test.txt
Example output:
53 test.txt

Run with no option (default)
node ccwc.js test.txt
Output format (lines, words, bytes, filename):
4 10 53 test.txt

Run on stdin
echo "hello world" | node ccwc.js -w
Output:
2

Examples

# Count bytes
./ccwc.js -c test.txt
# Count lines
./ccwc.js -l test.txt
# Count words
./ccwc.js -w test.txt
# Count characters
./ccwc.js -m test.txt
# Default: lines, words, bytes
./ccwc.js test.txt
# Using stdin
cat test.txt | ./ccwc.js -w
