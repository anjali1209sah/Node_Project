import FileService from "../service/file.service";
import Utils from "../utils/constant.util";
var fs = require('fs')
const utils = new Utils();

export default class FileController {


    static async updateFileContent(req: any, res: any, next: any) {
        try {

            let number : any = req.body.number || req.params.number || req.query.number;
            number = parseInt(number);

            let files : any = utils.FILES;
        
            if (number < 1 || number > 25) 
                return res.status(400).send('Invalid Input : Number must be between 1 and 25');

            const multiply_number = number * 7;
            let file_name = 'D';

            if (multiply_number > 140)
                file_name = 'A';
            else if (multiply_number > 100) 
                file_name = 'B';
            else if (multiply_number > 60) 
                file_name = 'C';

            if (!fs.existsSync(files[file_name])) {
                console.log("the file " , file_name)
                fs.writeFileSync(files[file_name], '');
            }

            if(fs.readFileSync(files[file_name], 'utf8').trim() === '')
                fs.appendFileSync(files[file_name], `${multiply_number}\n`);
            else
                res.send(`Number alreday saved to file ${file_name}`);

            const is_all_file_have_data : any = await FileService.isAllFileHaveData();
           
            if (is_all_file_have_data) {
                res.send('Process complete. All files have numbers.');
            } else {
                res.send(`Number ${multiply_number} saved to file ${file_name}`);
            }
        
        } catch (err) {
            throw err;
        }
    }

    static async displayFileContent(req: any, res: any, next: any) {
        try {
            const result : any = {};
            let files : any  = {
                A: 'fileA.txt',
                B: 'fileB.txt',
                C: 'fileC.txt',
                D: 'fileD.txt'
            };
            for (const key in files) {
                result[key] = fs.readFileSync(files[key], 'utf8').split('\n').filter(Boolean);
            }
            res.json(result);

        } catch (err) {
            throw err;
        }
    }


}