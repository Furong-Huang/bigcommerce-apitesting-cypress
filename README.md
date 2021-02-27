# BigCommerce-APITesting-using-Cypress
1.创建一个bigCommerce的试用账号 通过后台管理界面创建一些代售卖的产品（入口：Products->Add）
 
2.通过后台管理界面产生一个API token （入口：Advanced Settings->API account） 

3.Test Case 
  1)调用order API （and reference)
  
  2)创建一个Awaiting Fulfillment的order 
  
  3)访问后台界面确认一个新的order已产生 
  
  4)修改order状态为Completed 
  
  5)调用order API 确认order状态已经是Completed
