SELECT userNameId, userName, createAt, descr
FROM products JOIN users ON userNameId = users.id
ORDER BY createAt ASC;