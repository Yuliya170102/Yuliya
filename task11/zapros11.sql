SELECT datediff(curdate(),createAt)
FROM products
ORDER BY createAt ASC
LIMIT 1;