SELECT *,AVG(rating) AS ocenka
FROM products JOIN rewiews ON productId = products.id
GROUP BY productId
HAVING ocenka > 3;