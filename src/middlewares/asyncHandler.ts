// const asyncHandler = (fn) => async (req, res, next) ={
//     try {
//         await fn(req, res, next);
//     } catch (error){
//         error: error.stack
//         res.status(error.code || 500).json({
//             message: error.message || 'An unexpected error occurred',
//         })
//     }
// }