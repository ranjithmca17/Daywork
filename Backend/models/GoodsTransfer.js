const mongoose=require('mongoose');

const WarehouseManagementSchema=new mongoose.Schema({
    orderNo:{type:String,require:true}
    ,date:{type:Date,require:true}
    ,reason:{type:String,require:true}
    ,sourceWarehouse:{type:String,require:true},
    destinationWarehouse:{type:String,require:true}
    ,itemDetail:{type:String,require:true}
    ,currentAvailability:{type:Number,require:true}
    ,destinationAvailability:{type:Number,require:true}
    ,transferQuantity:{type:Number,require:true}
})

//create WarehouseManagement
const WarehouseManagement=mongoose.model('warehouseManagement',WarehouseManagementSchema);

module.exports=WarehouseManagement;