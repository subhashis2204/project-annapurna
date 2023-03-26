const { faker } = require('@faker-js/faker');
const axios = require('axios')
const foodItems = require('../SampleFood.json')
const Food = require('../models/Food')

const imgUrls = []
const getImageUrls = async function() {
    const params = {
        client_id: 'b3G5_IdoAGLnHdAMKletjtXszLxsikahWgvt0KjQaEY',
        count: 10,
        query: 'food',
        orientation: 'landscape'
    }
    const response = await axios.get('https://api.unsplash.com/photos/random', { params })
    const imageData = response.data
    imageData.forEach(element => {
        imgUrls.push(element.urls.small)
    });
}


const createFoodItems = async() => {
        await getImageUrls()
            // await Food.deleteMany({})
        for (let idx = 0; idx < 10; idx++) {
            const foodItem = new Food({
                foodCategory: foodItems[idx].name,
                imgUrl: imgUrls[idx],
                foodDescription: faker.lorem.lines()
            })
            await foodItem.save()
        }
    }
    // const createFoodItems = async () => {
    //     await getImageUrls()
    //     for (let idx = 0; idx < 10; idx++) {
    //         const foodItem = new Food({
    //             foodName: foodItems[idx].name,
    //             instructions: foodItems[idx].instructions.join(' '),
    //             imgUrl: imgUrls[idx],
    //             ingredients: foodItems[idx].ingredients.join('\n')
    //         })
    //         await foodItem.save()
    //     }
    // }

module.exports = createFoodItems