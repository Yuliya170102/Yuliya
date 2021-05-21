SELECT vendorName, COUNT(*) AS count
FROM vendors JOIN products ON vendorId = vendors.id
 WHERE datediff(curdate(),createAt)<=10
 GROUP BY vendorName
 HAVING count >3;