const fs = require('fs')
const gm = require('gm')
// 获取图片尺寸存入预设数组
let getSize = function(arr, item) {
    return new Promise(function(resolve, reject) {
        gm(item).size((err, size) => {
            if (err) {
                console.log(err)
                reject()
                return
            }
            arr.push({
                id: item,
                width: size.width,
                height: size.height
            })
            resolve();
          })
    })
}

let orientation = true  //水平排列： true  垂直排列： false
let data = []            //存储图片尺寸信息
let img = ['img1.jpg','img2.jpg','img3.jpg','img4.jpg']
let position = []       //存储 width、height、background-position信息


let runGet = async () => {
    for(let item of img) {
        await getSize(data, item)
    }
    data.reduce((prev, curr, idx) => {
        position.push({
            name: curr.id.split('.')[0],
            width: curr.width,
            height: curr.height,
            x: prev,
            y: 0
        })
        return curr.width + prev;
    },0)
    console.log(JSON.stringify(position))
}
runGet()

let img2 = img.concat()
let firstEle = img2.shift()
gm(firstEle)
 .append(img2, orientation)
 .adjoin()
 .write('./sprite.' + img2[0].split('.')[1], function(err) {
   if(err) {
    console.log(err)
    return
   }
   console.log('success') 
 });