SELECT userNameId, userName, createAt, productName
FROM products JOIN users ON userNameId = users.id
ORDER BY createAt ASC;