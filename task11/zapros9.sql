SELECT *, COUNT(*) AS count
FROM products JOIN rewiews ON productId = products.id
GROUP BY id
HAVING count>3;