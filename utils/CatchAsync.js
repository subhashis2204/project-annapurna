module.exports = function(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(err => next(err))
    }
}

// module.exports = function(fn) {
//     return async function(req, res, next) {
//         const session = await mongoose.startSession();
//         try {
//             session.startTransaction();
//             await fn(req, res, session);
//             await session.commitTransaction();
//             session.endSession();
//         } catch (error) {
//             await session.abortTransaction();
//             session.endSession();
//             next(error);
//         }
//     };
// }