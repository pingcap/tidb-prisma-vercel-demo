/* Getting Started:
Enter "USE {database};" before entering your SQL statements.
Type "--your question" + Enter to try out AI-generated SQL queries
Declare a parameter like "Where id = ${arg}".
*/
USE bookshop;

--  check if user ID in users.id, and insert a score to ratings by variable book.id
INSERT INTO
  `ratings` (`book_id`, `user_id`, `score`)
SELECT
  `book`.`id`,
  `users`.`id`,
  ${score}
FROM
  `books` AS `book`
  CROSS JOIN `users`
WHERE
  `users`.`id` = ${user_id}
  AND `book`.`id` = ${book_id};
