const fs = require('fs-extra');
const path = require('path');

/**
 * @desc 提供一个Promise的方法,获得当前文件夹下所有的文件名
 * @param {String} pathname
 */
function multiEntryList(pathname) {
  return new Promise((resolve, reject) => {
    fs.readdir(pathname, (err, files) => {
      if (err) {
        reject(err);
      }
      const fileList = files.filter((file) => !file.includes('.'));
      resolve(fileList);
    })
  });

}

async function multiEntryObj(pathname) {
  const nameList = await multiEntryList(pathname);
  const obj = {};
  nameList.forEach(name => {
    obj[name] = path.resolve(pathname, name);
  });
  console.log(obj)
  return obj;
}

module.exports = {
  multiEntryList,
  multiEntryObj,
};
