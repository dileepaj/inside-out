//Used in case of change of field names in the database

module.exports = {
                    "orderNumber": "orderNumber",
                    "orderSource": "orderSource",
                    "customerId": "customerId",
                    "customerName": ["firstname" , "lastname"],
                    "receiverName": "receiverName",
                    "address": "address",
                    "district": "district",
                    "city": "city",
                    "province": "province",
                    "zipcode": "zipcode",
                    "phone": "phone",
                    "paymentMethod": "paymentMethod",
                    "outTradeNo": "outTradeNo",
                    "deliveryCost": "deliveryCost",
                    "totalDiscount": "totalDiscount",
                    "totalAmount": "totalAmount",
                    "payment": "payment",
                    "lastmile": "lastmile",
                    "ecommerceCreateTime": "ecommerceCreateTime",
                    "ecommercePaymentTime": "ecommercePaymentTime",
                    "ecommerceEndTime": "ecommerceEndTime"
                  };
module.exports.keysNeededToMap = [
                      {
                        "key" : "ecommerceCreateTime",
                        "value" : "CreateDate",
                        "prefix" : true
                      }
                    ];