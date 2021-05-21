SELECT  userName, COUNT(*) AS count
FROM users JOIN rewiews ON users.id = userId
WHERE DATE_FORMAT(dateReview,'%m%d') = 0509
GROUP BY userName;
 