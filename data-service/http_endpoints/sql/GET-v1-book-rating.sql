/* Getting Started:
Enter "USE {database};" before entering your SQL statements.
Type "--your question" + Enter to try out AI-generated SQL queries
Declare a parameter like "Where id = ${arg}".
*/
USE bookshop;

-- get all ratings by variable book.id, and user details
SELECT
  ratings.book_id,
  ratings.user_id,
  ratings.score,
  ratings.rated_at,
  users.id,
  users.balance,
  users.nickname
FROM
  ratings
  INNER JOIN users ON ratings.user_id = users.id
WHERE
  ratings.book_id = ${book_id};
