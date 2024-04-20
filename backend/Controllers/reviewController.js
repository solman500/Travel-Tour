import Review from '../models/Review.js';
import Tour from '../models/Tour.js';



export const createReview=async(req,res)=>{
    
     const tourId=req.params.tourId;
        const newReview =new Review({...req.body});
    try{

        const savedReview=await newReview.save();


        await Tour.findByIdAndUpdate(tourId,{$push:{reviews:savedReview._id}});

        res.status(200).json({
            status:"success",
            data:savedReview,
            massage:'Review created successfully'
        })
       



    }catch(err){
        res.status(500).json({
            status:"fail",
            success:'false',
            massage:'failed to create review'
        })

    }
}