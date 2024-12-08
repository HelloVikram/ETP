const Razorpay=require('razorpay');
const Order=require('../Model/orders');
const { or } = require('sequelize');

const buypremium=async (req,res)=>{
 try{
     const rzp=new Razorpay({
        key_id:process.env.razorpay_key_id,
        key_secret:process.env.razorpay_key_secret
     })
     const amount=2500;
     rzp.orders.create({amount,currency:"INR"},async (err,order)=>{

        if(err)
        res.status(500).json({success:false,message:err.message});

        await req.user.createOrder({orderId:order.id,status:'PENDING'})
        res.status(201).json({order,key_id:rzp.key_id})
     });
 }catch(err){
    res.status(500).json({success:false,message:err.message});
 }
}
const updatepremiumuser=async(req,res)=>{
    try{
        const {payment_id,order_id}=req.body;

        const order= await Order.findOne({where:{orderId:order_id}});

        await order.update({paymentId:payment_id,status:'Successfull'});
        await req.user.update({isPremium:true});
        return res.status(202).json({success:true,message:"Transaction successfull"});
    }catch(err){
        res.status(500).json({success:false,message:'Error while updating premium user'});
    }
}

const updatepremiumuseronfailure=async (req,res)=>{
    try{
       const {order_id}=req.body;
       const order=await Order.findOne({where:{orderId:order_id}});

       await order.update({ status:'failure'})
       res.status(201).json({success:false,message:'Transaction Failed'});
    }catch(err){
        res.status(500).json({success:false,message:'Error while updating premium user'});
    }
}

module.exports={buypremium,updatepremiumuser,updatepremiumuseronfailure}