import Utils from "../utils/constant.util";
var fs = require('fs')

const utils = new Utils;
export default class FileService {

    static async isAllFileHaveData(){
        try{
            const files = utils.FILES;
            for (const key in files) {
                if (!fs.existsSync(files[key]))
                    return false;
                if (fs.readFileSync(files[key], 'utf8').trim() === '') 
                    return false;
            }
            return true;;

        }catch(err){
            throw err;
        }
    }
}