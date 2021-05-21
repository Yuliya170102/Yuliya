SELECT vendorName,createAt, length(descr)
FROM vendors JOIN products ON vendorId = vendors.id
WHERE length(descr)>50;