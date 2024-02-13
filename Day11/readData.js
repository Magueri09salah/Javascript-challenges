const fs = require('fs');
const xlsx = require('xlsx');

// const workbook = xlsx.readFile('data/employee_data_.xlsx');

// let worksheet = workbook.Sheets[workbook.SheetNames[0]];
// const jsonData = xlsx.utils.sheet_to_json(worksheet);

function excelToJson(filePath){
    // Read excel file
    const workbook = xlsx.readFile(filePath);
     // Assume the first sheet contains the data
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];
    // Convert the worksheet data to JSON
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

  return jsonData;
}

const excelFilePath = 'data/employee_data_.xlsx';
const jsonOutput = excelToJson(excelFilePath);

// Write the JSON data to a file (optional)
fs.writeFileSync('output.json', JSON.stringify(jsonOutput, null, 2), 'utf-8');

console.log('Excel file converted to JSON:', jsonOutput);





console.log('*********************** Table with Percentage ************************')

function calculateBonus(annualSalary) {
    if (annualSalary < 50000) {
        return annualSalary * 0.05; // 5% bonus for salaries less than $50,000
    } else if (annualSalary >= 50000 && annualSalary <= 100000) {
        return annualSalary * 0.07; // 7% bonus for salaries between $50,000 and $100,000
    } else {
        return annualSalary * 0.1; // 10% bonus for salaries greater than $100,000
    }
}


function BonusPercentage() {
//     for (let i = 0 ; i <= jsonOutput.length; i++) {
        // const EmployeeID  = jsonOutput[`A${index}`].v;
        // const AnnualSalary = worksheet[`B${index}`].v;
        // console.log('hello');
        const jsonDataWithBonus = jsonOutput.map(employee => {
            const annualSalary = employee.AnnualSalary;
            const bonus = calculateBonus(annualSalary);
            return {
                ...employee,
                Bonus: bonus
            };
        });
        return jsonDataWithBonus;
        // const bonus = jsonOutput[i].EmployeeID;
        // console.log(bonus);
        // if (jsonOutput[index].AnnualSalary < 50000 ){
        //     console.log('hry')
        //     // console.log({
        //     //     'EmployeeID' : EmployeeID,
        //     //     'AnnualSalary' : AnnualSalary,
        //     //     'BonusPercentage' : 0.05,
        //     //     'BonusAmount' : AnnualSalary + (AnnualSalary * 0.05),
        //     // })
        // }
        // else if(jsonOutput.AnnualSalary >= 50000 && jsonOutput.AnnualSalary <= 100000 ){
        //     console.log({
        //         'EmployeeID' : EmployeeID,
        //         'AnnualSalary' : AnnualSalary,
        //         'BonusPercentage' : 0.07,
        //         'BonusAmount' : AnnualSalary + (AnnualSalary * 0.07),
        //     })
        // }
        // else{
        //     console.log({
        //         'EmployeeID' : EmployeeID,
        //         'AnnualSalary' : AnnualSalary,
        //         'BonusPercentage' : 0.10,
        //         'BonusPercentage' : AnnualSalary + (AnnualSalary * 0.1),
        //     })
        // }
//     }

}

console.log(BonusPercentage())
console.log('*********************** Table with Percentage ************************')
function addBonusColumns(originalData) {
    // Calculate bonus for each employee
    const dataWithBonus = originalData.map(employee => {
        const annualSalary = employee.AnnualSalary;
        const bonus = calculateBonus(annualSalary);
        return {
            ...employee,
            Bonus: bonus
        };
    });

    return dataWithBonus;
}

const data = addBonusColumns(jsonOutput);

function writeToExcel(data, outputPath) {
    const ws = xlsx.utils.json_to_sheet(data);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, outputPath);
}

console.log(writeToExcel(data,'file.xlsx'))
