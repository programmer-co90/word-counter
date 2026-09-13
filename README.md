# Create The Project:

` npx create-react-app . `

## The Packages That Used:

` npm install @mui/material @mui/system @mui/utils @emotion/react @emotion/styled `
` npm install @mui/joy @emotion/react @emotion/styled `

## Explain The Functions That Used in The Project: 

### In CountApp.jsx file:

1. The `analyzeText` Function

    **`const analyzeText = (inputText) => {`**
    Defines an arrow function taking one parameter, `inputText`, representing the raw string passed from the textarea.

    **`const startTime = performance.now();`**
    Captures a high-resolution timestamp (in milliseconds) at the exact moment the function begins executing, used later to calculate how long the analysis took.

    **`const trimmedText = inputText;`**
    Creates a local variable holding the original input. *(Note: Despite the variable name, no actual `.trim()` method is applied here; it holds the raw string).*

    **`const charCount = trimmedText.length;`**
    Calculates the absolute total number of characters, including all letters, spaces, symbols, and hidden newline (`\n`) characters.

    **`const charCountWithoutSpaces = trimmedText.replace(/\s/g, "").length;`**
    Uses a regular expression to find all whitespace (`\s` includes spaces, tabs, and newlines) globally across the string (`g` flag), replaces them with empty strings `""`, and counts the length of the remaining characters.

    **`const trimmedText0 = trimmedText.trim();`**
    Creates a new variable that removes leading whitespace at the very beginning of the entire string and trailing whitespace at the very end.

    **`const wordCount = trimmedText0.length > 0 ? ... : 0;`**
    A ternary operator. If the string is empty after trimming, it immediately returns `0` words. If it contains text, it executes the following chain:

    * **`.split(/\s+/)`**: Splits the string into an array wherever there is one or more whitespace characters.
    * **`.filter(Boolean)`**: Removes any empty string elements `""` that might appear in the array from double spaces.
    * **`.filter((word) => /[\p{L}\p{N}]/u.test(word))`**: Tests each item against a Unicode-aware (`u` flag) regular expression. `\p{L}` matches any letter from any language. `\p{N}` matches any kind of numeric character. This ensures symbols like `"-"` or `","` standing alone are not counted as words.
    * **`.length`**: Returns the final count of valid words.

    **`const paragraphCount = trimmedText.replace(/\n$/gm, "").split(/\n/).filter(Boolean).length;`**

    * **`.replace(/\n$/gm, "")`**: Finds newline characters at the end of lines globally/multiline (`gm`) and removes them.
    * **`.split(/\n/)`**: Splits the remaining string into an array wherever a newline exists.
    * **`.filter(Boolean).length`**: Removes empty lines and counts the remaining blocks of text.

    **`let sentenceMatch = trimmedText.match(/[^.!?\n]*[\p{L}\p{N}]+[^.!?\n]*[.!?](?=\s|$|\n)/gu) || [];`**
    This complex regex searches for standard sentences:

    * **`[^.!?\n]*`**: Matches zero or more characters that are *not* punctuation or newlines.
    * **`[\p{L}\p{N}]+`**: Requires at least one Unicode letter or number to exist (so a string of just spaces and a period doesn't count).
    * **`[^.!?\n]*`**: Matches more non-punctuation characters.
    * **`[.!?]`**: Requires the sequence to end with a period, exclamation point, or question mark.
    * **`(?=\s|$|\n)`**: A positive lookahead. It ensures the punctuation mark is followed by a space, the end of the string (`$`), or a newline, preventing it from splitting decimals like `3.14`.
    * **`gu`**: Global and Unicode flags.
    * **`|| []`**: If no sentences match, it defaults to an empty array rather than `null`.

    **`let remainingText = trimmedText.replace(/[^.!?\n]*[\p{L}\p{N}]+[^.!?\n]*[.!?](?=\s|$|\n)/gu, "").trim();`**
    Uses the exact same regex from above, but replaces those valid sentences with empty strings, leaving behind only "fragments" (like a line of text without a period at the end).

    **`const remainingLines = remainingText.split(/\n+/)...`**
    Splits the leftover fragments by newlines to evaluate them line-by-line.

    **`.map((line) => line.trim())`**
    Removes leading/trailing spaces from each fragment.

    **`.filter((line) => line.length > 0 && (/[\p{L}\p{N}]/u.test(line) || /^[^a-zA-Z0-9\u0600-\u06FF]+$/.test(line)));`**
    Keeps the fragment if it is not empty AND it meets one of two conditions:

    1. It contains at least one letter or number.
    2. Or it consists entirely of non-alphanumeric and non-Arabic characters (a string of raw symbols).

    **`sentenceMatch.push(...remainingLines);`**
    Takes the valid fragments, spreads them `...`, and adds them to the array of properly punctuated sentences.

    **`const sentenceCount = sentenceMatch.length;`**
    Counts the combined total of formal sentences and valid fragments.

    **`const spacesMatch = trimmedText.match(/ /g);`**
    Finds every literal space character in the string. (This does *not* match tabs or newlines, unlike `\s`).

    **`const spacesCount = spacesMatch ? spacesMatch.length : 0;`**
    If spaces were found, it gets the length of the array. If `match()` returned `null`, it falls back to `0`.

    **`const wordFrequency = countWordFrequency(trimmedText);`**
    Passes the text to your second function to calculate keyword density.

    **`const endTime = performance.now();`**
    Captures a second timestamp.

    **`const runTime = (endTime - startTime).toFixed(4);`**
    Subtracts the start time from the end time to get milliseconds elapsed. `.toFixed(4)` rounds this number to exactly four decimal places.

    **`setStats({ ... });`**
    Updates the React state object with all the calculated metrics, triggering a re-render to display the new numbers in the UI.

    **`setKeyWordStats(wordFrequency);`**
    Updates the React state for the keyword table with the array returned from the frequency function.

    ---

2. The `countWordFrequency` Function

    **`const countWordFrequency = (text) => {`**
    Defines an arrow function specifically for analyzing keyword repetition.

    **`const words = text.toLowerCase().match(/[\p{L}\p{N}_-]+/gu);`**

    * **`.toLowerCase()`**: Converts the entire input text to lowercase so that "Word" and "word" are counted as the same item.
    * **`.match(/[\p{L}\p{N}_-]+/gu)`**: Finds all sequences of characters made of Unicode letters `\p{L}`, Unicode numbers `\p{N}`, underscores `_`, or hyphens `-`. This extracts valid words while ignoring punctuation.

    **`const wordCounts = {};`**
    Initializes an empty JavaScript object to act as a hash map (dictionary) for storing word tallies.

    **`if (words) { ... }`**
    Checks if the regex actually found any words to prevent the next line from throwing an error if the input was empty.

    **`words.forEach((word) => { wordCounts[word] = (wordCounts[word] || 0) + 1; });`**
    Loops through every word in the array.

    * `wordCounts[word]`: Looks for the word in the object.
    * `(wordCounts[word] || 0)`: If the word exists, it retrieves its current count. If it does not exist (is `undefined`), it defaults to `0`.
    * `+ 1`: Adds one to the count and saves it back into the object.

    **`const totalWords = words ? words.length : 0;`**
    Gets the total number of valid words parsed, used as the denominator for the percentage calculation.

    **`return Object.entries(wordCounts)`**
    Converts the object (e.g., `{ hello: 2, world: 1 }`) into an array of key-value pairs: `[["hello", 2], ["world", 1]]`.

    **`.map(([word, count]) => [word, count, ((count / totalWords) * 100).toFixed(2)])`**
    Iterates over the pairs. For each pair, it returns a new array with three items:

    1. The `word` itself.
    2. The `count` (how many times it appeared).
    3. The frequency percentage: divides the specific word count by the total words, multiplies by 100, and forces it to a string with two decimal places (e.g., `"14.50"`).

    **`.sort((a, b) => b[1] - a[1]);`**
    Sorts the final array in descending order. It compares the `count` values (`index 1` of arrays `a` and `b`). If `b` is larger than `a`, it pushes `b` higher up the list, ensuring the most frequently used words appear at the top of your table.