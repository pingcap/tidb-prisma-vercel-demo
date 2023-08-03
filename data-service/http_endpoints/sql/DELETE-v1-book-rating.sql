/* Getting Started:
Enter "USE {database};" before entering your SQL statements.
Type "--your question" + Enter to try out AI-generated SQL queries
Declare a parameter like "Where id = ${arg}".
*/
USE bookshop;

DELETE FROM `ratings`
WHERE
  `user_id` = ${user_id}
  AND `book_id` = ${book_id};
