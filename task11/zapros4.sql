SELECT vendorName, COUNT(*) as count
FROM vendors JOIN products ON vendors.id = products.vendorId
WHERE 
 validUntil > curdate()
 GROUP BY vendorName
 HAVING count>3;