/* Getting Started:
Enter "USE {database};" before entering your SQL statements.
Type "--your question" + Enter to try out AI-generated SQL queries
Declare a parameter like "Where id = ${arg}".
*/
USE bookshop;

-- update stock by b.id
UPDATE `books`
SET
  `stock` = ${stock}
WHERE
  `id` = ${book_id};