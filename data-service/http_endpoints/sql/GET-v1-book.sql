/* Getting Started:
Enter "USE {database};" before entering your SQL statements.
Type "--your question" + Enter to try out AI-generated SQL queries
Declare a parameter like "Where id = ${arg}".
*/
USE bookshop;

SELECT
  b.id,
  b.title,
  b.type,
  b.published_at,
  b.stock,
  b.price,
  r.score,
  a.name
FROM
  `books` AS b
  JOIN `ratings` AS r ON b.id = r.book_id
  JOIN `book_authors` AS ba ON b.id = ba.book_id
  JOIN `authors` AS a ON ba.author_id = a.id
WHERE b.id = ${book_id}
LIMIT 1